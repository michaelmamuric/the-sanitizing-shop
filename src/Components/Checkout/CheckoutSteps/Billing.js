import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import validator from 'validator';
import classes from '../Checkout.module.css';

const Billing = (props) => {
    // Destructure for easier referencing
    const { setActiveStep, billingFields, updateBillingField, setValidity } = props;

    // States
    // Decided to manage form parameters here instead of in the Redux reducer
    // Validity is still managed in the reducer in order to persist validity after page refresh
    // because redux-persist is being used
    const [formFields, setFormFields] = useState({
        firstName: {
            inputType: 'TextField', // inputType is the Material-UI component to be rendered
            label: 'First Name',
            validation: {
                method: 'isRequired',   // method is the validator method to be used
                params: null,
                errorMsg: 'First Name is Required'
            },
            touched: false
        },
        lastName: {
            inputType: 'TextField',
            label: 'Last Name',
            validation: {
                method: 'isRequired',
                params: null,
                errorMsg: 'Last Name is Required'
            },
            touched: false
        },
        houseNumber: {
            inputType: 'TextField',
            label: 'House/Apt Number',
            validation: {
                method: 'isRequired',
                params: null,
                errorMsg: 'House Number is Required'
            },
            touched: false
        },
        street: {
            inputType: 'TextField',
            label: 'Street',
            validation: {
                method: 'isRequired',
                params: null,
                errorMsg: 'Street is Required'
            },
            touched: false
        },
        city: {
            inputType: 'TextField',
            label: 'City',
            validation: {
                method: 'isRequired',
                params: null,
                errorMsg: 'City is Required'
            },
            touched: false
        },
        province: {
            inputType: 'Select',
            label: 'Province/Territory',
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
                { key: 'PE', value: 'Prince Edward Island' },
                { key: 'QC', value: 'Quebec' },
                { key: 'SK', value: 'Saskatchewan' },
                { key: 'YT', value: 'Yukon' }                    
            ],
            validation: {
                method: 'isRequired',
                params: null,
                errorMsg: 'Province is Required'
            },
            touched: false
        },
        postalCode: {
            inputType: 'TextField',
            label: 'Postal Code',
            validation: {
                method: 'isPostalCode',
                params: 'CA',
                errorMsg: 'Postal Code is invalid'
            },
            touched: false
        },
    });
    const [formValid, setFormValid] = useState(true);

    // Put checkout fields in an array
    const fields = [];
    for(let key in formFields) {
        fields.push({
            name: key,
            inputType: formFields[key].inputType,
            label:  formFields[key].label,
            options: formFields[key].options !== undefined ? formFields[key].options : null
        });
    }

    // Implement form validation here
    const submitFormHandler = (event) => {
        // Prevent page from being refreshed
        event.preventDefault();

        // Validity Count
        let validCount = 0;

        // Check validity value of each field from Redux
        for(let key in formFields) {
            if(billingFields[key].isValid)
                validCount++;
        }

        // If all fields are valid
        if(validCount === fields.length) {
            setFormValid(true);     // Validate form
            setActiveStep(1);       // Set to next step - Credit Card Payment
        }
        else {
            setFormValid(false);
        }
    }

    const inputChangedHandler = (field, value) => {
        // Trim value
        const trimmedValue = validator.trim(value);

        // Update field to be "touched"
        setFormFields({
            ...formFields,
            [field]: {
                ...formFields[field],
                touched: true
            }
        });

        // Update value
        updateBillingField(field, value);

        // Variables
        const method = formFields[field].validation.method;
        const params = formFields[field].validation.params;
        let validity;

        // Update field validity
        if(method === 'isRequired') {
            validity = trimmedValue !== '';
        }
        else {
            if(params === null) {
                // Bracket notation used here (NOT an array reference)
                // Same as validator.[method].(trimmedValue)
                validity = validator[method](trimmedValue); 
            }
            else {
                validity = validator[method](trimmedValue, params);              
            }
        }

        // Invoke setValidity method
        setValidity(field, validity);
    }

    return (
        <>
        {
            !formValid ? 
            <>
                <Alert severity="error" className={classes.FormError}>
                    One or more fields have errors. Please fill in all the fields, 
                    and make sure to follow the correct format.
                </Alert>
                <br />
            </> : null
        }
        <form onSubmit={submitFormHandler}>
        <Grid container spacing={1}>
        {
            fields.map((input, index) => {
                const value = billingFields[input.name].value;      // Value is managed in Redux
                const isValid = billingFields[input.name].isValid;  // Validity is also Redux-managed
                const validationMethod = formFields[input.name].validation.method;
                const touched = formFields[input.name].touched;
                const errorMsg = formFields[input.name].validation.errorMsg;

                switch(input.inputType) {
                    case 'TextField': {
                        return (
                            <Grid key={index} item xs={12} sm={4} className={classes.BillingGrid}>
                                <TextField name={input.name} label={input.label} 
                                variant="outlined" className={classes.BillingInput} 
                                value={value}
                                error={
                                    validationMethod === 'isRequired' ?
                                    validator.trim(value) === '' && !isValid && touched :
                                    !isValid && touched
                                }
                                helperText={
                                    validationMethod === 'isRequired' 
                                    ?
                                        validator.trim(value) === '' && !isValid && touched ? errorMsg : ' '
                                    :
                                    !isValid && touched ? errorMsg : ' '                                    
                                }
                                onChange={(event) => inputChangedHandler(input.name, event.target.value)}
                                />
                            </Grid>                         
                        )
                    }
                    case 'Select': {
                        return (
                            <Grid key={index} item xs={12} sm={4} className={classes.BillingGrid}>
                                <FormControl variant="outlined" className={classes.BillingInput}
                                    error={!isValid && value === '' && touched}>
                                <InputLabel>{input.label}</InputLabel>
                                <Select name={input.name} native value={value}
                                    onChange={(event) => inputChangedHandler(input.name, event.target.value)}
                                >
                                    <option value=""></option>
                                    {
                                        input.options.map((option) => (
                                            <option key={option.key} value={option.key}>
                                                {option.value}
                                            </option>
                                        ))
                                    }    
                                </Select>
                                <FormHelperText>{!isValid && value === '' && touched ? errorMsg : ' '}</FormHelperText>
                                </FormControl>
                            </Grid>                            
                        )
                    }
                    default:
                        return null;
                }
            })
        }
            <Grid item xs={12} className={classes.BillingGrid}>
                <Button variant="contained" type="submit" color="primary" className={classes.PaymentBtns}>
                    Proceed to Payment &#8594;
                </Button>
            </Grid>
        </Grid>
        </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        billingFields: state.checkout.billingFields
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveStep: (step) => dispatch(actions.setActiveStep(step)),
        updateBillingField: (field, value) => dispatch(actions.updateBillingField(field, value)),
        setValidity: (field, validity) => dispatch(actions.setValidity(field, validity))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);