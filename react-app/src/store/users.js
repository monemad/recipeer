import rfdc from 'rfdc';
const clone = rfdc()

const LOAD_USERS = 'users/LOAD_USERS';

const loadUsers = (data) => ({
    type: LOAD_USERS,
    data
});

export const getUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/');

    if (response.ok){
        const data = await response.json();
        dispatch(loadUsers(data));
        return null;
    }
}

const initialState = {};

export default function reducer(state=initialState, action) {
    let stateCopy = clone(state);
    switch (action.type) {
        case LOAD_USERS:
            action.data.users.forEach(user => {
                stateCopy[user.id] = user;
            });
            return stateCopy;
        default:
            return state;
    };
}
