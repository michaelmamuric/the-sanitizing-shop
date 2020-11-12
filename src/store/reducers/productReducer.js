import * as actionTypes from '../actions/actions';

const initialState = {
    productList: [],
    error: null,
    isDialogDisplayed: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INITIALIZE_PRODUCTS: {
            return {
                ...state,
                productList: state.productList.concat(action.productList)
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
        default:
            return state;
    }
}

export default reducer;

