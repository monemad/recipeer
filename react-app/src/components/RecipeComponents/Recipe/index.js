import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ConfirmDeleteRecipeModal from "../../modals/ConfirmDeleteRecipeModal";
import Feedback from "../../FeedbackComponents/Feedback"
import RecipeIngredients from "../RecipeIngredients";
import RecipeInstructions from "../RecipeInstructions";

function Recipe() {
    const { recipeId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes);
    const attributes = useSelector(state => state.attributes);
    const types = useSelector(state => state.types);
    const users = useSelector(state => state.users);
    const recipe = recipes[recipeId];
    const rating = recipe?.ratings.reduce((accum, rating) => accum + rating.value, 0)/recipe.ratings.length;

    const authorized = recipe?.userId === sessionUser?.id;

    const pictureObj = {}
    recipe?.pictures.forEach(pic => {
        pictureObj[pic.order] = pic.imgUrl
    })

    return (
        <>
            <h1>{recipe.title}</h1>
            {authorized && <ConfirmDeleteRecipeModal recipeId={recipe?.id}/>}
            <div className='recipe-details'>
                { pictureObj[0] && <img className='recipe-img' src={pictureObj[0]} alt={recipe.title}/>}
                { recipe?.ratings.length ? <p>Rating: {rating} stars ({recipe.ratings.length} ratings)</p> : <p>Be the first to rate this recipe!</p>}
                <p>Recipe Developer: {users[recipe.userId].firstName} {users[recipe.userId].lastName}</p>
                <p>Cook Time: {recipe.cookTime} minutes</p>
                <p>{recipe.attributes.map(id => <span key={id}>{attributes[id].name} </span>)}</p>
                <p>{recipe.types.map(id => <span key={id}>{types[id].name} </span>)}</p>
                { authorized && 
                    <button>Edit details</button>
                }
            </div>
            <RecipeIngredients recipe={recipe} authorized={authorized}/>
            <RecipeInstructions recipe={recipe} pictureObj={pictureObj} authorized={authorized}/>
            <Feedback recipe={recipe} users={users} sessionUser={sessionUser}/>
        </>
    )
}

export default Recipe;
