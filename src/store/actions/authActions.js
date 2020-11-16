import axios from 'axios';
import * as actionTypes from './actions';
import { authURL } from '../../secrets/secrets';

export const setLoading = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING,
        isLoading
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

            console.log(response);
        }
        catch(error) {
            console.log(error.response);

            // Set Loading to false nonetheless
            dispatch(setLoading(false));
        }
    }
}