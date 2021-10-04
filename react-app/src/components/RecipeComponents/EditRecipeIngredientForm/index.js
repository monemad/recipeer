import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient } from '../../../store/ingredients'
import { editRecipeIngredient } from '../../../store/recipes'
import ConfirmDeleteRecipeIngredientModal from '../../modals/ConfirmDeleteRecipeIngredientModal'

function EditRecipeIngredientForm({ setShowModal, recipeIngredient }) {
    const dispatch = useDispatch()

    const ingredients = useSelector(state => state.ingredients)
    const units = useSelector(state => state.units)

    const [quantity, setQuantity] = useState(recipeIngredient.quantity)
    const [unit, setUnit] = useState(recipeIngredient.unitId)
    const [ingredient, setIngredient] = useState(ingredients[recipeIngredient.ingredientId].name)

    const unitOptions = Object.values(units).map(unit => 
        <option key={unit.id} value={unit.id}>{unit.name}</option>    
    )

    const updateRecipeIngredient = e => {
        switch (e.target.className) {
            case 'quantity':
                setQuantity(e.target.value);
                break;
            case 'unit':
                setUnit(e.target.value);
                break;
            case 'ingredient':
                setIngredient(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()    
        const ingredientId = await dispatch(createIngredient(ingredient.trim()))
        const edit = {
            quantity,
            ingredientId: ingredientId,
            unitId: unit,
            recipeIngredientId: recipeIngredient.id
        }
        await dispatch(editRecipeIngredient(edit))
        setShowModal(false)
    }

    return (
        <div className='edit-recipe-ingredient-div'>
            <form className='edit-recipe-ingredient-form' onSubmit={handleSubmit}>
                <div className='input-recipe-ingredient-div'>
                    <input
                        className='quantity'
                        type='number'
                        step='any'
                        min='0'
                        value={quantity}
                        onChange={updateRecipeIngredient}
                        required
                    />
                    <select 
                        className='unit'
                        value={unit}
                        onChange={updateRecipeIngredient}
                        required
                    >
                        {unitOptions}
                    </select>    
                    <input
                        className='ingredient'
                        type='text'
                        value={ingredient}
                        onChange={updateRecipeIngredient}
                        required
                    />
                </div>
                <button>Edit</button>
            </form>
            <ConfirmDeleteRecipeIngredientModal recipeIngredientId={recipeIngredient.id} />
        </div>
    )
}

export default EditRecipeIngredientForm
