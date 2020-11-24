import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from '../Products.module.css';
import * as actions from '../../../store/actions/index';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogContent, DialogTitle, DialogContentText, Grid, DialogActions, Button, TextField , IconButton} from '@material-ui/core';

const ProductDialog = (props) => {

    // States
    const [productQty, setProductQty] = useState(1);

    // Destructure for easier referencing
    const { product, open, onClose, addToCart, hideDialog, showSnackbar, cartItems } = props;

    // Handles Add to Cart action
    const addToCartHandler = (productId, qty) => {
        if(+qty >= 1 && Number.isInteger(+qty)) {
            addToCart(productId, +qty);
            hideDialog();
            setProductQty(1);
            showSnackbar();
        }
    }

    // Checks if item is added to cart. Returns true if item is added to cart, false if not
    const addedToCart = cartItems.findIndex((item) => item.product._id === product._id) !== -1;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle disableTypography className={classes.DialogTitle}>
                <h3>{product.name}</h3>
                <IconButton onClick={hideDialog}>
                    <CloseIcon size="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} sm={7} className={classes.Product}>
                        <img className={classes.ImgDialog} src={product.image} alt={product.name} />
                    </Grid>
                    <Grid item xs={12} sm={5} className={classes.Product}>
                        <DialogActions className={classes.DialogAct}> 
                            <TextField label="Quantity" type="number" size="small" value={productQty}
                                variant="outlined"
                                error={+productQty < 1 && !Number.isInteger(+productQty)}  
                                onChange={(event) => setProductQty(event.target.value) }
                                InputProps={{
                                    inputProps: {
                                        min: 1
                                    }
                                }}
                                disabled={addedToCart}
                            />
                            <Button variant="contained" color="primary"
                                onClick={() => addToCartHandler(product, productQty)}
                                disabled={addedToCart}
                                className={classes.ButtonTxt}
                            >
                                {
                                    addedToCart ? 'Added' : 'Add'
                                }
                            </Button>
                        </DialogActions>
                    </Grid>
                    <Grid item xs={12} className={classes.Product}>
                        <DialogContentText>
                            {product.description}
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.shopping.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (productId, qty) => dispatch(actions.addToCart(productId, qty)),
        hideDialog: () => dispatch(actions.hideDialog()),
        showSnackbar: () => dispatch(actions.showSnackbar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDialog);