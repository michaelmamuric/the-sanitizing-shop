import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';

const MenuItems = (props) => {

    let links = (
        <>
        <Button component={NavLink} to="/orders" color="inherit">
            <ShoppingBasketIcon />
            My Orders
        </Button>
        <Button component={NavLink} to="/logout" color="inherit">
            <ExitToAppIcon />
            Logout
        </Button>
        </>        
    );

    if(!props.isAuthenticated) {
        links= (
            <>
                <Button component={NavLink} to="/login" color="inherit">
                    <LockOpenIcon />
                    Login
                </Button>
            </>         
        );
    }
    
    return (
        <Grid className={props.className} container>
            <Badge badgeContent={props.itemCount} color="secondary">
                <Button component={NavLink} to="/cart" color="inherit">
                    <ShoppingCartIcon />
                    Cart
                </Button>
            </Badge>
            {links}
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token.id !== null,
        itemCount: state.shopping.cartItems.length
    }
}

export default connect(mapStateToProps, null)(MenuItems);