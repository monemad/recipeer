import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeComponents/RecipeCard';

const Search = () => {
    const recipes = Object.values(useSelector(state => state.recipes));
    const attributes = Object.values(useSelector(state => state.attributes));
    const types = Object.values(useSelector(state => state.types));

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([...recipes]);
    const [showFilters, setShowFilters] = useState(true);
    const [attributeFilters, setAttributeFilters] = useState(Array(attributes.length).fill(false));
    const [typeFilters, setTypeFilters] = useState(Array(types.length).fill(false));


    const findIntersection = (arr1, arr2, arr3) => {
        const int1 = arr1.filter(ele => arr2.includes(ele))
        const int2 = int1.filter(ele => arr3.includes(ele))
        return int2;
    }

    useEffect(() => {
        let searchFiltered = [...recipes];
        let attributeFiltered = [...recipes];
        let typeFiltered = [...recipes];

        if (!searchQuery.length)
            searchFiltered = [...recipes];
        else {
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
        
        setFilteredRecipes(findIntersection(searchFiltered, attributeFiltered, typeFiltered));

    }, [searchQuery, attributeFilters, typeFilters])

    const updateSearchQuery = e => {
        setSearchQuery(e.target.value);
    }

    const toggleFilterDropdown = _e => {
        setShowFilters(!showFilters);
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
        console.log(attributeFilters)
        console.log(typeFilters)
    }

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
            <button onClick={toggleFilterDropdown}>
                { showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            { showFilters && 
                <div className='filters-div'>
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
                </div>
            }
            <div className='search-results recipe-cards'>
                {filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)}
            </div>
        </>
    )
}

export default Search;
