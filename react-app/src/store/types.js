import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_TYPES = 'types/LOAD_TYPES';

const loadTypes = data => ({
    type: LOAD_TYPES,
    data
});

export const getTypes = () => async (dispatch) => {
    const response = await fetch('/api/types/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadTypes(data));
        return null;
    }
}

const initialState = {}

export default function reducer(state=initialState, action) {
    let stateCopy = clone(state)
    switch (action.type) {
        case LOAD_TYPES:
            action.data.types.forEach(type => {
                stateCopy[type.id] = type
            });
            return stateCopy;
        default:
            return state;
    }
}
