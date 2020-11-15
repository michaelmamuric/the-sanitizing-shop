import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Grid, TextField, IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './Cart.module.css';
import * as actions from '../../store/actions/index';
import numeral from 'numeral';

const Cart = (props) => {

    // Destructure for easier referencing
    const { cartItems, deleteFromCart, hideSnackbar, updateCart } = props;

    // States
    const [state, setState] = useState(
        Object.assign({}, cartItems)
    );

    // Hide Snackbar (in case user clicks so fast without waiting for Snackbar to close)
    useEffect(() => {
        hideSnackbar();
    }, [hideSnackbar]);

    // Handler when qty value is changed
    const qtyChangedHandler = (event, index) => {
        const newQty = +event.target.value;

        setState({
            ...state,
            [index]: {
                ...state.[index].product,
                qty: newQty
            }
        });

        // Maybe improve this one - only trigger after user stops typing?
        updateCart(index, newQty);
    }

    // Cart Total (decided to use this instead of reduce method to avoid going thru all cartItems' elements again)
    let cartTotal = 0;

    // Handler when item is removed from cart
    const deleteItemHandler = (index) => {
        // Delay removal by half a second
        setTimeout(() => {
            deleteFromCart(index);
            window.location.reload();
        }, 500);
    }

    return (
        <Card className={classes.Card}>
            <CardContent>
                <Typography variant="h6">My Cart</Typography>
                <br />
                <Grid container>
                {
                    cartItems.length > 0 
                    ?
                    cartItems.map((item, index) => {
                        const productPrice = item.product.price;
                        const priceTimesQty = state.[index].qty * productPrice;
                        cartTotal += priceTimesQty;

                        return (
                            <React.Fragment>
                                <Grid key={item.product._id} className={classes.ImgGrid} item xs={0} sm={3}>
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
                                        value={state.[index].qty}
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                                required: true
                                            }
                                        }}
                                        onChange={(event) => qtyChangedHandler(event, index)}
                                    />
                                </Grid>
                                <Grid className={classes.PriceTimesUnits} item xs={0} sm={2}>
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
                        <Grid item xs={0} sm={7}></Grid>
                        <Grid className={classes.TotalLabelGrid} item xs={5} sm={2}>
                            <Typography className={classes.TotalLabel}>Total</Typography>
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
        hideSnackbar: () => dispatch(actions.hideSnackbar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);