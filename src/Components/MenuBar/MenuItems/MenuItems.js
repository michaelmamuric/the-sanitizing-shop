import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const MenuItems = (props) => {
    return (
        <Grid className={props.className} container justify="flex-end">
            <Button component={Link} to="/cart" color="inherit">Cart</Button>
            <Button component={Link} to="/orders" color="inherit">My Orders</Button>
        </Grid>
    )
}

export default MenuItems;