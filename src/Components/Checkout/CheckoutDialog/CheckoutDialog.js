import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './CheckoutDialog.module.css';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { getOrdersURL } from '../../../secrets/secrets';

const CheckoutDialog = (props) => {
    // Destructure for easier referencing 
    const { 
        open, onClose, userId, shippingHouseNumber, shippingStreetNumber, shippingCity, 
        shippingProvince, shippingPostalCode, items, setActiveStep, setPurchased, setPaymentStatus,
        clearCart, clearBillingFields
    } = props;

    // States
    const [backdrop, setBackdrop] = useState(false);

    // To be invoked when "payment" has been successful
    const paymentSuccessfulHandler = () => {
        // Set Purchased to true
        setPurchased(true)
        
        // Set Payment Status to successful
        setPaymentStatus(true);

        // Clear Cart Items
        clearCart();

        // Clear Billing Fields
        clearBillingFields();
    }

    // Handler when Yes is clicked
    const dialogHandler = async() => {
        let paymentSuccess = true;

        // Close Dialog
        onClose();

        // Open Backdrop
        setBackdrop(true);

        // Send data to backend
        try {
            const orderData = {
                "userId": userId,
                "shippingHouseNumber": shippingHouseNumber,
                "shippingStreetNumber": shippingStreetNumber,
                "shippingCity": shippingCity,
                "shippingProvince": shippingProvince,
                "shippingPostalCode": shippingPostalCode,
                "items": items
            };

            // Send Post Request to backend URL
            await axios.post(getOrdersURL, orderData);
        } catch(error) {
            paymentSuccess = false;
        }

        // Simulate Processing Payment
        // If post request to backend is successful, assume payment went successfully
        // Obviously not totally correct, but since we are not processing actual credit card payments,
        // this will do forthis demo :)
        setTimeout(() => {
            if(paymentSuccess) {
                paymentSuccessfulHandler();
            }
            setBackdrop(false);
            setActiveStep(2);
        }, 5000);
    }

    return (
        <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle disableTypography className={classes.DialogTitle}>
                <h3>Finalize Order</h3>
                <IconButton onClick={onClose}>
                    <CloseIcon size="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Would you like to finalize your order? <br /><br />
                [Note: This is a demo project, so no payment will actually be collected, and no credit card
                data will actually be stored.]
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={dialogHandler}>Yes</Button>
                <Button color="primary" onClick={onClose}>No</Button>
            </DialogActions>
        </Dialog>
        <Backdrop style={{zIndex: 1201, color: '#fff'}} open={backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
        </>   
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.token.localId,
        shippingHouseNumber: state.checkout.billingFields.houseNumber.value,
        shippingStreetNumber: state.checkout.billingFields.street.value,
        shippingCity: state.checkout.billingFields.city.value,
        shippingProvince: state.checkout.billingFields.province.value,
        shippingPostalCode: state.checkout.billingFields.postalCode.value,
        items: state.shopping.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveStep: (step) => dispatch(actions.setActiveStep(step)),
        setPurchased: (purchased) => dispatch(actions.setPurchased(purchased)),
        setPaymentStatus: (paymentSuccess) => dispatch(actions.setPaymentStatus(paymentSuccess)),
        clearCart: () => dispatch(actions.clearCart()),
        clearBillingFields: () => dispatch(actions.clearBillingFields())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDialog);