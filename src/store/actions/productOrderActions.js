import * as actionTypes from './actions';
import axios from 'axios';

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

export const showSnackbar = () => {
    return {
        type: actionTypes.SHOW_SNACKBAR
    }
}

export const hideSnackbar = () => {
    return {
        type: actionTypes.HIDE_SNACKBAR
    }
}

export const initializeProducts = (productList) => {
    return {
        type: actionTypes.INITIALIZE_PRODUCTS,
        productList
    }
}

export const initializeOrders = (orderList) => {
    return {
        type: actionTypes.INITIALIZE_ORDERS,
        orderList
    }
}

export const setLoadingProducts = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING_PRODUCTS,
        isLoading
    }
}

export const fetchProducts = () => {
    return async(dispatch) => {
        try {
            // Set Loading to true
            dispatch(setLoadingProducts(true));
            
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL);
            
            // Set Loading to false once response is obtained
            dispatch(setLoadingProducts(false));
            
            // Initialize products
            dispatch(initializeProducts(response.data));
        } catch(error) {
            // Set Loading to false nonetheless
            dispatch(setLoadingProducts(false));
            dispatch(setError(error.message));
        }
    }
}

export const fetchOrders = (userId) => {
    return async(dispatch) => {
        try {
            // Set Loading to true
            dispatch(setLoadingProducts(true));

            const response = await axios.get(process.env.REACT_APP_GET_ORDERS_BY_USER_URL + userId);
    
            // Set Loading to false once response is obtained
            dispatch(setLoadingProducts(false));
            
            // Initialize products
            dispatch(initializeOrders(response.data));
        } catch(error) {
            // Set Loading to false nonetheless
            dispatch(setLoadingProducts(false));
            // Set Loading to false nonetheless
            dispatch(setError(error.message));
        }
    }
}