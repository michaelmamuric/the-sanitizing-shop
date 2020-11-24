import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import * as actions from '../../../store/actions/index';
import logo from './visa-mc-logo.png';
import validator from 'validator';
import numeral from 'numeral';
import dayjs from 'dayjs';
import CheckoutDialog from '../CheckoutDialog/CheckoutDialog';
import classes from '../Checkout.module.css';

const Payment = (props) => {
    // Destructure for easier referencing
    const { setActiveStep } = props;

    // States
    // Decided to manage field values and validations here rather in Redux, since
    // we do not want to persist credit card values
    const [fieldValues, setFieldValues] = useState({
        cardNumber: {
            value: '4242424242424242',  // A valid dummy credit card number
            touched: false
        },
        cardholderName: {
            value: '',
            touched: false          
        },
        expiryMM: {
            value: '',
            touched: false       
        },
        expiryYY: {
            value: '',
            touched: false       
        },
        securityCode: {
            value: '',
            touched: false     
        }
    });
    const [fieldValidity, setFieldValdity] = useState({
        cardNumber: {
            isValid: true,             // Setting this to true since a valid value has been initally provided
            method: 'isCreditCard',    // Built-in from validator library
            errorMsg: 'Credit Card Number is invalid' 
        },
        cardholderName: {
            isValid: false,
            method: 'isRequired',      // Custom validation
            errorMsg: 'Cardholder Name is required'         
        },
        expiryMM: {
            isValid: false,
            method: '',                // Will be managed independently
            errorMsg: 'Invalid Month'     
        },
        expiryYY: {
            isValid: false,
            method: '',                // Will be managed independently
            errorMsg: 'Invalid Year'     
        },
        securityCode: {
            isValid: false,
            method: 'isNumeric',       // Built-in from validator
            errorMsg: 'Code is invalid'   
        }
    });
    const [displayDialog, setDisplayDialog] = useState(false);

    // Check expiry month and year validity
    // Managed separately upon clicking Finalize Pay due to complexities :(
    const checkExpiryValidity = () => {
        const selectedMonth = fieldValues.expiryMM.value;
        const selectedYear = fieldValues.expiryYY.value;

        let isValid = false;

        if(dayjs(`${selectedYear}-${selectedMonth}-01`).isAfter(dayjs())) {
            isValid = true;
        }

        setFieldValdity({
            ...fieldValidity,
            expiryMM: {
                ...fieldValidity.expiryMM,
                isValid
            },
            expiryYY: {
                ...fieldValidity.expiryYY,
                isValid
            }
        });
    }

    // Submit Handler
    const paymentSubmitHandler = (event) => {
        event.preventDefault();

        let invalidCount = 0;

        // Check for each field's validity
        for(let key in fieldValidity) {
            if(!fieldValidity[key].isValid)
                invalidCount++;
        }

        if(invalidCount === 0)
            setDisplayDialog(true);
    }

    // Input Changed Handler
    const inputChangedHandler = (field, newValue) => {
        // Validation method
        const method = fieldValidity[field].method;

        // Update field value
        setFieldValues({
            ...fieldValues,
            [field]: {
                touched: true,
                value: newValue
            }
        });

        // Field Validity
        let isValid = false;

        // Determine validation type
        // Due to the complexities of validating the expiry year and month simultaneously,
        // validation for the said fields will be managed when Finalize Payment is clicked
        switch(method) {
            // Directly from validator library
            case 'isCreditCard': {
                if(validator.isCreditCard(newValue)) {
                    isValid = true;
                }
                break;
            }
            // Custom validation with help from validator library
            case 'isRequired': {
                if(validator.trim(newValue) !== '')
                    isValid = true;
                break;
            }
            // Directly from validator library
            case 'isNumeric': {
                if(validator.isNumeric(newValue) && Number.isInteger(newValue)) {
                    isValid = true;
                }
                break;
            }
            default:
                break;
        }

        // Update validity
        setFieldValdity({
            ...fieldValidity,
            [field]: {
                ...fieldValidity[field],
                isValid
            }
        });
    }

    // Months (to be used for expiry month)
    let months = [];
    for(let i=1; i <= 12; i++) {
        months.push(i);
    }

    // Years (to be used for expiry years)
    let years = [];
    let currentYear = dayjs().format('YYYY');
    let tenYrsFromNow = dayjs().add(10, 'year').format('YYYY');
    for(let i = currentYear; i <= tenYrsFromNow; i++) {
        years.push(i);
    }

    // Unlike in the Billing component where all the input types' grids are equally sized, each input type
    // here in the Payment component have different grid sizes, so they are all managed manually
    return (
        <>
        { /* Just some information that no credit card payment will be processed */}
        <Alert severity="info" className={classes.FormInfo}>
            This is a demo project. No actual credit card data will be stored, and no payment will be processed. Please use the following for testing:
            <ul className={classes.List}>
                <li>Credit Card Number: 4242424242424242</li>
                <li>Expiry Date: Any date in the future</li>
                <li>Security Code: Any valid number</li>
            </ul>
        </Alert>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.BillingGrid}>
              <img src={logo} className={classes.PaymentLogo} alt="Logo" />
            </Grid>
        </Grid>
        <CheckoutDialog open={displayDialog} onClose={() => setDisplayDialog(false)} />
        <form onSubmit={paymentSubmitHandler}>
            <Grid container spacing={1}>
            <Grid item xs={12} className={classes.PaymentGrid}>
                    <TextField className={classes.BillingInput} 
                        variant="outlined"
                        value={fieldValues.cardNumber.value}
                        type="number"
                        error={
                            fieldValues.cardNumber.touched && !fieldValidity.cardNumber.isValid
                        }
                        helperText={
                            fieldValues.cardNumber.touched && !fieldValidity.cardNumber.isValid
                            ? fieldValidity.cardNumber.errorMsg : ' '
                        }
                        onChange={(event) => inputChangedHandler('cardNumber', event.target.value)}
                        label="Credit Card Number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><CreditCardIcon /></InputAdornment>
                        }}
                    /> 
                </Grid>
                <Grid item xs={12} sm={7} className={classes.PaymentGrid}>
                    <TextField className={classes.BillingInput} 
                        variant="outlined"
                        value={fieldValues.cardholderName.value}
                        error={
                            fieldValues.cardholderName.touched && !fieldValidity.cardholderName.isValid
                        }
                        helperText={
                            fieldValues.cardholderName.touched && !fieldValidity.cardholderName.isValid
                            ? fieldValidity.cardholderName.errorMsg : ' '
                        }
                        onChange={(event) => inputChangedHandler('cardholderName', event.target.value)}
                        label="Cardholder Name" 
                    />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.PaymentGrid}>
                    <FormControl variant="outlined" className={classes.BillingInput}
                        error={
                            fieldValues.expiryMM.touched && fieldValues.expiryYY.touched &&
                            !fieldValidity.expiryMM.isValid && !fieldValidity.expiryYY.isValid
                        }
                    >
                        <InputLabel>Expiry (MM)</InputLabel>                    
                        <Select native value={fieldValues.expiryMM.value} className={classes.PaymentSelect}
                            onClick={checkExpiryValidity} onFocusIn={checkExpiryValidity}                          
                            onChange={(event) => inputChangedHandler('expiryMM', event.target.value)}
                        >
                            <option value=""></option>
                            {
                                months.map((month) => {
                                    return ( 
                                        <option key={month} value={numeral(month).format('00')}>
                                            {numeral(month).format('00')}
                                        </option>
                                    ) 
                                })
                            }  
                        </Select>
                        <FormHelperText>
                            {
                                fieldValues.expiryMM.touched && fieldValues.expiryYY.touched &&
                                !fieldValidity.expiryMM.isValid && !fieldValidity.expiryYY.isValid 
                                ? fieldValidity.expiryMM.errorMsg : ' '                               
                            }
                        </FormHelperText>
                    </FormControl>
                    &nbsp;
                    <FormControl variant="outlined" className={classes.BillingInput}
                        error={
                            fieldValues.expiryMM.touched && fieldValues.expiryYY.touched &&
                            !fieldValidity.expiryMM.isValid && !fieldValidity.expiryYY.isValid
                        }>
                        <InputLabel>Expiry (YY)</InputLabel>
                        <Select native value={fieldValues.expiryYY.value} className={classes.PaymentSelect}
                            onClick={checkExpiryValidity} onFocusIn={checkExpiryValidity}
                            onChange={(event) => inputChangedHandler('expiryYY', event.target.value)}
                        >
                            <option value=""></option>
                            {
                                years.map((year) => {
                                    return <option key={year} value={year}>{year}</option> 
                                })
                            }  
                        </Select>
                        <FormHelperText>
                            {
                                fieldValues.expiryMM.touched && fieldValues.expiryYY.touched &&
                                !fieldValidity.expiryMM.isValid && !fieldValidity.expiryYY.isValid 
                                ? fieldValidity.expiryYY.errorMsg : ' '                               
                            }
                        </FormHelperText>
                    </FormControl>
                    
                </Grid>
                <Grid item xs={12} sm={2} className={classes.PaymentGrid}>
                    <TextField variant="outlined" className={classes.BillingInput}
                    value={fieldValues.securityCode.value}
                    type="number"
                    error={
                        fieldValues.securityCode.touched && !fieldValidity.securityCode.isValid
                    }
                    helperText= {
                        fieldValues.securityCode.touched && !fieldValidity.securityCode.isValid ?
                        fieldValidity.securityCode.errorMsg : ' '                               
                    }
                    onChange={(event) => inputChangedHandler('securityCode', event.target.value)}
                    label="Security Code" />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.BillingGrid}>
                    <Button variant="contained" color="primary" className={classes.PaymentBtns}
                        onClick={() => setActiveStep(0)}
                    >
                        &#8592;	Back to Billing Details
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.BillingGrid}>
                    <Button variant="contained" color="primary" type="submit" className={classes.PaymentBtns}>
                        Finalize Payment &#8594;
                    </Button>
                </Grid>
            </Grid>
        </form>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveStep: (step) => dispatch(actions.setActiveStep(step)),
    }
}

export default connect(null, mapDispatchToProps)(Payment);