import React from "react";
import { useSelector } from "react-redux";

function UserIngredients({ user }) {
    console.log("Shopping List:", user.shoppingList);
    const ingredients = useSelector(state => state.ingredients);
    const units = useSelector(state => state.units);
    const recipes = useSelector(state => state.recipes);

    return (
        <>
            <div className='recipe-ingredients-container'>
                <h2 className='header'>Shopping List</h2>
                <div className='recipe-ingredients'>
                    {
                        
                    }
                </div>
            </div>
        </>
    )
}

export default UserIngredients
