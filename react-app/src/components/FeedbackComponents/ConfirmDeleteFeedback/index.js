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
        <div className='confirm-delete-div'>
            <button onClick={handleDelete}>Delete feedback?</button>
            <button onClick={e => setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default ConfirmDeleteFeedback
