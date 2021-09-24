import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Recipe() {
    const { recipeId } = useParams();
    const recipes = useSelector(state => state.recipes);
    const units = useSelector(state => state.units);
    const ingredients = useSelector(state => state.ingredients);
    const attributes = useSelector(state => state.attributes);
    const types = useSelector(state => state.types);
    const users = useSelector(state => state.users);
    const recipe = recipes[recipeId];
    const rating = recipe.ratings.reduce((accum, rating) => accum + rating.value, 0)/recipe.ratings.length

    return (
        <>
            <h1>{recipe.title}</h1>
            <div>
                <img src={recipe.pictures[0].imgUrl} alt={recipe.title}/>
                <p>Rating: {rating} stars</p>
                <p>Recipe Developer: {users[recipe.userId].firstName} {users[recipe.userId].lastName}</p>
                <p>Cook Time: {recipe.cookTime} minutes</p>
                <p>{recipe.attributes.map(id => <span key={id}>{attributes[id].name} </span>)}</p>
                <p>{recipe.types.map(id => <span key={id}>{types[id].name} </span>)}</p>
            </div>
            <ul>
                {recipe.ingredients.map(ing => <li key={ing.id}>{ing.quantity} {units[ing.unitId].name} {ingredients[ing.ingredientId].name}</li>)}
            </ul>
            <ol>
                {recipe.instructions.map(ins => <li key={ins.id}>{ins.step}</li>)}
            </ol>
            <ul>
                {recipe.feedback.map(fb => <li key={fb.id}>{users[fb.userId].username}: {fb.content}</li>)}
            </ul>
        </>
    )
}

export default Recipe;
