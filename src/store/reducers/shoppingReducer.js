import * as actionTypes from '../actions/actions';

const initialState = {
    hasCheckedOut: false,
    cartItems: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART: {
            return {
                ...state,
                // use concat to immutably add data to array
                cartItems: state.cartItems.concat({    
                    product: action.product,
                    qty: action.qty
                })
            }
        }
        case actionTypes.UPDATE_CART: {
            return {
                ...state,
                cartItems: state.cartItems.map((item, index) => {
                    // Not the item to be updated, so return item as is
                    if(index !== action.index)
                        return item;
                    
                    // Item to be updated found
                    return {
                        product: Object.assign({}, item.product), // same as spread operator
                        qty: action.newQty
                    }; 
                })
            }
        }
        case actionTypes.DELETE_FROM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter((_, index) => index !== action.index)
            }
        }
        case actionTypes.SET_HAS_CHECKED_OUT: {
            return {
                ...state,
                hasCheckedOut: action.hasCheckedOut
            }
        }
        case actionTypes.CLEAR_CART: {
            return {
                ...state,
                cartItems: [] // set to an empty array
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;


