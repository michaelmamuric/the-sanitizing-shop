import * as actionTypes from '../actions/actions';

const initialState = {
    steps: ['Billing/Shipping Address Details', 'Credit Card Details', 'Done'],
    billingFields: {
        firstName: { value: '', isValid: false },
        lastName: { value: '', isValid: false },
        houseNumber: { value: '', isValid: false },
        street: { value: '', isValid: false },
        city: { value: '', isValid: false },
        province: { value: '', isValid: false },
        postalCode: { value: '', isValid: false }, 
    },
    activeStep: 0,
    purchased: false,
    paymentSuccess: false
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
        case actionTypes.SET_PURCHASED: {
            return {
                ...state,
                purchased: action.purchased
            }
        }
        case actionTypes.SET_PAYMENT_STATUS: {
            return {
                ...state,
                paymentSuccess: action.paymentSuccess
            }
        }
        case actionTypes.CLEAR_BILLING_FIELDS: {
            return {
                ...state,
                billingFields: {
                    firstName: { value: '', isValid: false },
                    lastName: { value: '', isValid: false },
                    houseNumber: { value: '', isValid: false },
                    street: { value: '', isValid: false },
                    city: { value: '', isValid: false },
                    province: { value: '', isValid: false },
                    postalCode: { value: '', isValid: false }                    
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;