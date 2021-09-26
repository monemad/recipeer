import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import EditUserFormModal from '../modals/EditUserFormModal';
import CreateRecipeFormModal from '../modals/CreateRecipeFormModal';

function User({profile = false}) {
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const recipes = useSelector(state => state.recipes)
    const { userId }  = useParams();

    const user = profile ? sessionUser : users[userId];

    return (
        <>
            <div className='profile-banner'>
                <div className='profile-img-div'>
                    <img className='profile-img' src={user.imgUrl} alt={user.username} width='300px'/>
                </div>
                <div className='username-div'>
                    <h1>{user.username}</h1>
                </div>
                { profile &&
                    <EditUserFormModal />
                }
            </div>
            <div className='user-recipes'>
                <h2>Recipes</h2>
                {user.recipes?.map(recipeId => 
                    <div key={recipeId}><Link to={`/recipes/${recipeId}`}>{recipes[recipeId]?.title}</Link></div>)}
            </div>
            <CreateRecipeFormModal />
        </>
    );
}
export default User;
