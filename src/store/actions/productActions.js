import * as actionTypes from './actions';
import axios from 'axios';
import { backendURL } from '../../secrets/secrets';

export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        error
    }
}

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    }
}

export const showDialog = () => {
    return {
        type: actionTypes.SHOW_DIALOG
    }   
}

export const hideDialog = () => {
    return {
        type: actionTypes.HIDE_DIALOG
    }   
}

export const initializeProducts = (productList) => {
    return {
        type: actionTypes.INITIALIZE_PRODUCTS,
        productList
    }
}

export const fetchProducts = () => {
    return async(dispatch) => {
        try {
            const response = await axios.get(backendURL);
            dispatch(initializeProducts(response.data));
        } catch(error) {
            dispatch(setError(error.message));
        }
    }
}