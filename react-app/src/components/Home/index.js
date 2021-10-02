import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../RecipeComponents/RecipeCard';
import Splash from '../Splash';

function Home({ authenticated }) {
    const recipes = Object.values(useSelector(state => state.recipes))

    const popularitySort = (a, b) => {
        const ratingA = a.ratings.reduce((accum, rating) => accum + rating.value, 0)/a.ratings.length;
        const ratingB = b.ratings.reduce((accum, rating) => accum + rating.value, 0)/b.ratings.length;
        
        const averageDevA = ratingA - 3;
        const averageDevB = ratingB - 3;

        const weightedDevA = averageDevA * a.ratings.length;
        const weightedDevB = averageDevB * b.ratings.length;

        return weightedDevB - weightedDevA
    }

    let bestRecipes = recipes.slice(0, 9)
    bestRecipes.sort(popularitySort)

    return (
        authenticated ? 
        <>
            <h1 className='header'>Best of Recipeer</h1>
            <div className='recipe-cards'>
                {bestRecipes.map(recipe =>
                    <RecipeCard key={recipe.id} recipe={recipe} />    
                )}
            </div>
        </>
        :
        <>
            <Splash />
        </>
    )
}

export default Home
