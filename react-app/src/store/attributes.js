import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_ATTRIBUTES = 'attributes/LOAD_ATTRIBUTES';

const loadAttributes = data => ({
    type: LOAD_ATTRIBUTES,
    data
});

export const getAttributes = () => async (dispatch) => {
    const response = await fetch('/api/attributes/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAttributes(data));
        return null;
    }
}

const initialState = {}

export default function reducer(state=initialState, action) {
    let stateCopy = clone(state)
    switch (action.type) {
        case LOAD_ATTRIBUTES:
            action.data.attributes.forEach(attribute => {
                stateCopy[attribute.id] = attribute
            });
            return stateCopy;
        default:
            return state;
    }
}
