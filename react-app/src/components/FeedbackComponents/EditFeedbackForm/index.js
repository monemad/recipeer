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
        <div className='edit-feedback-div'>
            <form className='edit-feedback-form' onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={content}
                        onChange={updateContent}
                        required
                        maxLength={500}
                    />
                </div>
                <div className='form-buttons'>
                    <button>Edit</button>
                    <button className='cancel-btn' type='button' onClick={e => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditFeedbackForm;
