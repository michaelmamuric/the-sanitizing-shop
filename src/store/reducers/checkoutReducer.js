import * as actionTypes from '../actions/actions';

const initialState = {
    steps: ['Billing and Address Details', 'Credit Card Details'],
    billingFields: {
        firstName: { value: '', isValid: false },
        lastName: { value: '', isValid: false },
        houseNumber: { value: '', isValid: false },
        street: { value: '', isValid: false },
        city: { value: '', isValid: false },
        province: { value: '', isValid: false },
        postalCode: { value: '', isValid: false }, 
    },
    activeStep: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_ACTIVE_STEP: {
            return {
                ...state,
                activeStep: action.activeStep
            }
        }
        case actionTypes.UPDATE_BILLING_FIELD: {
            return {
                ...state,
                billingFields: {
                    ...state.billingFields,
                    [action.field]: {
                        ...state.billingFields[action.field],
                        value: action.value
                    }
                }
            }
        }
        case actionTypes.SET_VALIDITY: {
            return {
                ...state,
                billingFields: {
                    ...state.billingFields,
                    [action.field]: {
                        ...state.billingFields[action.field],
                        isValid: action.validity
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;