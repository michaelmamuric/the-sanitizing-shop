import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SideDrawer = (props) => {    
    return (
        <List>
            <ListItem component={Link} to="/">
                <ListItemText>Shopping App</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/cart">
                <ListItemText>Cart</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/orders">
                <ListItemText>Orders</ListItemText>
            </ListItem>
        </List>
    )
}

export default SideDrawer;