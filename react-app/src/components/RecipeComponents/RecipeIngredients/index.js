import React from 'react'
import { useSelector } from 'react-redux'
import ConfirmDeleteRecipeIngredientModal from '../../modals/ConfirmDeleteRecipeIngredientModal';
import CreateRecipeIngredientFormModal from '../../modals/CreateRecipeIngredientFormModal';
import EditRecipeIngredientFormModal from '../../modals/EditRecipeIngredientFormModal';

function RecipeIngredients({ recipe, authorized }) {
    const units = useSelector(state => state.units);
    const ingredients = useSelector(state => state.ingredients);

    return (
        <div className='recipe-ingredients'>
            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map(ing => 
                    <li key={ing.id}>
                        <div>
                            {ing.quantity} {units[ing.unitId].name} {ingredients[ing.ingredientId].name}
                            <EditRecipeIngredientFormModal recipeIngredient={ing}/>
                            <ConfirmDeleteRecipeIngredientModal recipeIngredientId={ing.id} />
                        </div>
                    </li>
                )}
            </ul>
            { authorized && 
                <CreateRecipeIngredientFormModal recipe={recipe}/>
            }
        </div>
    )
}

export default RecipeIngredients
