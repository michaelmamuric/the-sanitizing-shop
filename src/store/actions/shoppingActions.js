import * as actionTypes from './actions';

export const addToCart = (product, qty) => {
    return {
        type: actionTypes.ADD_TO_CART,
        product,
        qty
    }
}