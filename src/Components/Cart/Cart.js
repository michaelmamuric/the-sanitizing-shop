import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Grid, TextField, IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './Cart.module.css';
import * as actions from '../../store/actions/index';
import numeral from 'numeral';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';

const Cart = (props) => {

    // Destructure for easier referencing
    const { cartItems, deleteFromCart, hideSnackbar, updateCart, setHasCheckedOut } = props;

    // States
    const [state, setState] = useState(
        Object.assign({}, cartItems)
    );
    const [confirmDialog, setConfirmDialog] = useState(false);

    // Hide Snackbar (in case user clicks so fast without waiting for Snackbar to close)
    useEffect(() => {
        hideSnackbar();
    }, [hideSnackbar]);

    // Set hasCheckedOut to false if user does not have any items in the cart
    useEffect(() => {
        if(cartItems.length === 0) {
            setHasCheckedOut(false);
        }
    }, [cartItems.length, setHasCheckedOut]);

    // Handler when qty value is changed
    const qtyChangedHandler = (event, index) => {
        // Convert String to Number
        const newQty = +event.target.value;

        setState({
            ...state,
            [index]: {
                ...state[index].product,
                qty: newQty
            }
        });

        // Maybe improve this one - only trigger after user stops typing?
        updateCart(index, newQty);
    }

    // Handler when user clicks Checkout
    const checkoutHandler = () => {
        let invalidCount = 0;

        // Check if any item quantities are less than 1, or is not an integer
        for(let i = 0;  i < cartItems.length; i++) {
            const qty = state[i].qty;

            if(qty < 1 || !Number.isInteger(qty))
                invalidCount++;
        }

        // If all quantities are good, display confirm dialog
        if(invalidCount === 0) {
            setConfirmDialog(true);
        }
    }

    // Cart Total (decided to use this instead of reduce method to avoid going thru all cartItems' elements again)
    let cartTotal = 0;

    // Handler when item is removed from cart
    const deleteItemHandler = (index) => {
        // Delay removal
        setTimeout(() => {
            deleteFromCart(index);
            window.location.reload();
        }, 100);
    }

    return (
        <> {/* Shorthand for <React.Fragment> */}
        <Card className={classes.Card}>
            <ConfirmDialog open={confirmDialog} onClose={() => setConfirmDialog(false)} />
            <CardContent>
                <Typography variant="h6">My Cart</Typography>
                <br />
                <Grid container>
                {
                    cartItems.length > 0 
                    ?
                    cartItems.map((item, index) => {
                        const productPrice = item.product.price;
                        const priceTimesQty = state[index].qty * productPrice;
                        cartTotal += priceTimesQty;

                        return (
                            <React.Fragment key={item.product._id}>
                                <Grid className={classes.ImgGrid} item xs={false} sm={3}>
                                    <img className={classes.CartImg} src={item.product.image} alt={item.product.name} />
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={5} sm={3}>
                                    <Typography>
                                        {item.product.name}
                                    </Typography>
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={2} sm={1}>
                                    <Typography>
                                        {`${numeral(productPrice).format('$0,0.00')}`}
                                    </Typography>
                                </Grid>
                                <Grid className={classes.QtyGrid} item xs={3} sm={2}>
                                    <TextField className={classes.QtyField} type="number" size="small"
                                        variant="outlined"
                                        value={state[index].qty}
                                        error={state[index].qty < 1 || !Number.isInteger(state[index].qty)}
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                                required: true
                                            }
                                        }}
                                        onChange={(event) => qtyChangedHandler(event, index)}
                                    />
                                </Grid>
                                <Grid className={classes.PriceTimesUnits} item xs={false} sm={2}>
                                    <Typography>
                                        {
                                            numeral(priceTimesQty).format('$0,0.00')
                                        }
                                    </Typography>
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={2} sm={1}>
                                    <IconButton onClick={() => deleteItemHandler(index)}>
                                        <DeleteIcon size="small" />
                                    </IconButton>
                                </Grid>
                            </React.Fragment>
                        )
                    }) 
                    :
                    <Typography>Your cart is empty.</Typography> 
                }
                </Grid>
                {
                    cartItems.length > 0 
                    ?
                    <Grid container>
                        <Grid item xs={false} sm={7}></Grid>
                        <Grid className={classes.TotalLabelGrid} item xs={5} sm={2}>
                            <Typography><strong>Total</strong></Typography>
                        </Grid>
                        <Grid className={classes.TotalQtyGrid} item xs={2} sm={2}>
                            <Typography>
                            {numeral(cartTotal).format('$0,0.00')}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}></Grid>
                    </Grid>
                    : null
                }
            </CardContent>
        </Card>
        {
            cartItems.length > 0 
            ?
            <Grid container style={{ margin: 'auto', width: '90%'}}>
                <Grid className={classes.CheckoutGrid} item xs={12}>
                    <Button variant="contained" color="primary" onClick={checkoutHandler}>Checkout &#8594;</Button>
                </Grid>
            </Grid>
            : null
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.shopping.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (index, newQty) => dispatch(actions.updateCart(index, newQty)),
        deleteFromCart: (index) => dispatch(actions.deleteFromCart(index)),
        hideSnackbar: () => dispatch(actions.hideSnackbar()),
        setHasCheckedOut: (hasCheckedOut) => dispatch(actions.setHasCheckedOut(hasCheckedOut))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);