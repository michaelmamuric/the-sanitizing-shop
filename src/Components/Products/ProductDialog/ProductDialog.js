import React from 'react';
import { connect } from 'react-redux';
import classes from '../Products.module.css';
import * as actions from '../../../store/actions/index';
import { Dialog, DialogContent, DialogTitle, DialogContentText, Grid, DialogActions, Button } from '@material-ui/core';

const ProductDialog = (props) => {

    // Destructure for easier referencing
    const { product, open, onClose, addToCart, hideDialog } = props;

    // Handles Add to Cart action
    const addToCartHandler = (productId, qty) => {
        addToCart(productId, qty);
        hideDialog();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{product !== null ? product.name : null}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} sm={8}>
                    {
                        props.product !== null ?
                        <img className={classes.ImgDialog} src={product.image} alt={product.name} /> :
                        null
                    }
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button onClick={() => addToCartHandler(product._id, 1)}>
                            Add to Cart
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContentText>
                        {product !== null ? product.description : null}
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (productId, qty) => dispatch(actions.addToCart(productId, qty)),
        hideDialog: () => dispatch(actions.hideDialog())
    }
}

export default connect(null, mapDispatchToProps)(ProductDialog);