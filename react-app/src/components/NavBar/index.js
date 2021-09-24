import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../modals/LoginFormModal';
import SignUpFormModal from '../modals/SignUpFormModal';

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user)

    const authenticated = sessionUser !== null;

    return (
        <nav>
            <NavLink to='/' exact={true} activeClassName='active'>
                Home
            </NavLink>

            { !authenticated ?
                <>
                    <LoginFormModal />

                    <SignUpFormModal />
                </>
                :
                <>
                    Welcome, {sessionUser.username}
                    <LogoutButton />
                </>
            }

        </nav>
    );
}

export default NavBar;
