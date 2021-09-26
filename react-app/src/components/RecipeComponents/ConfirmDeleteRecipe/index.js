import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteRecipe } from '../../../store/recipes'

function ConfirmDeleteRecipe({ setShowModal, recipeId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = e => {
        dispatch(deleteRecipe(recipeId))
        history.push('/profile')
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete recipe?</button>
            <button onClick={e => setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default ConfirmDeleteRecipe
