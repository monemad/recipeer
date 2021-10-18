import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateRecipeIngredientFormModal from '../../modals/CreateRecipeIngredientFormModal';
import EditRecipeIngredientFormModal from '../../modals/EditRecipeIngredientFormModal';
import { createUserIngredient } from '../../../store/session';

function RecipeIngredients({ recipe, authorized }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const shoppingList = sessionUser?.shoppingList
    const units = useSelector(state => state.units);
    const ingredients = useSelector(state => state.ingredients);

    const addToShoppingList = async e => {
        const order = shoppingList[shoppingList.length - 1]?.order + 1
        const multiplier = 1;
        const recipeIngredientId = +e.target.id;
        const userId = sessionUser?.id;

        const data = {order, multiplier, recipeIngredientId, userId}

        await dispatch(createUserIngredient(data))
    }

    return (
        <>
            <div className='recipe-ingredients-container'>
                <h2 className='header'>Ingredients</h2>
                <div className='recipe-ingredients'>
                    {recipe.ingredients.map(ing => 
                        <div key={ing.id} className='recipe-ingredient'>
                            {ing.quantity} {units[ing.unitId].name} {ingredients[ing.ingredientId].name}
                            { !shoppingList?.find(i => i.ingredientId === ing.ingredientId) && <button id={ing.id} onClick={addToShoppingList}>+</button>}
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
