import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';
import classes from '../Checkout.module.css';
import * as actions from '../../../store/actions/index';

// Used a class based component here for componentWillUnmount
class CheckoutDone extends Component {

    // Reset Active Step and Checkout when component unmounts
    componentWillUnmount() {
        this.props.resetActiveStep();
        this.props.resetCheckout();
        this.props.resetPaymentStatus();
        this.props.resetPurchased();
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12} className={classes.FormInfo}>
                    {
                        this.props.paymentSuccess ?
                        <ThumbUpIcon fontSize="large" className={classes.SuccessIcon} /> :
                        <ErrorIcon fontSize="large" className={classes.ErrorIcon} />
                    }
                </Grid>
                <Grid item xs={12} className={classes.FormInfo}>
                    <Typography>
                    {
                        this.props.paymentSuccess ?
                        'Thank you for purchase. We hope to see you again!' :
                        'Sorry, your purchase was not successful. Please contact the website owner.'
                    }
                    </Typography>
                </Grid>
            </Grid>
        );
    }
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