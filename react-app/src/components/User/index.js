import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import EditUserFormModal from '../modals/EditUserFormModal';
import CreateRecipeFormModal from '../modals/CreateRecipeFormModal';
import { authenticate } from '../../store/session';
import RecipeCard from '../RecipeComponents/RecipeCard';

function User({profile = false}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const recipes = Object.values(useSelector(state => state.recipes))
    const { userId }  = useParams();

    const [triggerRender, setTriggerRender] = useState(false)

    const user = profile ? sessionUser : users[userId];
    const userRecipes = recipes.filter(recipe => recipe.userId === user.id)

    
    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch, triggerRender])
    
    if (user.id === sessionUser.id && !profile) {
        return (
            <Redirect to='/profile'></Redirect>
        )
    }

    return (
        <>
            <div className='profile-banner'>
                <div className='profile-img-div'>
                    <img className='profile-img' src={user.imgUrl} alt={user.username} width='300px'/>
                </div>
                <div className='username-div'>
                    <h2 className='header'>{user.username}</h2>
                </div>
                { profile &&
                    <EditUserFormModal />
                }
            </div>
            <h2 className='header'>Recipes</h2>
            <div className='user-recipes'>
                {userRecipes?.map(recipe => 
                    // <div key={recipe.id}><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></div>
                    <RecipeCard key={recipe.id} recipe={recipe} />
                )}
            </div>
            { profile && <CreateRecipeFormModal triggerRender={triggerRender} setTriggerRender={setTriggerRender}/>}
        </>
    );
}

export default User;
