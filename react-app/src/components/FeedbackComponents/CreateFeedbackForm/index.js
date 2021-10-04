import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFeedback } from '../../../store/recipes'

function CreateFeedbackForm({ recipe, sessionUser }) {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')

    const updateContent = e => {
        setContent(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const feedback = {
            content, 
            recipeId: recipe.id,
            userId: sessionUser.id
        }
        setContent('')
        await dispatch(addFeedback(feedback));
    }

    return (
        <div className='create-feedback-div'>
            <form className='create-feedback-form'onSubmit={handleSubmit}>
                <div>
                    <textarea
                    value={content}
                    onChange={updateContent}
                    required
                    maxLength={500}
                    />
                </div>
                <button>Post Feedback</button>
            </form>
        </div>
    )
}

export default CreateFeedbackForm
