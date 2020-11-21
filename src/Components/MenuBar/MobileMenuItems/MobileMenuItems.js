import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const MobileMenuItems = (props) => {
    return (
        <Grid container className={props.className}>
            <IconButton component={NavLink} to="/cart" color="inherit">
                <Badge badgeContent={props.itemCount} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        itemCount: state.shopping.cartItems.length
    }
}

export default connect(mapStateToProps, null)(MobileMenuItems);