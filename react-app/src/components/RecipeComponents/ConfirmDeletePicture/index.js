import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePicture } from '../../../store/recipes'

function ConfirmDeletePicture({ setShowModal, pictureId }) {
    const dispatch = useDispatch()

    const handleDelete = e => {
        dispatch(deletePicture(pictureId))
        setShowModal(false)
    }

    return (
        <div className='form-buttons'>
            <button onClick={handleDelete}>Delete picture?</button>
            <button className='cancel-btn' onClick={e => setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default ConfirmDeletePicture
