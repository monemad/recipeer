import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeComponents/RecipeCard';

const Search = () => {
    const recipes = Object.values(useSelector(state => state.recipes));
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([...recipes]);

    useEffect(() => {
        if (!searchQuery.length)
            setFilteredRecipes([...recipes]);
        else {
            setFilteredRecipes(
                recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }
    }, [searchQuery])

    const updateSearchQuery = e => {
        setSearchQuery(e.target.value);
    }

    return (
        <>
            <h1>Search</h1>
            <div search-div>
                <input 
                    className='search-input'
                    value={searchQuery}
                    onChange={updateSearchQuery}
                />
            </div>
            <div className='search-results recipe-cards'>
                {filteredRecipes.map(recipe => <RecipeCard recipe={recipe}/>)}
            </div>
        </>
    )
}

export default Search;
