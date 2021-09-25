import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../store/ingredients';

function RecipeIngredientsForm({ recipeId }) {
    const dispatch = useDispatch()
    const unitsState = useSelector(state => state.units)
    const ingredientsState = useSelector(state => state.ingredients)
    const [quantities, setQuantities] = useState([1])
    const [units, setUnits] = useState([1])
    const [ingredients, setIngredients] = useState([''])

    const unitOptions = Object.values(unitsState).map(unit => 
        <option value={unit.id}>{unit.name}</option>    
    )

    const updateRecipeIngredient = e => {
        const idx = e.target.id;
        switch (e.target.className) {
            case 'quantity':
                const quantity = e.target.value;
                let newQuantities = [...quantities];
                newQuantities[idx] = quantity;
                setQuantities(newQuantities);
                break;
            case 'unit':
                const unit = e.target.value;
                let newUnits = [...units];
                newUnits[idx] = unit;
                setUnits(newUnits);
                break;
            case 'ingredient':
                const ingredient = e.target.value;
                let newIngredients = [...ingredients];
                newIngredients[idx] = ingredient;
                setIngredients(newIngredients);
                break;
            default:
                break;
        }
    }

    const addRecipeIngredient = e => {
        e.preventDefault();
        let newQuantities = [...quantities]
        let newUnits = [...units]
        let newIngredients = [...ingredients]
        newQuantities.push(1)
        newUnits.push(1)
        newIngredients.push('')
        setQuantities(newQuantities)
        setUnits(newUnits)
        setIngredients(newIngredients)
    }

    const removeRecipeIngredient = e => {
        e.preventDefault()
        const idx = e.target.value;
        let newQuantities = [...quantities]
        let newUnits = [...units]
        let newIngredients = [...ingredients]
        newQuantities.splice(idx, 1)
        newUnits.splice(idx, 1)
        newIngredients.splice(idx, 1)
        setQuantities(newQuantities)
        setUnits(newUnits)
        setIngredients(newIngredients)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        ingredients.forEach(async (ing, idx) => {
            const ingredientId = await dispatch(createIngredient(ing.trim()))
            const recipeIngredient = {
                order: idx+1,
                quantity: quantities[idx],
                ingredientId: ingredientId,
                unitId: units[idx],
                recipeId
            }
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
        {ingredients.map((ing, idx) =>
            <div key={idx}>
                <div>
                    <input
                        id={idx}
                        className={'quantity'}
                        type='number'
                        step='any'
                        min='0'
                        value={quantities[idx]}
                        onChange={updateRecipeIngredient}
                        required
                    />
                    <select 
                        id={idx}
                        className='unit'
                        value={units[idx]}
                        onChange={updateRecipeIngredient}
                        required
                    >
                        {unitOptions}
                    </select>    
                    <input
                        id={idx}
                        className={'ingredient'}
                        type='text'
                        value={ing}
                        onChange={updateRecipeIngredient}
                        required
                    />
                    {ingredients.length > 1 && <button value={idx} type='button' onClick={removeRecipeIngredient}>Remove Ingredient</button>}
                </div>
                <div>
                    {idx === ingredients.length-1 && <button type='button' onClick={addRecipeIngredient}>Add Ingredient</button>}
                </div>
            </div>
        )}
        <button>Submit</button>
        </form>
    )
}

export default RecipeIngredientsForm
