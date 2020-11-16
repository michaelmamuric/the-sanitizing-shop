import * as actionTypes from '../actions/actions';

const initialState = {
    isAuthenticated: false,
    isLoading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;