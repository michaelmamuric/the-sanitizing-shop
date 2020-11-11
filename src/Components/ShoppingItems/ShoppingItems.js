import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Typography, Grid, Card } from '@material-ui/core';
import classes from './ShoppingItems.module.css';
import numeral from 'numeral';
import * as actions from '../../store/actions/index';

const ShoppingItems = (props) => {

    // States
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    
    // Destructure for easier referencing
    const { loadProducts, productList } = props;

    // Dialog Box
    let dialogBox = (
        <Dialog open={displayDialog} onClose={() => setDisplayDialog(false)}>
            <DialogTitle>{selectedProduct !== null ? selectedProduct.name : null}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                {selectedProduct !== null ? selectedProduct.description : null}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    ); 

    // Load Products when component mounts
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Handler for Dialog Box
    const dialogBoxHandler = (product) => {
        setSelectedProduct(product);
        setDisplayDialog(true);
    }

    return (
        <Card className={classes.ShoppingItemsCard}>
            {dialogBox}
            <Grid container>
            {
              productList.map((product, index) => {
                    return (
                        <Grid className={classes.Product} item xs={6} sm={4}>
                            <span className={classes.ProductSpan} onClick={() => dialogBoxHandler(product)}>
                                <img className={classes.Img} src={product.image} alt={product.name} />
                                <Typography>{product.name}</Typography>
                                <Typography>{numeral(product.price).format('$0,0.00')}</Typography>
                            </span>
                        </Grid>
                    )
                }
              )  
            }
            </Grid>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        productList: state.productReducer.productList,
        error: state.productReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProducts: () => dispatch(actions.fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItems);