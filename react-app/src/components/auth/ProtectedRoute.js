import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import AuthFormsModal from '../modals/AuthFormsModal';

const ProtectedRoute = props => {
    const user = useSelector(state => state.session.user)
    return (
        <Route {...props}>
            {(user)? props.children  : <AuthFormsModal />}
        </Route>
    )
};


export default ProtectedRoute;
