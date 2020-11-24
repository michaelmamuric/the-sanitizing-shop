import axios from 'axios';
import * as actionTypes from './actions';

export const setLoading = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING,
        isLoading
    }
}

export const setError = (error) => {
    return {
        type: actionTypes.SET_LOGIN_ERROR,
        error
    }
}

export const setToken = (tokenId, expiresIn, localId) => {
    return {
        type: actionTypes.SET_TOKEN,
        tokenId,
        expiresIn,
        localId
    }
}

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const setTokenTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logoutUser());
        }, expiresIn * 1000); // must be multiplied by 1000 since Firebase returns expiresIn in seconds
    }
}

export const checkAuthState = (token) => {
    return async(dispatch) => {
        if(token.id === null)
            dispatch(logoutUser());
        else {
            try {
                // Send request to Firebase to verify token validity
                const response = await axios.post(process.env.REACT_APP_GET_USER_DATA_URL, { idToken: token.id});

                // localId in token matches what is stored in Firebase's server
                // Response data format: https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
                if(response.data.users[0].localId === token.localId) {                
                    const expirationDate = new Date(token.expiresIn);
                    
                    // If token, expiration date has been reached, auto log-out user
                    if(expirationDate <= new Date())
                        dispatch(logoutUser());
                }
                else {
                    dispatch(logoutUser());
                }
            } catch(error) {
                dispatch(logoutUser());
            }
        }
    }
}

export const loginUser = (email, password) => {
    return async(dispatch) => {
        try {
            // Set Loading to true
            dispatch(setLoading(true));

            // User Credentials Object
            const userCredentials = {
                email,
                password,
                returnSecureToken: true // Required for Firebase
            }

            // Send request to Firebase
            const response = await axios.post(process.env.REACT_APP_AUTH_URL, userCredentials);

            // Set Loading to false once response is obtained
            dispatch(setLoading(false));

            // Compute Token Expiration
            const tokenExpiration = new Date(new Date().getTime() + response.data.expiresIn * 1000)

            // Set Token values
            dispatch(setToken(response.data.idToken, tokenExpiration, response.data.localId));

            // Set Token timeout
            dispatch(setTokenTimeout(response.data.expiresIn));

            dispatch(setError(null));
        }
        catch(error) {
            // Set Loading to false nonetheless
            dispatch(setLoading(false));

            // Error Message obtained from Firebase backend
            const errorMsg = error.response.data.error.message;
            let displayMsg = '';

            switch(errorMsg) {
                case 'INVALID_EMAIL': case 'INVALID_PASSWORD' : {
                    displayMsg = 'Invalid e-mail and password combination.';
                    break;
                }
                case 'USER_DISABLED': {
                    displayMsg = 'Your account has been disabled. Please contact the website owner.';
                    break;
                }
                // Could be because user has attempted to login too many times
                default: {
                    displayMsg = 'A technical error has occurred. You may had too many attempts. Please try again later.';
                    break;
                }                
            }

            // Invalid Login
            dispatch(setError(displayMsg));
        }
    }
}