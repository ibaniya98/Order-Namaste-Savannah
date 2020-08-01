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

export const login = ({ email, password }) => dispatch => {
    dispatch({ type: AUTHENTICATING });

    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => {
            saveAuthToken(json.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: json
            });
        })
        .catch(err => {
            saveAuthToken('');
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
    }).then(res => res.json())
        .then(json => {
            saveAuthToken(json.token);
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: json
            })
        })
        .catch(err => {
            saveAuthToken('');
            dispatch({
                type: REGISTRATION_FAILURE
            })
        });
}

export const logout = () => dispatch => {
    saveAuthToken('');
    dispatch({
        type: LOGOUT
    })
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