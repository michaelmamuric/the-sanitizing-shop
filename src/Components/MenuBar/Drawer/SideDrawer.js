import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const SideDrawer = (props) => {
    return (
        <Drawer open={props.display} onClose={props.onClose}>
            <List>
                <ListItem>
                    <ListItemText>Shopping App</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Cart</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Orders</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default SideDrawer;