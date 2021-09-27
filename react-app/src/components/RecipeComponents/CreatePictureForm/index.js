import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPicture } from '../../../store/recipes'

function CreatePictureForm({ setShowModal, recipe, order }) {
    const dispatch = useDispatch()
    const [picture, setPicture] = useState('')
    const userId = useSelector(state => state.session.user?.id)

    const updatePicture = e => {
        setPicture(e.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const pic = {
            imgFile: picture,
            order,
            recipeId: recipe.id,
            userId
        }
        await dispatch(createPicture(pic))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Picture</label>
                    <input
                        type='file'
                        name={`recipeImg${order}`}
                        onChange={updatePicture}
                    />
                </div>
                <button>Upload Picture</button>
                <button type='button' onClick={e => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default CreatePictureForm
