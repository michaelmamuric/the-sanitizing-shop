import * as actionTypes from '../actions/actions';

const initialState = {
    token: {
        id: null,
        expiresIn: null
    },
    invalidLogin: false,
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
        case actionTypes.SET_INVALID_LOGIN: {
            return {
                ...state,
                invalidLogin: action.invalidLogin
            }
        }
        case actionTypes.SET_TOKEN: {
            return {
                ...state,
                token: {
                    ...state.token,
                    id: action.tokenId,
                    expiresIn: action.expiresIn
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;