import * as actionTypes from '../actions/actions';

const initialState = {
    productList: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INITIALIZE_PRODUCTS: {
            return {
                ...state,
                productList: action.productList
            }
        }
        default:
            return state;
    }
}

export default reducer;

