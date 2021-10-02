import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../modals/LoginFormModal';
import SignUpFormModal from '../modals/SignUpFormModal';
import { demo } from '../../store/session';

const NavBar = ({ sessionUser }) => {
    const dispatch = useDispatch()

    return (
        <nav>
            <NavLink to='/' exact={true} className='home-link'>
                Home
            </NavLink>
            {/* <NavLink to='/' exact={true} activeClassName='active'>
                Search
            </NavLink> */}

            <Link to='/' className='logo-link'><h2 className='logo'>Recipeer</h2></Link>

            <div className='nav-auth'>
                { !sessionUser ?
                    <>
                        <LoginFormModal />
                        <SignUpFormModal />
                        <button onClick={async e => await dispatch(demo())}>Demo User</button>
                    </>
                    :
                    <>
                        {/* <NavLink to='/'>Discover</NavLink> */}
                        <span className='welcome'>Welcome, {sessionUser.username}</span>
                        <NavLink to='/profile'><img className='profile-img nav-profile-img' src={sessionUser.imgUrl || 'https://recipeer-bucket.s3.us-west-1.amazonaws.com/tmpdefault-profile.jpeg'} alt={sessionUser.username}/></NavLink>
                        <LogoutButton />
                    </>
                }
            </div>

        </nav>
    );
}

export default NavBar;
