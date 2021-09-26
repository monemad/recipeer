import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ConfirmDeleteRecipeModal from "../modals/ConfirmDeleteRecipeModal";

function Recipe() {
    const { recipeId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes);
    const units = useSelector(state => state.units);
    const ingredients = useSelector(state => state.ingredients);
    const attributes = useSelector(state => state.attributes);
    const types = useSelector(state => state.types);
    const users = useSelector(state => state.users);
    const recipe = recipes[recipeId];
    const rating = recipe.ratings.reduce((accum, rating) => accum + rating.value, 0)/recipe.ratings.length;

    const authorized = recipe?.userId === sessionUser.id;

    const pictureObj = {}
    recipe?.pictures.forEach(pic => {
        pictureObj[pic.order] = pic.imgUrl
    })

    return (
        <>
            <h1>{recipe.title}</h1>
            {authorized && <ConfirmDeleteRecipeModal recipeId={recipe?.id}/>}
            <div>
                { pictureObj[0] && <img className='recipe-img' src={pictureObj[0]} alt={recipe.title}/>}
                { recipe?.ratings.length ? <p>Rating: {rating} stars ({recipe.ratings.length} ratings)</p> : <p>Be the first to rate this recipe!</p>}
                <p>Recipe Developer: {users[recipe.userId].firstName} {users[recipe.userId].lastName}</p>
                <p>Cook Time: {recipe.cookTime} minutes</p>
                <p>{recipe.attributes.map(id => <span key={id}>{attributes[id].name} </span>)}</p>
                <p>{recipe.types.map(id => <span key={id}>{types[id].name} </span>)}</p>
            </div>
            <ul>
                {recipe.ingredients.map(ing => <li key={ing.id}>{ing.quantity} {units[ing.unitId].name} {ingredients[ing.ingredientId].name}</li>)}
            </ul>
            <ol>
                {recipe.instructions.map(ins => 
                    <div key={ins.id}>
                        <li>{ins.step}</li>
                        { pictureObj[ins.order] && <img className='instruction-img' src={pictureObj[ins.order]} alt={ins.order}/>}
                    </div>
                )}
            </ol>
            <ul>
                {recipe.feedback.map(fb => <li key={fb.id}>{users[fb.userId].username}: {fb.content}</li>)}
            </ul>
        </>
    )
}

export default Recipe;
