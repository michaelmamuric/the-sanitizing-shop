import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from '../Products.module.css';
import * as actions from '../../../store/actions/index';
import { Dialog, DialogContent, DialogTitle, DialogContentText, Grid, DialogActions, Button, TextField } from '@material-ui/core';

const ProductDialog = (props) => {

    // States
    const [productQty, setProductQty] = useState(1);

    // Destructure for easier referencing
    const { product, open, onClose, addToCart, hideDialog, showSnackbar } = props;

    // Handles Add to Cart action
    const addToCartHandler = (productId, qty) => {
        addToCart(productId, qty);
        hideDialog();
        setProductQty(1);
        showSnackbar();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{product !== null ? product.name : null}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} sm={8} className={classes.Product}>
                    {
                        props.product !== null ?
                        <img className={classes.ImgDialog} src={product.image} alt={product.name} /> :
                        null
                    }
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.Product}>
                        <DialogActions className={classes.DialogAct}>
                            <TextField label="Quantity" type="number" size="small"
                                value={productQty} 
                                onChange={(event) => setProductQty(event.target.value) } 
                            />
                            <Button variant="contained" color="primary"
                                onClick={() => addToCartHandler(product, productQty)}>
                                Add
                            </Button>
                        </DialogActions>
                    </Grid>
                    <Grid item xs={12} className={classes.Product}>
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
        hideDialog: () => dispatch(actions.hideDialog()),
        showSnackbar: () => dispatch(actions.showSnackbar())
    }
}

export default connect(null, mapDispatchToProps)(ProductDialog);