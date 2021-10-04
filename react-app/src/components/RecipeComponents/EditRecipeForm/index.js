import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editRecipe, addAttribute, removeAttribute, addType, removeType } from '../../../store/recipes'
import ConfirmDeleteRecipeModal from '../../modals/ConfirmDeleteRecipeModal'

function EditRecipeForm({ setShowModal, recipe }) {
    const dispatch = useDispatch()
    const attributesArray = Object.values(useSelector(state => state.attributes))
    const typesArray = Object.values(useSelector(state => state.types))

    const [title, setTitle] = useState(recipe.title)
    const [difficulty, setDifficulty] = useState(recipe.difficulty)
    const [cookTime, setCookTime] = useState(recipe.cookTime)

    const [attributes, setAttributes] = useState(attributesArray.map(attr => recipe.attributes.includes(attr.id)))
    const [types, setTypes] = useState(typesArray.map(type => recipe.types.includes(type.id)))

    const updateTitle = e => {
        setTitle(e.target.value)
    }

    const updateDifficulty = e => {
        setDifficulty(e.target.value)
    }

    const updateCookTime = e => {
        setCookTime(e.target.value)
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

    const handleSubmit = async e => {
        e.preventDefault();

        const edit = {
            recipeId: recipe.id,
            title,
            difficulty,
            cookTime
        }

        await dispatch(editRecipe(edit))

        attributes.forEach(async (attr, idx) => {
            const exists = recipe.attributes.includes(attributesArray[idx].id)
            const data = {
                recipeId: recipe.id,
                attributeId: attributesArray[idx].id
            }
            if (attr && !exists) {
                await dispatch(addAttribute(data))
            } else if (!attr && exists) {
                await dispatch(removeAttribute(data))
            }
        })

        types.forEach(async (attr, idx) => {
            const exists = recipe.types.includes(typesArray[idx].id)
            const data = {
                recipeId: recipe.id,
                typeId: typesArray[idx].id
            }
            if (attr && !exists) {
                await dispatch(addType(data))
            } else if (!attr && exists) {
                await dispatch(removeType(data))
            }
        })

        setShowModal(false)
    }

    return (
        <div className='edit-recipe-div'>
            <form className='edit-recipe-form' onSubmit={handleSubmit}>
                <div>
                    <label>Recipe Title: </label>
                    <input
                        type='text'
                        value={title}
                        onChange={updateTitle}
                        required
                        maxLength={100}
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
                <div className='recipe-checkboxes'>
                    <div className='recipe-attributes'>
                        <h3>Attributes</h3>
                        <div className='checkboxes'>
                            {attributesArray.map((attr, idx) =>
                                <div key={attr.id}>
                                    <label>{attr.name}</label>
                                    <input
                                        id={idx}
                                        className='attribute'
                                        type='checkbox'
                                        checked={attributes[idx]}
                                        onChange={updateTag}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='recipe-types'>
                        <h3>Types</h3>
                        <div className='checkboxes'>
                            {typesArray.map((type, idx) =>
                                <div key={type.id}>
                                    <label>{type.name}</label>
                                    <input
                                        id={idx}
                                        className='type'
                                        type='checkbox'
                                        checked={types[idx]}
                                        onChange={updateTag}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='form-buttons'>
                    <button>Update</button>
                    <button className='cancel-btn' type='button' onClick={e => setShowModal(false)}>Cancel</button>
                    <ConfirmDeleteRecipeModal recipeId={recipe.id} />
                </div>
            </form>
        </div>
    )
}

export default EditRecipeForm
