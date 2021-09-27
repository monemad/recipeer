import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient } from '../../../store/ingredients'
import { createRecipeIngredient } from '../../../store/recipes'

function CreateRecipeIngredientForm({ setShowModal, recipe }) {
    const dispatch = useDispatch()

    const units = useSelector(state => state.units)

    const [quantity, setQuantity] = useState(1)
    const [unit, setUnit] = useState(1)
    const [ingredient, setIngredient] = useState('')

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
        const order = recipe.ingredients[recipe.ingredients.length-1].order
        const recipeIngredient = {
            quantity,
            ingredientId: ingredientId,
            unitId: unit,
            order,
            recipeId: recipe.id
        }
        await dispatch(createRecipeIngredient(recipeIngredient))
        setShowModal(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className={'quantity'}
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
                        className={'ingredient'}
                        type='text'
                        value={ingredient}
                        onChange={updateRecipeIngredient}
                        required
                    />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default CreateRecipeIngredientForm
