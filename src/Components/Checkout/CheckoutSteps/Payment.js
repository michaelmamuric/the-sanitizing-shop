import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert'
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import * as actions from '../../../store/actions/index';
import logo from './visa-mc-logo.png';
import classes from '../Checkout.module.css';

const Payment = (props) => {
    // Destructure for easier referencing
    const { setActiveStep } = props;

    // Submit Handler
    const paymentSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <>
        { /* Just some information that no credit card payment willbe processed */}
        <Alert severity="info" className={classes.FormInfo}>
            This is a demo project. No actual credit card data
            will be stored, and no payment will be processed.
        </Alert>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.BillingGrid}>
              <img src={logo} className={classes.PaymentLogo} alt="Logo" />
            </Grid>
        </Grid>
        <form onSubmit={paymentSubmitHandler}>
            <Grid container spacing={1}>
            <Grid item xs={12} className={classes.PaymentGrid}>
                    <TextField className={classes.BillingInput} 
                        variant="outlined"
                        label="Credit Card Number"
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                <CreditCardIcon />
                            </InputAdornment>
                        }}
                    /> 
                </Grid>
                <Grid item xs={12} sm={7} className={classes.PaymentGrid}>
                    <TextField className={classes.BillingInput} 
                        variant="outlined"
                        label="Cardholder Name" 
                    />
                </Grid>
                <Grid item xs={12} sm={3} classes={classes.PaymentGrid}>
                    <TextField variant="outlined" className={classes.PaymentExpiryDate}
                    label="Expiry (MM)" />
                    &nbsp;
                    <TextField variant="outlined" className={classes.PaymentExpiryDate}
                    label="Expiry (YY)" />
                </Grid>
                <Grid item xs={12} sm={2} classes={classes.PaymentGrid}>
                    <TextField variant="outlined" className={classes.BillingInput}
                    label="Security Code" />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.BillingGrid}>
                    <Button variant="contained" color="primary" className={classes.PaymentBtns}
                        onClick={() => setActiveStep(0)} type="submit"
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