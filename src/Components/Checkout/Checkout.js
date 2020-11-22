import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Billing from './CheckoutSteps/Billing';
import Payment from './CheckoutSteps/Payment';
import CheckoutDone from './CheckoutSteps/CheckoutDone';
import classes from './Checkout.module.css'
import Redirector from '../Redirector/Redirector';

const Checkout = (props) => {
    // Destructure for easier referencing
    const { steps, activeStep, isAuthenticated, hasCheckedOut } = props;

    let component = null;

    // Redirect user to homepage if not authenticated
    if(!isAuthenticated) {
        component = <Redirector location="/" />;
    }
    else {
        // If user is authenticated, but has not checked out yet, redirect user
        if(!hasCheckedOut) {
            component = <Redirector location="/cart" />;
        }
        else {
            let currentStep = null;

            switch(activeStep) {
                case 0: {
                    currentStep = <Billing />;
                    break;
                }
                case 1: {
                    currentStep = <Payment />;
                    break;
                }
                case 2: {
                    currentStep = <CheckoutDone />;
                    break;
                }
                default: break;
            }

            component = (
                <>
                <div className={classes.CheckoutDiv}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                    {
                        steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))
                    }
                    </Stepper>
                    <Card className={classes.CheckoutCard}>
                        {currentStep}
                    </Card>
                </div>
                </>
            );
        }
    }

    return component;
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token.id !== null,
        hasCheckedOut: state.shopping.hasCheckedOut,
        steps: state.checkout.steps,
        activeStep: state.checkout.activeStep
    }
}

export default connect(mapStateToProps, null)(Checkout);