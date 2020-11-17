import axios from 'axios';
import * as actionTypes from './actions';
import { authURL } from '../../secrets/secrets';

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
    return (dispatch) => {
        if(token.id === null)
            dispatch(logoutUser());
        else {
            const expirationDate = new Date(token.expiresIn);
            
            // If token, expiration date has been reached, auto log-out user
            if(expirationDate <= new Date())
                dispatch(logoutUser());
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
            const response = await axios.post(authURL, userCredentials);

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

            // Invalid Login
            dispatch(setError(error.response.data));
        }
    }
}