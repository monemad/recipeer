import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editFeedback } from '../../../store/recipes'

function EditFeedbackForm({ setShowModal, feedback }) {
    const dispatch = useDispatch()
    const [content, setContent] = useState(feedback.content)
    
    const updateContent = e => {
        setContent(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const edit = {
            feedbackId: feedback.id,
            content
        }
        await dispatch(editFeedback(edit))
        setShowModal(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={content}
                        onChange={updateContent}
                        required
                    />
                </div>
                <button>Edit Feedback</button>
                <button type='button' onClick={e => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditFeedbackForm;
