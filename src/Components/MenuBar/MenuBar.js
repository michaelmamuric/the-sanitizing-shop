import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItems from './MenuItems/MenuItems';
import MobileMenuItems from './MobileMenuItems/MobileMenuItems';
import { NavLink } from 'react-router-dom';
import SideDrawerItems from './Drawer/SideDrawerItems';
import logo from './logo.png';

// Use Styles from Material UI API
const useStyles = makeStyles((theme) => ({
    // Do not display Hamburger Menu for non-mobile screen resolutions
    icon: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex'
        }
    },
    // Menu Items
    menuItems: {
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    // Mobile Menu Items
    mobileMenuItems: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }
}));

const MenuBar = (props) => {
    // Use classes defined in useStyles
    const classes = useStyles();

    // Display Drawer
    const [displayDrawer, setDisplayDrawer] = useState(false);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Drawer open={displayDrawer} onClick={() => setDisplayDrawer(false)}>
                        <SideDrawerItems />
                    </Drawer>
                    <IconButton
                        className={classes.icon}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDisplayDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavLink to="/" >
                        <img src={logo} style={{width: '180px'}} alt="The Sanitizing Shop" />
                    </NavLink>
                    <MenuItems className={classes.menuItems} />
                    <MobileMenuItems className={classes.mobileMenuItems} />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default MenuBar;