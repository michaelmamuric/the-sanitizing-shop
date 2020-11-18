import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Billing from './CheckoutSteps/Billing';
import classes from './Checkout.module.css'

const Checkout = (props) => {
    // Destructure for easier referencing
    const { steps, activeStep } = props;

    return (
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
            {
                activeStep === 0
                ?
                <Billing />
                :
                <div>
                    {/* Put Payment component here (to be implemented)  */}
                    Next Step
                </div>
            }
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        steps: state.checkout.steps,
        activeStep: state.checkout.activeStep
    }
}

export default connect(mapStateToProps, null)(Checkout);