import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Feedback from "../../FeedbackComponents/Feedback"
import RecipeIngredients from "../RecipeIngredients";
import RecipeInstructions from "../RecipeInstructions";
import ConfirmDeletePictureModal from "../../modals/ConfirmDeletePictureModal";
import CreatePictureFormModal from "../../modals/CreatePictureFormModal";
import EditRecipeFormModal from "../../modals/EditRecipeFormModal";
import { addRating, deleteRating, editRating } from "../../../store/recipes";
import ImageModal from "../../modals/ImageModal";

function Recipe() {
    const dispatch = useDispatch()
    const { recipeId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes);
    const attributes = useSelector(state => state.attributes);
    const types = useSelector(state => state.types);
    const users = useSelector(state => state.users);
    const recipe = recipes[recipeId];
    let rating = recipe?.ratings.reduce((accum, rating) => accum + rating.value, 0)/recipe.ratings.length;
    rating = rating.toFixed(1)
    const userRating = recipe?.ratings.find(rating => rating.userId === sessionUser?.id)
    const authorized = recipe?.userId === sessionUser?.id;
    const [editRecipe, setEditRecipe] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false)

    const pictureObj = {}
    recipe?.pictures.forEach(pic => {
        pictureObj[pic.order] = {
            imgUrl: pic.imgUrl,
            id: pic.id
        }
    })

    useEffect(() => {
        const stars = Array.from(document.querySelectorAll('.fa-star'));
        stars.forEach(star => {
            star.classList.remove('user-rating')
        })
        if (userRating) {
            for (let i = 0; i < userRating.value; i++) {
                stars[i]?.classList.add('user-rating')
            }
        }
    })

    const toggleEditRecipe = e => {
        setEditRecipe(!editRecipe)
    }

    const handleRating = async e => {
        const value = +e.target.id
        if (userRating){
            if (userRating.value === value) 
                return await dispatch(deleteRating(userRating.id))
            const edit = {
                ratingId: userRating.id,
                value
            }
            return await dispatch(editRating(edit))
        }
        const rating = {
            recipeId: recipe.id,
            userId: sessionUser?.id,
            value
        }
        await dispatch(addRating(rating))
    }

    return (
        <div className='recipe-page'>
            
            <div className='recipe-details'>
                <div className='recipe-picture-div'>
                    { pictureObj[0] ?
                        <>
                            <img className='recipe-picture' onClick={e=>setShowImageModal(true)} src={pictureObj[0].imgUrl} alt={recipe.title}/>
                            { showImageModal && <ImageModal imgUrl={pictureObj[0].imgUrl} showModal={showImageModal} setShowModal={setShowImageModal}/>}
                            { editRecipe && <ConfirmDeletePictureModal pictureId={pictureObj[0].id} />}
                        </>
                        :
                        <div className='picture-placeholder'>
                            <p>Upload a picture!</p>
                            {authorized && <CreatePictureFormModal recipe={recipe} order={0}/>}
                        </div>
                    }
                    <div className='recipe-picture-bottom-banner'>
                        <span className='difficulty'>Difficulty: {recipe.difficulty}</span>
                        <span className='cook-time'>Cook Time: {recipe.cookTime} minutes</span>
                        <div className='rating'>
                            <div className='stars'>
                                <i id='1' className={`${rating >= 1 ? 'fas fa-star' : 'far fa-star'}`} onClick={handleRating}></i>
                                <i id='2' className={`${rating >= 2 ? 'fas fa-star' : 'far fa-star'}`} onClick={handleRating}></i>
                                <i id='3' className={`${rating >= 3 ? 'fas fa-star' : 'far fa-star'}`} onClick={handleRating}></i>
                                <i id='4' className={`${rating >= 4 ? 'fas fa-star' : 'far fa-star'}`} onClick={handleRating}></i>
                                <i id='5' className={`${rating >= 5 ? 'fas fa-star' : 'far fa-star'}`} onClick={handleRating}></i>
                            </div>
                            <div className='average-rating'>
                                { recipe?.ratings.length ? 
                                    <span>{rating} stars ({recipe.ratings.length} {recipe.ratings.length === 1 ? 'rating' : 'ratings'})</span> 
                                    : 
                                    <span>No ratings.</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='recipe-header-div'>
                    <div className='recipe-header'>
                        <h1 className='header'>{recipe.title}</h1>
                        { authorized && <i className="fas fa-edit" onClick={toggleEditRecipe}></i> }
                    </div>                 
                    <p>Recipe Developer: <Link to={`/users/${recipe?.userId}`}>{users[recipe.userId]?.firstName} {users[recipe.userId]?.lastName}</Link></p>
                    { editRecipe && <EditRecipeFormModal recipe={recipe} /> }
                </div>
                <div className='tag-div recipe-attribute-div'>
                    {recipe.attributes.map(id => <div key={id} className='tag recipe-attribute'>{attributes[id].name} </div>)}
                </div>
                <div className='tag-div recipe-type-div'>
                    {recipe.types.map(id => <div key={id} className='tag recipe-type'>{types[id].name} </div>)}
                </div>
            </div>
            <RecipeIngredients recipe={recipe} authorized={editRecipe}/>
            <RecipeInstructions recipe={recipe} pictureObj={pictureObj} authorized={editRecipe}/>
            <Feedback recipe={recipe} users={users} sessionUser={sessionUser}/>
        </div>
    )
}

export default Recipe;
