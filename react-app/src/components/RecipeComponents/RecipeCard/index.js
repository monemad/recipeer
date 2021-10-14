import React from 'react'
import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipes/${recipe.id}`}>
            <div className='recipe-card'>
                <div className='card-picture-div'>
                    <img className='card-picture' src={recipe.pictures[0]?.order === 0 ? recipe.pictures[0]?.imgUrl : 'https://recipeer-bucket.s3.us-west-1.amazonaws.com/tmpdefault-recipe.png'} alt={recipe.title}/>
                </div>
                <div className='card-details'>
                    <h3>{recipe.title}</h3>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard;
