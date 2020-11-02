import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Grid, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItems from './MenuItems/MenuItems';
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
        <AppBar position="static">
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
                        Shopping App
                    </Typography>
                </Grid>
                <MenuItems className={classes.menuItems} />
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;