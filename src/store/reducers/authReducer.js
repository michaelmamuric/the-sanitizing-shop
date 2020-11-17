import * as actionTypes from '../actions/actions';

const initialState = {
    token: {
        id: null,
        expiresIn: null,
        localId: null
    },
    error: null,
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
        case actionTypes.SET_LOGIN_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.SET_TOKEN: {
            return {
                ...state,
                token: {
                    ...state.token,
                    id: action.tokenId,
                    expiresIn: action.expiresIn,
                    localId: action.localId
                }
            }
        }
        case actionTypes.LOGOUT_USER: {
            return {
                ...state,
                token: {
                    ...state.token,
                    id: null,
                    expiresIn: null,
                    localId: null
                }            
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;