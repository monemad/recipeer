import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteRecipeIngredient } from '../../../store/recipes'

function ConfirmDeleteRecipeIngredient({ setShowModal, recipeIngredientId }) {
    const dispatch = useDispatch()

    const handleDelete = e => {
        dispatch(deleteRecipeIngredient(recipeIngredientId))
        setShowModal(false)
    }

    return (
        <div className='confirm-delete-div'>
            <button onClick={handleDelete}>Delete ingredient?</button>
            <button onClick={e => setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default ConfirmDeleteRecipeIngredient
