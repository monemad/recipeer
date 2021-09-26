import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_RECIPES = 'recipes/LOAD_RECIPES';
const ADD_RECIPE = 'recipes/ADD_RECIPES';
const REMOVE_RECIPE = 'recipes/REMOVE_RECIPE';

const loadRecipes = data => ({
    type: LOAD_RECIPES,
    data
});

const addRecipe = recipe => ({
    type: ADD_RECIPE,
    recipe
})

const removeRecipe = recipeId => ({
    type: REMOVE_RECIPE,
    recipeId
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

export const deleteRecipe = recipeId => async (dispatch) => {

    const response = await fetch(`/api/recipes/${recipeId}/`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeRecipe(recipeId))
    }
}

export const createRecipeIngredient = data => async (dispatch) => {

    const response = await fetch(`/api/recipe-ingredients/`, {
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

    const response = await fetch(`/api/instructions/`, {
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

export const addAttribute = data => async (dispatch) => {

    const response = await fetch(`/api/recipes/${data.recipeId}/attributes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attribute_id: data.attributeId
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

export const addType = data => async (dispatch) => {

    const response = await fetch(`/api/recipes/${data.recipeId}/types/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type_id: data.typeId
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

export const createPicture = data => async (dispatch) => {

    const form = new FormData()
    form.append('img_file', data.imgFile)
    form.append('order', data.order)
    form.append('recipe_id', data.recipeId)
    form.append('user_id', data.userId)

    const response = await fetch(`/api/pictures/`, {
        method: 'POST',
        body: form
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

export const addFeedback = data => async (dispatch) => {

    const response = await fetch(`/api/feedback/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: data.content,
            recipe_id: data.recipeId,
            user_id: data.userId
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

export const editFeedback = data => async (dispatch) => {

    const response = await fetch(`/api/feedback/${data.feedbackId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: data.content
        })
    })

    if (response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
    }
}

export const deleteFeedback = feedbackId => async (dispatch) => {

    const response = await fetch(`/api/feedback/${feedbackId}/`, {
        method: 'DELETE'
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
        case REMOVE_RECIPE:
            delete stateCopy[action.recipeId];
            return stateCopy;
        default:
            return state;
    };
}
