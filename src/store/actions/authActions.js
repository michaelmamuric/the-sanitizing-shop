import axios from 'axios';
import * as actionTypes from './actions';
import { authURL } from '../../secrets/secrets';

export const setLoading = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING,
        isLoading
    }
}

export const setInvalidLogin = (invalidLogin) => {
    return {
        type: actionTypes.SET_INVALID_LOGIN,
        invalidLogin
    }
}

export const setToken = (tokenId, expiresIn) => {
    return {
        type: actionTypes.SET_TOKEN,
        tokenId,
        expiresIn
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

            // Validate Login
            dispatch(setInvalidLogin(false));

            // Compute Token Expiration
            const tokenExpiration = new Date(new Date().getTime() + response.data.expiresIn * 1000)

            // Set Token values
            dispatch(setToken(response.data.idToken, tokenExpiration));
        }
        catch(error) {
            // Set Loading to false nonetheless
            dispatch(setLoading(false));

            // Invalidate Login
            dispatch(setInvalidLogin(true));
        }
    }
}