import * as actionTypes from './actions';
import axios from 'axios';
import { backendURL } from '../../secrets/secrets';

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
            console.log(error.message)
        }
    }
}