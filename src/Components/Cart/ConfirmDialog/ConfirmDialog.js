import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import classes from './ConfirmDialog.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const ConfirmDialog = (props) => {

    // Destructure for easier referencing
    const { setHasCheckedOut, history, open, onClose, isAuthenticated } = props;

    const checkOutHandler = (hasCheckedOut) => {
        setHasCheckedOut(hasCheckedOut);
        // props.history can now be accessed thanks to withRouter
        // If user has not authenticated, redirect to login
        if(!isAuthenticated)
            history.push('/login');
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle disableTypography className={classes.DialogTitle}>
                <h3>Checkout</h3>
                <IconButton onClick={onClose}>
                    <CloseIcon size="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Would you like to proceed to checkout?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => checkOutHandler(true)}>Yes</Button>
                <Button color="primary" onClick={onClose}>No</Button>
            </DialogActions>
        </Dialog>       
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token.id !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHasCheckedOut: (hasCheckedOut) => dispatch(actions.setHasCheckedOut(hasCheckedOut)) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog));