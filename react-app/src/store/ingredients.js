import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_INGREDIENTS = 'ingredients/LOAD_INGREDIENTS';

const loadIngredients = data => ({
    type: LOAD_INGREDIENTS,
    data
});

export const getIngredients = () => async (dispatch) => {
    const response = await fetch('/api/ingredients/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadIngredients(data));
        return null;
    }
}

const initialState = {}

export default function reducer(state=initialState, action) {
    let stateCopy = clone(state)
    switch (action.type) {
        case LOAD_INGREDIENTS:
            action.data.ingredients.forEach(ingredient => {
                stateCopy[ingredient.id] = ingredient
            });
            return stateCopy;
        default:
            return state;
    }
}
