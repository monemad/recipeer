import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import EditUserFormModal from '../modals/EditUserFormModal';
import CreateRecipeFormModal from '../modals/CreateRecipeFormModal';
import { authenticate } from '../../store/session';
import RecipeCard from '../RecipeComponents/RecipeCard';
import ImageModal from '../modals/ImageModal';
import UserIngredients from '../RecipeComponents/UserIngredients';

function User({profile = false}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const recipes = Object.values(useSelector(state => state.recipes))
    const { userId }  = useParams();

    const [triggerRender, setTriggerRender] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)

    const user = profile ? sessionUser : users[userId];
    const userRecipes = recipes.filter(recipe => recipe.userId === user.id)

    
    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch, triggerRender])
    
    if (user.id === sessionUser?.id && !profile) {
        return (
            <Redirect to='/profile'></Redirect>
        )
    }

    return (
        user && <>
            <div className='profile-banner'>
                <div className='profile-img-div'>
                    <img className='profile-img' onClick={e=>setShowImageModal(true)} src={user.imgUrl || 'https://recipeer-bucket.s3.us-west-1.amazonaws.com/tmpdefault-profile.jpeg'} alt={user.username} width='300px'/>
                    { showImageModal && <ImageModal imgUrl={user.imgUrl} showModal={showImageModal} setShowModal={setShowImageModal}/>}
                </div>
                <div className='username-div'>
                    <h2 className='header'>{user.username}</h2>
                </div>
                { profile &&
                    <EditUserFormModal />
                }
            </div>
            { profile && <UserIngredients user={sessionUser} />}
            <h2 className='header'>Recipes</h2>
            { profile && <CreateRecipeFormModal triggerRender={triggerRender} setTriggerRender={setTriggerRender}/>}
            <div className='recipe-cards'>
                {userRecipes?.map(recipe => 
                    <RecipeCard key={recipe.id} recipe={recipe} />
                )}
            </div>
        </>
    );
}

export default User;
