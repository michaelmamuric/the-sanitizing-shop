import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const MenuItems = (props) => {
    return (
        <React.Fragment>
            <Button component={Link} to="/cart" color="inherit">Cart</Button>
            <Button component={Link} to="/orders" color="inherit">My Orders</Button>
        </React.Fragment>
    )
}

export default MenuItems;