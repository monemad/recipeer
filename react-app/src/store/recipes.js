import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_RECIPES = 'recipes/LOAD_RECIPES';

const loadRecipes = data => ({
    type: LOAD_RECIPES,
    data
});

export const getRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes/');

    if (response.ok){
        const data = await response.json();
        dispatch(loadRecipes(data));
        return null;
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
        default:
            return state;
    };
}
