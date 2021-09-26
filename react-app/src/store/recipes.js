import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_RECIPES = 'recipes/LOAD_RECIPES';
const ADD_RECIPE = 'recipes/ADD_RECIPES';

const loadRecipes = data => ({
    type: LOAD_RECIPES,
    data
});

const addRecipe = recipe => ({
    type: ADD_RECIPE,
    recipe
})

export const getRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes/');

    if (response.ok){
        const data = await response.json();
        dispatch(loadRecipes(data));
        return null;
    }
}

export const createRecipe = data => async (dispatch) => {

    const response = await fetch('/api/recipes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data.title,
            difficulty: data.difficulty,
            cook_time: data.cookTime,
            user_id: data.userId
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
        return recipe.id
    }
}

export const createRecipeIngredient = data => async (dispatch) => {

    const response = await fetch('/api/recipes/ingredients/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: data.order,
            quantity: data.quantity,
            ingredient_id: data.ingredientId,
            unit_id: data.unitId,
            recipe_id: data.recipeId
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

export const createInstruction = data => async (dispatch) => {

    const response = await fetch('/api/recipes/instructions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: data.order,
            step: data.step,
            recipe_id: data.recipeId
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

const initialState = {};

export default function reducer(state=initialState, action) {
    let stateCopy = clone(state);
    switch (action.type) {
        case LOAD_RECIPES:
            action.data.recipes.forEach(recipe => {
                stateCopy[recipe.id] = recipe;
            });
            return stateCopy;
        case ADD_RECIPE:
            stateCopy[action.recipe.id] = action.recipe;
            return stateCopy;
        default:
            return state;
    };
}
