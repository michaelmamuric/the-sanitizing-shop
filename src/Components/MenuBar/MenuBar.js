import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItems from './MenuItems/MenuItems';

// Use Styles from Material UI API
const useStyles = makeStyles((theme) => ({
    // Do not display Hamburger Menu for non-mobile screen resolutions
    icon: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}));

const MenuBar = (props) => {
    // Use classes defined in useStyles
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.icon} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    Shopping App
                </Typography>
                <MenuItems />
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;