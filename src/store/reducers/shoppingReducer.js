import * as actionTypes from '../actions/actions';

const initialState = {
    signedInUserEmail: null,
    hasCheckedOut: false,
    cartItems: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART: {
            return {
                ...state,
                cartItems: state.cartItems.concat({
                    product: action.product,
                    qty: action.qty
                })
            }
        }
        case actionTypes.DELETE_FROM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter((_, index) => index !== action.index)
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;


