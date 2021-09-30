import React from 'react'
import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipes/${recipe.id}`}>
            <div className='recipe-card'>
                <div className='card-picture-div'>
                    <img className='card-picture' src={recipe.pictures[0].imgUrl}/>
                </div>
                <div className='card-details'>
                    <h3>{recipe.title}</h3>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard;
