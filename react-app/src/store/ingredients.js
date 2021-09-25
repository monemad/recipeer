import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_INGREDIENTS = 'ingredients/LOAD_INGREDIENTS';
const ADD_INGREDIENT = 'ingredients/ADD_INGREDIENT'

const loadIngredients = data => ({
    type: LOAD_INGREDIENTS,
    data
});

const addIngredient = ingredient => ({
    type: ADD_INGREDIENT,
    ingredient
})

export const getIngredients = () => async (dispatch) => {
    const response = await fetch('/api/ingredients/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadIngredients(data));
        return null;
    }
}

export const createIngredient = ingredient => async (dispatch) => {
    const response = await fetch('/api/ingredients/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: ingredient
        })
    })

    if (response.ok) {
        const ingredient = await response.json()
        dispatch(addIngredient(ingredient))
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
        case ADD_INGREDIENT:
            stateCopy[action.ingredient.id] = action.ingredient
            return stateCopy
        default:
            return state;
    }
}
