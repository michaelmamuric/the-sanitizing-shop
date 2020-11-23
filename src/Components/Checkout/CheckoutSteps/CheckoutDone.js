import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';
import classes from '../Checkout.module.css';
import * as actions from '../../../store/actions/index';

const CheckoutDone = (props) => {

    // Destructure for easier referencing
    const {resetActiveStep, resetCheckout, resetPaymentStatus, resetPurchased, paymentSuccess} = props;

    // Reset Active Step and Checkout when component unmounts
    useEffect(() => {
        return () => {
            resetActiveStep();
            resetCheckout();
            resetPaymentStatus();
            resetPurchased();
        }
    }, [resetActiveStep, resetCheckout, resetPaymentStatus, resetPurchased]);

    return (
        <Grid container>
            <Grid item xs={12} className={classes.FormInfo}>
                {
                    paymentSuccess ?
                    <ThumbUpIcon fontSize="large" className={classes.SuccessIcon} /> :
                    <ErrorIcon fontSize="large" className={classes.ErrorIcon} />
                }
            </Grid>
            <Grid item xs={12} className={classes.CheckoutDoneMsg}>
                <Typography>
                {
                    paymentSuccess ?
                    'Thank you for purchase. We hope to see you again!' :
                    'Sorry, your purchase was not successful. Please contact the website owner.'
                }
                </Typography>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        paymentSuccess: state.checkout.paymentSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetActiveStep: () => dispatch(actions.setActiveStep(0)),
        resetCheckout: () => dispatch(actions.setHasCheckedOut(false)),
        resetPaymentStatus: () => dispatch(actions.setPaymentStatus(false)),
        resetPurchased: () => dispatch(actions.setPurchased(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDone);