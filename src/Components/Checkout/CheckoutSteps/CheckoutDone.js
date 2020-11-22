import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

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
            <div>
                {
                    this.props.paymentSuccess ?
                    'Thank you for purchase!' :
                    'Sorry, your purchase was not successful.'
                }
            </div>
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