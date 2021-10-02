import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CreateRecipeIngredientFormModal from '../../modals/CreateRecipeIngredientFormModal';
import EditRecipeIngredientFormModal from '../../modals/EditRecipeIngredientFormModal';

function RecipeIngredients({ recipe, authorized }) {
    const units = useSelector(state => state.units);
    const ingredients = useSelector(state => state.ingredients);
    const [show, setShow] = useState(true);

    return (
        <>
            <div className={`recipe-ingredients-container ${show ? 'show' : 'hide'}`}>
            {/* <div className={`recipe-ingredients-container`}> */}
                <h2 className='header'>Ingredients</h2>
                {/* <i className="fas fa-chevron-right toggle-ingredients"></i> */}
                <div className='recipe-ingredients'>
                    {recipe.ingredients.map(ing => 
                        <div key={ing.id} className='recipe-ingredient'>
                            {ing.quantity} {units[ing.unitId].name} {ingredients[ing.ingredientId].name}
                            { authorized && <EditRecipeIngredientFormModal recipeIngredient={ing}/> }
                        </div>
                    )}
                </div>
                { authorized && 
                    <CreateRecipeIngredientFormModal recipe={recipe}/>
                }
            </div>
        </>
    )
}

export default RecipeIngredients
