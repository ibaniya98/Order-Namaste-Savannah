import { notification } from 'antd';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATING = 'AUTHENTICATING';

const STORAGE_NAME = 'namaste-auth-token';

export const getAuthToken = () => {
    return localStorage.getItem(STORAGE_NAME);
}

const saveAuthToken = (token) => {
    localStorage.setItem(STORAGE_NAME, token);
}

const clearAuthToken = () => {
    localStorage.removeItem(STORAGE_NAME);
    sessionStorage.removeItem(STORAGE_NAME);
}

export const login = ({ email, password }) => dispatch => {
    dispatch({ type: AUTHENTICATING });

    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else if (res.status === 401) {
            throw 'The email or password you have entered is incorrect';
        }
        throw 'Could not login. Please try again later';
    }).then(json => {
        saveAuthToken(json.token);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: json
        });
        notification.success({
            message: "Welcome back",
            description: "You have succesfully logged in",
            placement: "bottomRight"
        })
    }).catch(err => {
        notification.error({
            message: "Login Failure",
            description: err,
        });
        clearAuthToken();
        dispatch({
            type: LOGIN_FAILURE
        })
    });
}

export const register = ({ email, password }) => dispatch => {
    dispatch({ type: AUTHENTICATING });

    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => {
        if (json.token) {
            saveAuthToken(json.token);
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: json
            });
            notification.success({
                message: "Welcome!",
                description: "Explore our tasty menu and order for pickup",
                placement: "bottomRight"
            });
        } else {
            throw json.error;
        }
    }).catch(err => {
        clearAuthToken();
        dispatch({
            type: REGISTRATION_FAILURE
        });
        notification.error({
            message: "Registration Failure",
            description: JSON.stringify(err),
        });
    });
}

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch({
        type: LOGOUT
    });
    notification.success({
        message: "Succesfully logged out",
        placement: "bottomRight"
    });
}

export const validateAuthToken = () => dispatch => {
    const token = getAuthToken();
    if (token) {
        dispatch({ type: AUTHENTICATING });

        fetch('/api/auth/validate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(json => {
                json.token = token;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: json
                });
            })
            .catch(err => {
                saveAuthToken('');
                dispatch({
                    type: LOGIN_FAILURE
                });
            });

    }
}