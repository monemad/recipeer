import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createIngredient } from '../../store/ingredients';

function IngredientsForm() {
    const dispatch = useDispatch()
    const [ingredients, setIngredients] = useState([''])

    const updateIngredient = e => {
        const idx = e.target.id;
        const ingredient = e.target.value;
        let newIngredients = [...ingredients];
        newIngredients[idx] = ingredient;
        setIngredients(newIngredients);
    }

    const addIngredient = e => {
        e.preventDefault();
        let newIngredients = [...ingredients]
        newIngredients.push('')
        setIngredients(newIngredients)
    }

    const removeIngredient = e => {
        e.preventDefault()
        const idx = e.target.value;
        let newIngredients = [...ingredients]
        newIngredients.splice(idx, 1)
        setIngredients(newIngredients)
    }

    const handleSubmit = e => {
        e.preventDefault();
        const ing = ingredients.filter(ing => ing !== '')
        for (let i of ing)
            dispatch(createIngredient(i.trim()))
    }
    
    return (
        <form onSubmit={handleSubmit}>
        {ingredients.map((ing, idx) =>
            <div key={idx}>
                <div>
                    <input
                        id={idx}
                        type='text'
                        value={ing}
                        onChange={updateIngredient}
                    />
                    {ingredients.length > 1 && <button value={idx} type='button' onClick={removeIngredient}>Remove Ingredient</button>}
                </div>
                <div>
                    {idx === ingredients.length-1 && <button type='button' onClick={addIngredient}>Add Ingredient</button>}
                </div>
            </div>
        )}
        <button>Submit</button>
        </form>
    )
}

export default IngredientsForm
