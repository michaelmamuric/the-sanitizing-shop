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

    // Handler when item is removed from cart
    const deleteItemHandler = (index) => {
        deleteFromCart(index);
        window.location.reload();
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
                        return (
                            <React.Fragment key={item.product._id}>
                                <Grid className={classes.ImgGrid} item xs={2} sm={2}>
                                    <img className={classes.CartImg} src={item.product.image} alt={item.product.name} />
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={4} sm={4}>
                                    {item.product.name}
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={2} sm={1}>
                                    <TextField type="number" size="small"
                                        value={state.[index].qty}
                                        onChange={(event) => qtyChangedHandler(event, index)}
                                    />
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={3} sm={4}>
                                    <Typography>
                                        {
                                            numeral(
                                                state.[index].qty * item.product.price,
                                            ).format('$0,0.00')
                                        }
                                    </Typography>
                                </Grid>
                                <Grid className={classes.CartCenter} item xs={1} sm={1}>
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