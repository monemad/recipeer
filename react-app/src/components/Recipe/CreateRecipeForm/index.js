import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, createRecipeIngredient, createInstruction, addAttribute, addType, createPicture } from '../../store/recipes';
import { createIngredient } from '../../store/ingredients';

function RecipeForm({ setShowModal }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const unitsState = useSelector(state => state.units)
    const attributesArray = Object.values(useSelector(state => state.attributes))
    const typesArray = Object.values(useSelector(state => state.types))

    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState(1)
    const [cookTime, setCookTime] = useState(1)

    const [quantities, setQuantities] = useState([1])
    const [units, setUnits] = useState([1])
    const [ingredients, setIngredients] = useState([''])

    const [steps, setSteps] = useState([''])

    const [attributes, setAttributes] = useState(Array(attributesArray.length).fill(false))
    const [types, setTypes] = useState(Array(typesArray.length).fill(false))

    const [pictures, setPictures] = useState({})

    const unitOptions = Object.values(unitsState).map(unit => 
        <option key={unit.id} value={unit.id}>{unit.name}</option>    
    )

    const updateTitle = e => {
        setTitle(e.target.value)
    }

    const updateDifficulty = e => {
        setDifficulty(e.target.value)
    }

    const updateCookTime = e => {
        setCookTime(e.target.value)
    }

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

    const updateStep = e => {
        const idx = e.target.id;
        const step = e.target.value;
        let newSteps = [...steps]
        newSteps[idx] = step;
        setSteps(newSteps)
    }

    const updateTag = e => {
        const idx = e.target.id;
        switch (e.target.className) {
            case 'attribute':
                const newAttributes = [...attributes];
                newAttributes[idx] = newAttributes[idx] ? false : true;
                setAttributes(newAttributes);
                break
            case 'type':
                const newTypes = [...types];
                newTypes[idx] = newTypes[idx] ? false : true;
                setTypes(newTypes);
                break;
            default:
                break;
        }
    } 

    const updatePictures = e => {
        const order = +e.target.id;
        const newPictures = {...pictures}
        newPictures[order] = {
            order,
            imgFile: e.target.files[0]
        }
        setPictures(newPictures)
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

    const addStep = e => {
        e.preventDefault()
        let newSteps = [...steps]
        newSteps.push('')
        setSteps(newSteps)
    }

    const removeStep = e => {
        e.preventDefault()
        const idx = e.target.value
        let newSteps = [...steps]
        let newPictures = {...pictures}
        newSteps.splice(idx, 1)
        delete newPictures[+idx+1]
        setSteps(newSteps)
        setPictures(newPictures)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        // create Recipe
        const recipe = {
            title,
            difficulty,
            cookTime,
            userId: sessionUser?.id
        }

        const recipeId = await dispatch(createRecipe(recipe))

        // create RecipeIngredients
        ingredients.forEach(async (ing, idx) => {
            // create Ingredient (will successfully create if Ingredient does not alredy exist in database)
            const ingredientId = await dispatch(createIngredient(ing.trim()))
            const recipeIngredient = {
                order: idx+1,
                quantity: quantities[idx],
                ingredientId: ingredientId,
                unitId: units[idx],
                recipeId
            }
            await dispatch(createRecipeIngredient(recipeIngredient))
        })

        // create Instructions
        steps.forEach(async (step, idx) => {
            const instruction = {
                order: idx+1,
                step,
                recipeId
            }
            await dispatch(createInstruction(instruction))
        })

        // create RecipeAttributeJoins
        attributes.forEach(async (attr, idx) => {
            if (attr) {
                const data = {
                    attributeId: attributesArray[idx].id,
                    recipeId
                }
                await dispatch(addAttribute(data))
            }
        })


        types.forEach(async (type, idx) => {
            if (type) {
                const data = {
                    typeId: typesArray[idx].id,
                    recipeId
                }
                await dispatch(addType(data))
            }
        })

        Object.values(pictures).forEach(async pic => {
            if (pic.imgFile) {
                const picture = {
                    imgFile: pic.imgFile,
                    order: pic.order,
                    recipeId,
                    userId: sessionUser.id
                }
                await dispatch(createPicture(picture))
            }
        })

        setShowModal(false);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Recipe!</h2>
            <div className='recipe-details'>
                <div>
                    <label>Recipe Title: </label>
                    <input
                        type='text'
                        value={title}
                        onChange={updateTitle}
                        required
                    />
                </div>
                <div>
                    <label>Difficulty (1-10)</label>
                    <input
                        type='number'
                        min='1'
                        max='10'
                        step='1'
                        value={difficulty}
                        onChange={updateDifficulty}
                        required
                    />
                </div>
                <div>
                    <label>Cook Time (minutes)</label>
                    <input
                        type='number'
                        min='1'
                        step='1'
                        value={cookTime}
                        onChange={updateCookTime}
                        required
                    />
                </div>
                <div>
                    <label>Picture</label>
                    <input
                        id='0'
                        type='file'
                        name='recipeImg'
                        onChange={updatePictures}
                    />
                </div>
            </div>
            <div className='recipe-ingredients'>
                <h3>Ingredients</h3>
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
            </div>
            <div className='recipe-instructions'>
                <h3>Instructions</h3>
                {steps.map((step, idx) =>
                    <div key={idx}>
                        <div>
                            <label>Step {idx+1}: </label>
                            <textarea
                                id={idx}
                                value={step}
                                onChange={updateStep}
                                required
                            />
                            {steps.length > 1 && <button value={idx} type='button' onClick={removeStep}>Remove Step</button>}
                        </div>
                        <div>
                            <label>Picture</label>
                            <input
                                id={idx+1}
                                type='file'
                                name={`recipeImg${idx+1}`}
                                onChange={updatePictures}
                            />
                        </div>
                        <div>
                            {idx === steps.length-1 && <button type='button' onClick={addStep}>Add Step</button>}
                        </div>
                    </div>
                )}
            </div>
            <div className='recipe-attributes'>
                <h3>Attributes</h3>
                {attributesArray.map((attr, idx) =>
                    <div key={attr.id}>
                        <label>{attr.name}</label>
                        <input
                            id={idx}
                            className='attribute'
                            type='checkbox'
                            checked={attributes[idx] === true}
                            onChange={updateTag}
                        />
                    </div>
                )}
            </div>
            <div className='recipe-types'>
                <h3>Types</h3>
                {typesArray.map((type, idx) =>
                    <div key={type.id}>
                        <label>{type.name}</label>
                        <input
                            id={idx}
                            className='type'
                            type='checkbox'
                            checked={types[idx] === true}
                            onChange={updateTag}
                        />
                    </div>
                )}
            </div>
            <button>Submit</button>
        </form>
    )
}

export default RecipeForm
