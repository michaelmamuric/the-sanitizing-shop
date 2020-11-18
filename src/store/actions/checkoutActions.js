import * as actionTypes from './actions';

export const setActiveStep = (activeStep) => {
    return {
        type: actionTypes.SET_ACTIVE_STEP,
        activeStep
    }
}

export const updateBillingField = (field, value) => {
    return {
        type: actionTypes.UPDATE_BILLING_FIELD,
        field,
        value
    }
}
