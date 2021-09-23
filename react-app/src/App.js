import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getUsers } from './store/users';
import { getRecipes } from './store/recipes';
import { getIngredients } from './store/ingredients';
import { getUnits } from './store/units';
import { getTypes } from './store/types';
import { getAttributes } from './store/attributes';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
        await dispatch(authenticate());
        await dispatch(getUsers());
        await dispatch(getRecipes());
        await dispatch(getIngredients());
        await dispatch(getUnits());
        await dispatch(getTypes());
        await dispatch(getAttributes());
        setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users' exact={true} >
                    <UsersList/>
                </ProtectedRoute>
                <ProtectedRoute path='/users/:userId' exact={true} >
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true} >
                    <h1>Recipeer</h1>
                </ProtectedRoute>
            </Switch>
        </>
    );
}

export default App;
