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

export const setValidity = (field, validity) => {
    return {
        type: actionTypes.SET_VALIDITY,
        field,
        validity
    }
}

export const setPurchased = (purchased) => {
    return {
        type: actionTypes.SET_PURCHASED,
        purchased
    }
}

export const setPaymentStatus = (paymentSuccess) => {
    return {
        type: actionTypes.SET_PAYMENT_STATUS,
        paymentSuccess
    }
}

export const clearBillingFields = () => {
    return {
        type: actionTypes.CLEAR_BILLING_FIELDS
    }
}
