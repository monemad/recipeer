const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
    
        dispatch(setUser(data));
    }
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};

export const demo = () => async (dispatch) => {
    const response = await fetch('/api/auth/demo');

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    }
};


export const signUp = (firstName, lastName, username, email, password, imgFile) => async (dispatch) => {

	const form = new FormData()
    form.append("first_name", firstName)
    form.append("last_name", lastName)
    form.append("username", username)
    form.append("email", email)
    form.append("password", password)
    form.append("img_file", imgFile)

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: form,
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editUser = (firstName, lastName, username, password, imgFile, userId) => async (dispatch) => {

	const form = new FormData()
    form.append("user_id", userId)
    form.append("first_name", firstName)
    form.append("last_name", lastName)
    form.append("username", username)
    form.append("password", password)
    form.append("img_file", imgFile)

    const response = await fetch('/api/auth/edit', {
        method: 'PUT',
        body: form
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const createUserIngredient = (data) => async (dispatch) => {

    const response = await fetch('/api/user-ingredients/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: data.order,
            multiplier: data.multiplier,
            recipe_ingredient_id: data.recipeIngredientId,
            user_id: data.userId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    }
}

export const updateUserIngredient = (data) => async (dispatch) => {

    const response = await fetch(`/api/user-ingredients/${data.userIngredientId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            multiplier: data.multiplier
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    }
}

export const deleteUserIngredient = (userIngredientId) => async (dispatch) => {

    const response = await fetch(`/api/user-ingredients/${userIngredientId}/`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null }
        default:
            return state;
    }
}
