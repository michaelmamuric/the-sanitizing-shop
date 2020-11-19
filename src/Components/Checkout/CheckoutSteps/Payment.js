import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as actions from '../../../store/actions/index'
import classes from '../Checkout.module.css';

const Payment = (props) => {
    // Destructure for easier referencing
    const { setActiveStep } = props;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.BillingGrid}>
                <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                    &#8592;	Back to Billing Details
                </Button>
                &nbsp;
                <Button variant="contained" color="primary">Finalize Payment</Button>
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveStep: (step) => dispatch(actions.setActiveStep(step)),
    }
}

export default connect(null, mapDispatchToProps)(Payment);