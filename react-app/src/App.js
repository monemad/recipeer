import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Search from './components/Search';
import User from './components/User';
import Recipe from './components/RecipeComponents/Recipe';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import { getUsers } from './store/users';
import { getRecipes } from './store/recipes';
import { getIngredients } from './store/ingredients';
import { getUnits } from './store/units';
import { getTypes } from './store/types';
import { getAttributes } from './store/attributes';
import Home from './components/Home';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    let firstLoad = true;

    useEffect(() => {
        if (firstLoad) {
            history.listen(() => {
                document.querySelector('#content').scrollTop = 0;
            });
            firstLoad = false;
        }
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
            <NavBar sessionUser={sessionUser}/>
            <div id='content'>
                <Switch>
                    <Route exact path='/'>
                        <Home authenticated={sessionUser} />
                    </Route>
                    <Route path='/search'>
                        <Search />
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
                        <h2>Discover Page</h2>
                    </ProtectedRoute>
                </Switch>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;
