import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteFeedback } from '../../../store/recipes'

function ConfirmDeleteFeedback({ setShowModal, feedbackId }) {
    const dispatch = useDispatch()

    const handleDelete = e => {
        dispatch(deleteFeedback(feedbackId))
        setShowModal(false)
    }

    return (
        <div className='form-buttons'>
            <button onClick={handleDelete}>Delete feedback?</button>
            <button className='cancel-btn' onClick={e => setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default ConfirmDeleteFeedback
