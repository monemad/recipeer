import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import Recipe from './components/Recipe';
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
                <Route exact path='/'>
                    <h1>Home</h1>
                </Route>
                <Route path='/users/:userId'>
                    <User />
                </Route>
                <Route path='/recipes/:recipeId'>
                    <Recipe />
                </Route>
                <ProtectedRoute path='/profile'>
                    <User profile={true}/>
                </ProtectedRoute>
                <ProtectedRoute path='/users/:userId'>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/discover'>
                    <h1>Discover Page</h1>
                </ProtectedRoute>
            </Switch>
            <footer>
                <h1>Footer Goes Here</h1>
            </footer>
        </>
    );
}

export default App;
