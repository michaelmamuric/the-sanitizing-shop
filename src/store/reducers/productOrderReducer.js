import * as actionTypes from '../actions/actions';

const initialState = {
    productList: [],
    orderList: [],
    error: null,
    isDialogDisplayed: false,
    isSnackbarDisplayed: false,
    isLoading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INITIALIZE_PRODUCTS: {
            return {
                ...state,
                productList: action.productList
            }
        }
        case actionTypes.INITIALIZE_ORDERS: {
            return {
                ...state,
                orderList: action.orderList
            }
        }
        case actionTypes.SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        case actionTypes.SHOW_DIALOG: {
            return {
                ...state,
                isDialogDisplayed: true
            }
        }
        case actionTypes.HIDE_DIALOG: {
            return {
                ...state,
                isDialogDisplayed: false
            }
        }
        case actionTypes.SHOW_SNACKBAR: {
            return {
                ...state,
                isSnackbarDisplayed: true
            }
        }
        case actionTypes.HIDE_SNACKBAR: {
            return {
                ...state,
                isSnackbarDisplayed: false
            }
        }
        case actionTypes.SET_LOADING_PRODUCTS: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state;
    }
}

export default reducer;

