import rfdc from 'rfdc';
const clone = rfdc();

const LOAD_UNITS = 'units/LOAD_UNITS';

const loadUnits = data => ({
    type: LOAD_UNITS,
    data
});

export const getUnits = () => async (dispatch) => {
    const response = await fetch('/api/units/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadUnits(data));
        return null;
    }
}

const initialState = {}

export default function reducer(state=initialState, action) {
    let stateCopy = clone(state)
    switch (action.type) {
        case LOAD_UNITS:
            action.data.units.forEach(unit => {
                stateCopy[unit.id] = unit
            });
            return stateCopy;
        default:
            return state;
    }
}
