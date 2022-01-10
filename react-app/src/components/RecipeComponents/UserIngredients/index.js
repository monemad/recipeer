import React from "react";
import { useSelector } from "react-redux";

function UserIngredients({ user }) {
    const ingredients = useSelector(state => state.ingredients);
    const units = useSelector(state => state.units);
    const recipes = useSelector(state => state.recipes);
    let shoppingList = user.shoppingList;

    shoppingList.sort((a, b) => a.recipeId === b.recipeId ? a.order - b.order : recipes[b.recipeId].name < recipes[a.recipeId].name)

    console.log("sorted:", shoppingList)

    return (
        <>
            <div className='recipe-ingredients-container'>
                <h2 className='header'>Shopping List</h2>
                <div className='recipe-ingredients'>
                    {
                        shoppingList.map(ing => 
                            <div key={ing.id} className='recipe-ingredient'>
                                {ing.multiplier * ing.quantity} {units[ing.unitId].name} {ingredients[ing.ingredientId].name}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default UserIngredients
