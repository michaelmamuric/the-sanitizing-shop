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
                    productId: action.productId,
                    qty: action.qty
                })
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;


