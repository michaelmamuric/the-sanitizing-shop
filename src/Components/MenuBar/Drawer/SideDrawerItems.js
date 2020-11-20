import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { NavLink } from 'react-router-dom';

const SideDrawer = (props) => {
    
    let links = (
        <>
        <ListItem button component={NavLink} to="/orders">
            <ListItemIcon>
                <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
        </ListItem>
        <ListItem button component={NavLink} to="/logout">
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
        </>        
    );

    if(!props.isAuthenticated) {
        links= (
            <>
            <ListItem button component={NavLink} to="/login">
                <ListItemIcon>
                    <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
            </ListItem>
            </>         
        );
    }
    
    return (
        <List>
            <ListItem button component={NavLink} to="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
            </ListItem>
            <ListItem button component={NavLink} to="/cart">
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary='Cart' />
            </ListItem>
            {links}
        </List>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token.id !== null
    }
}

export default connect(mapStateToProps, null)(SideDrawer);