import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ProductDialog from './ProductDialog/ProductDialog';
import ProductSnackbar from './ProductSnackbar/ProductSnackbar';
import classes from './Products.module.css';
import numeral from 'numeral';
import * as actions from '../../store/actions/index';

const Products = (props) => {

    // States
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // Destructure for easier referencing
    const { loadProducts, productList, showDialog, hideDialog, isDialogDisplayed } = props;

    // Load Products if productList is empty
    useEffect(() => {
        if(productList.length === 0) {
            loadProducts();
        }
    }, [loadProducts, productList.length]);

    // Handler when Dialog Box is to be opened
    const dialogBoxHandler = (product) => {
        setSelectedProduct(product);
        showDialog();
    }

    return (
        <React.Fragment>
            <Card className={classes.ShoppingItemsCard}>
                <ProductDialog open={isDialogDisplayed} onClose={hideDialog} product={selectedProduct} />
                <Grid container>
                {
                productList.map((product) => {
                        return (
                            <Grid key={product._id} className={classes.Product} item xs={12} sm={4}>
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
            <ProductSnackbar />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        productList: state.product.productList,
        error: state.product.error,
        isDialogDisplayed: state.product.isDialogDisplayed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProducts: () => dispatch(actions.fetchProducts()),
        showDialog: () => dispatch(actions.showDialog()),
        hideDialog: () => dispatch(actions.hideDialog())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);