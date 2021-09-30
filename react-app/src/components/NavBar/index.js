import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../modals/LoginFormModal';
import SignUpFormModal from '../modals/SignUpFormModal';
import { demo } from '../../store/session';

const NavBar = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const authenticated = sessionUser !== null;

    return (
        <nav>
            <NavLink to='/' exact={true} className='home-link'>
                Home
            </NavLink>
            {/* <NavLink to='/' exact={true} activeClassName='active'>
                Search
            </NavLink> */}

            <h2 className='logo'>Recipeer</h2>

            <div className='nav-auth'>
                { !authenticated ?
                    <>
                        <LoginFormModal />
                        <SignUpFormModal />
                        <button onClick={async e => await dispatch(demo())}>Demo User</button>
                    </>
                    :
                    <>
                        {/* <NavLink to='/'>Discover</NavLink> */}
                        <span className='welcome'>Welcome, {sessionUser.username}</span>
                        <NavLink to='/profile'><img className='profile-img nav-profile-img' src={sessionUser.imgUrl || '/images/default-profile.jpeg'} alt={sessionUser.username}/></NavLink>
                        <LogoutButton />
                    </>
                }
            </div>

        </nav>
    );
}

export default NavBar;
