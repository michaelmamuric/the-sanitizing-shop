import * as actionTypes from './actions';

export const addToCart = (productId, qty) => {
    return {
        type: actionTypes.ADD_TO_CART,
        productId,
        qty
    }
}