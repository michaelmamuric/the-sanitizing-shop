import * as actionTypes from '../actions/actions';

const initialState = {
    steps: ['Billing and Address Details', 'Credit Card Details'],
    billingFields: {
        firstName: {
            inputType: 'TextField', // inputType is the desired Material-UI components to be rendered
            label: 'First Name',
            value: ''
        },
        lastName: {
            inputType: 'TextField',
            label: 'Last Name',
            value: ''
        },
        houseNumber: {
            inputType: 'TextField',
            label: 'House/Apt Number',
            value: ''
        },
        streetNumber: {
            inputType: 'TextField',
            label: 'Street Number',
            value: ''
        },
        city: {
            inputType: 'TextField',
            label: 'City',
            value: ''
        },
        province: {
            inputType: 'Select',
            label: 'Province/Territory',
            value: '',
            options: [
                { key: 'AB', value: 'Alberta' },
                { key: 'BC', value: 'British Columbia' },
                { key: 'MB', value: 'Manitoba' },
                { key: 'NB', value: 'New Brunswick' },
                { key: 'NL', value: 'Newfoundland and Labrador' },
                { key: 'NS', value: 'Nova Scotia' },
                { key: 'NT', value: 'Northwest Territories' },
                { key: 'NU', value: 'Nunavut' },
                { key: 'ON', value: 'Ontario' },
                { key: 'QC', value: 'Quebec' },
                { key: 'SK', value: 'Saskatchewan' },
                { key: 'YT', value: 'Yukon' }                    
            ]
        },
        postalCode: {
            inputType: 'TextField',
            label: 'Postal Code',
            value: ''
        } 
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
                        ...state.billingFields.[action.field],
                        value: action.value
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