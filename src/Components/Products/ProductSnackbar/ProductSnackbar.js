import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as actions from '../../../store/actions/index';

const ProductSnackbar = (props) => {

    // Destructure for easier referencing
    const { isSnackbarDisplayed, hideSnackbar, productName } = props;

    // Close Snackbar (does not close if user clicks away)
    const closeSnackbarHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        hideSnackbar();      
    }

    return (
        <Snackbar 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={isSnackbarDisplayed}
            onClose={closeSnackbarHandler}
            autoHideDuration={3000}
            message={`${productName} added to cart`}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbarHandler}>
                    <CloseIcon fontSize="small" />
                </IconButton>             
            }
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isSnackbarDisplayed: state.product.isSnackbarDisplayed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideSnackbar: () => dispatch(actions.hideSnackbar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSnackbar);