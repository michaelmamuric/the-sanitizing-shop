import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Grid, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItems from './MenuItems/MenuItems';
import { NavLink } from 'react-router-dom';
import SideDrawerItems from './Drawer/SideDrawerItems';

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
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}));

const MenuBar = (props) => {
    // Use classes defined in useStyles
    const classes = useStyles();

    // Display Drawer
    const [displayDrawer, setDisplayDrawer] = useState(false);

    return (
        <React.Fragment>
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
                    <Grid container>
                        <Typography variant="h6">
                            <NavLink to="/">
                            Shopping App
                            </NavLink>
                        </Typography>
                    </Grid>
                    <MenuItems className={classes.menuItems} />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
};

export default MenuBar;