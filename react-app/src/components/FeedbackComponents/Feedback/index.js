import React from 'react'
import { Link } from 'react-router-dom'
import CreateFeedbackForm from '../CreateFeedbackForm';

function Feedback({ recipe, users, sessionUser }) {

    return (
        <div className='feedback-section-div'>
            <h2>Recipe Feedback</h2>
            <CreateFeedbackForm recipe={recipe} sessionUser={sessionUser} />
            {recipe.feedback.map(fb => 
                <div className='feedback-div'>
                    <div className='feedback-img-div'>
                        <img className='user-comment-img' src={users[fb.userId].imgUrl} />
                    </div>
                    <div className='feedback'>
                        <Link to={`/users/${fb.userId}`}><p className='feedback-author'>{users[fb.userId].firstName}</p></Link>
                        <p className='feedback-content'>{fb.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Feedback;
