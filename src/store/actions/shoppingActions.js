import * as actionTypes from './actions';

export const addToCart = (product, qty) => {
    return {
        type: actionTypes.ADD_TO_CART,
        product,
        qty
    }
}

export const updateCart = (index, newQty) => {
    return {
        type: actionTypes.UPDATE_CART,
        index,
        newQty
    }
}

export const deleteFromCart = (index) => {
    return {
        type: actionTypes.DELETE_FROM_CART,
        index
    }
}

export const setHasCheckedOut = (hasCheckedOut) => {
    return {
        type: actionTypes.SET_HAS_CHECKED_OUT,
        hasCheckedOut
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
}