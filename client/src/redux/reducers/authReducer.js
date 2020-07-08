import {
    LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
    LOGOUT
} from '../actions/authAction';

const initialState = {
    authToken: localStorage.getItem('authToken'),
    isAuthenticated: false,
    currentUser: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTRATION_SUCCESS:
            const { token, user } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                authToken: token,
                currentUser: user
            }
        case LOGIN_FAILURE:
        case REGISTRATION_FAILURE:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authToken: '',
                currentUser: null
            }
        default:
            return { ...state };
    }
} 