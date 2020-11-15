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

const ConfirmDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle disableTypography className={classes.DialogTitle}>
                <h3>Checkout</h3>
                <IconButton onClick={props.onClose}>
                    <CloseIcon size="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Would you like to proceed to checkout?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary">Yes</Button>
                <Button color="primary" onClick={props.onClose}>No</Button>
            </DialogActions>
        </Dialog>       
    )
}

export default ConfirmDialog;