import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeComponents/RecipeCard';

const Search = () => {
    const recipes = Object.values(useSelector(state => state.recipes));
    const ingredients = useSelector(state => state.ingredients);
    const attributes = Object.values(useSelector(state => state.attributes));
    const types = Object.values(useSelector(state => state.types));

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([...recipes]);
    const [showFilters, setShowFilters] = useState(true);
    const [attributeFilters, setAttributeFilters] = useState(Array(attributes.length).fill(false));
    const [typeFilters, setTypeFilters] = useState(Array(types.length).fill(false));
    const [ingredient, setIngredient] = useState('');
    const [ingredientFilters, setIngredientFilters] = useState([]);
    const [difficulty, setDifficulty] = useState(10);
    const [rating, setRating] = useState(0);
    const [cookTime, setCookTime] = useState(0);

    
    const updateSearchQuery = e => {
        setSearchQuery(e.target.value);
    }
    
    const toggleFilterDropdown = _e => {
        setShowFilters(!showFilters);
    }
    
    const resetFilters = _e => {
        setAttributeFilters([...attributeFilters].fill(false));
        setTypeFilters([...typeFilters].fill(false));
        setIngredientFilters([]);
        setRating(0);
        setDifficulty(10);
        setCookTime(0);
    }
    
    const renderResetButton = () => {
        return (
            attributeFilters.includes(true) || 
            typeFilters.includes(true) || 
            ingredientFilters.length > 0 ||
            rating > 0 ||
            difficulty < 10 ||
            cookTime > 0
        )    
    }
    
    const updateTag = e => {
        const idx = e.target.id;
        switch (e.target.className) {
            case 'attribute':
                const newAttributeFilters = [...attributeFilters];
                newAttributeFilters[idx] = newAttributeFilters[idx] ? false : true;
                setAttributeFilters(newAttributeFilters);
                break
            case 'type':
                const newTypeFilters = [...typeFilters];
                newTypeFilters[idx] = newTypeFilters[idx] ? false : true;
                setTypeFilters(newTypeFilters);
                break;
            default:
                break;
        }
    }

    const updateIngredient = e => {
        setIngredient(e.target.value);
    }

    const updateDifficulty = e => {
        setDifficulty(e.target.value);
    }

    const updateRating = e => {
        setRating(e.target.value);
    }

    const updateCookTime = e => {
        setCookTime(+e.target.value)
    }

    const handleIngredientSubmit = e => {
        e.preventDefault();
        const ing = ingredient.toLowerCase();
        if (!ing.length) return;
        let ingFilterCopy = [...ingredientFilters]
        if (!ingFilterCopy.includes(ing))
            ingFilterCopy.push(ing)
        setIngredientFilters(ingFilterCopy);
        setIngredient('');
    }

    const removeIngredient = e => {
        const ing = e.target.id;
        let ingFilterCopy = [...ingredientFilters];
        ingFilterCopy.splice(ingFilterCopy.indexOf(ing), 1);
        setIngredientFilters(ingFilterCopy);
    }
                
    const findIntersection = (...filtered) => {
        let intersection = [...filtered[0]];
        for (let i = 1; i < filtered.length; i++) {
            intersection = intersection.filter(ele => filtered[i].includes(ele))
        }
        return intersection;
    }

    useEffect(() => {
        let searchFiltered = [...recipes];
        let attributeFiltered = [...recipes];
        let typeFiltered = [...recipes];
        let ingredientFiltered = [...recipes];
        let ratingFiltered = [...recipes];
        let difficultyFiltered = [...recipes];
        let cookTimeFiltered = [...recipes];
        let allFiltered = []
        
        if (searchQuery.length) {
            searchFiltered = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        
        attributeFiltered = recipes.filter(recipe => {
            for (let i = 0; i < attributeFilters.length; i++) {
                if (attributeFilters[i] && !recipe.attributes.includes(attributes[i].id))
                return false;
            }
            return true;
        })
        
        typeFiltered = recipes.filter(recipe => {
            for (let i = 0; i < typeFilters.length; i++) {
                if (typeFilters[i] && !recipe.types.includes(types[i].id))
                    return false;
            }
            return true;
        })

        if (ingredientFilters.length) {
            ingredientFiltered = recipes.filter(recipe => {
                let recipeIngredients = recipe.ingredients.map(ing => ingredients[ing.ingredientId].name).join(';');
                for (let i = 0; i < ingredientFilters.length; i++) {
                    if (!recipeIngredients.includes(ingredientFilters[i]))
                        return false;
                }
                return true;
            })
        }

        ratingFiltered = recipes.filter(recipe => {
            let recipeRating = 0;
            if (recipe.ratings.length)
                recipeRating = recipe.ratings.reduce((accum, rating) => accum + rating.value, 0)/recipe.ratings.length;
            return recipeRating.toFixed(2) >= rating;
        })

        difficultyFiltered = recipes.filter(recipe => recipe.difficulty <= difficulty);

        if (cookTime && cookTime < 1000)
            cookTimeFiltered = recipes.filter(recipe => recipe.cookTime <= cookTime)

        allFiltered.push(searchFiltered);
        allFiltered.push(attributeFiltered);
        allFiltered.push(typeFiltered);
        allFiltered.push(ingredientFiltered);
        allFiltered.push(ratingFiltered);
        allFiltered.push(difficultyFiltered);
        allFiltered.push(cookTimeFiltered);
        
        setFilteredRecipes(findIntersection(...allFiltered));

    }, [searchQuery, attributeFilters, typeFilters, ingredientFilters, rating, difficulty, cookTime])

    return (
        <>
            <h1>Search</h1>
            <div className='search-div'>
                <form className='search-form'>
                    <input 
                        className='search-input'
                        value={searchQuery}
                        onChange={updateSearchQuery}
                        placeholder='Search here...'
                    />
                </form>
            </div>
            <div className='filter-buttons'>
                <button onClick={toggleFilterDropdown}>
                    { showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                {renderResetButton() && <button onClick={resetFilters}>
                    Reset Filters
                </button>}
            </div>
            { showFilters && 
                <div className='filters-div'>
                    <div className='slider-filters'>
                        <div className='rating-filter'>
                            <input
                                type='range'
                                min='0'
                                max='5'
                                step='0.5'
                                value={rating}
                                onChange={updateRating}>
                            </input>
                            <span>Min Rating: {rating}</span>
                        </div>
                        <div className='difficulty-filter'>
                            <input
                                type='range'
                                min='1'
                                max='10'
                                step='1'
                                value={difficulty}
                                onChange={updateDifficulty}>
                            </input>
                            <span>Max Difficulty: {difficulty}</span>
                        </div>
                        <div className='cooktime-filter'>
                            <select
                                value={cookTime}
                                onChange={updateCookTime}>
                                <option value='0' disabled>Select Max Cook Time</option>
                                <option value='30'>30 minutes</option>
                                <option value='60'>1 hour</option>
                                <option value='120'>2 hours</option>
                                <option value='180'>3 hours</option>
                                <option value='240'>4 hours</option>
                                <option value='300'>5 hours</option>
                                <option value='1000'>No limit</option>
                            </select>
                        </div>
                    </div>
                    <div className='recipe-checkboxes'>
                        <div className='attribute-filters'>
                            {attributes.map((attribute, idx) => 
                                <div className='input-attributes-div' key={attribute.id}>
                                    <input
                                        id={idx}
                                        className='attribute'
                                        type='checkbox'
                                        checked={attributeFilters[idx]}
                                        onChange={updateTag}
                                        >
                                    </input>
                                    <label>{attribute.name}</label>
                                </div>
                            )}
                        </div>
                        <div className='type-filters'>
                            {types.map((type, idx) => 
                                    <div className='input-types-div' key={type.id}>
                                        <input
                                            id={idx}
                                            className='type'
                                            type='checkbox'
                                            checked={typeFilters[idx]}
                                            onChange={updateTag}
                                            >
                                        </input>
                                        <label>{type.name}</label>
                                    </div>
                            )}
                        </div>
                    </div>
                    <div className='include-ingredients'>
                        <h4>Include Ingredients:</h4>
                        <div className='included tag-div start'>
                            {ingredientFilters.map(ing => 
                                <div key={ing} id={ing} className='tag' onClick={removeIngredient}>
                                    {ing}
                                </div>
                            )}
                        </div>
                        {ingredientFilters.length ? <p>Click ingredient to remove</p> : <></>}
                        <div className='ingredient-input'>
                            <form onSubmit={handleIngredientSubmit}>
                                <input
                                    type='text'
                                    value={ingredient}
                                    onChange={updateIngredient}
                                    placeholder='Add ingredient'>
                                </input>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <div className='search-results recipe-cards'>
                {filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)}
            </div>
        </>
    )
}

export default Search;
