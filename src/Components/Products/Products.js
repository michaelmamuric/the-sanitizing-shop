import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ProductDialog from './ProductDialog/ProductDialog';
import ProductSnackbar from './ProductSnackbar/ProductSnackbar';
import classes from './Products.module.css';
import numeral from 'numeral';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../store/actions/index';

const Products = (props) => {

    // States
    const [selectedProduct, setSelectedProduct] = useState('');
    
    // Destructure for easier referencing
    const { loadProducts, productList, showDialog, hideDialog, isDialogDisplayed, hideSnackbar, cartItems, isLoading } = props;

    // Load Products if productList is empty
    useEffect(() => {
        if(productList.length === 0) {
            loadProducts();
        }
    }, [loadProducts, productList.length]);

    // Handler when Dialog Box is to be opened
    const dialogBoxHandler = (product) => {
        hideSnackbar();
        setSelectedProduct(product);
        showDialog();
    }

    return (
        <Card className={classes.ShoppingItemsCard}>
            {
                isLoading
                ?
                <div className={classes.LoadingSpinner}>
                    <CircularProgress />
                </div>
                :
                <React.Fragment>
                    <ProductDialog open={isDialogDisplayed} onClose={hideDialog} product={selectedProduct} />
                    <Grid container>
                    {
                        productList.map((product, index) => {
                                // Checks if item is added to cart. Returns true if item is added to cart, false if not
                                const addedToCart = cartItems.findIndex((item) => item.product._id === product._id) !== -1;
        
                                return (
                                    <Grid key={index} className={classes.Product} item xs={12} sm={4}>
                                        <span className={classes.ProductSpan} onClick={() => dialogBoxHandler(product)}>
                                            { /* Badge automatically hides when content is set to 0 */ }
                                            <Badge badgeContent={addedToCart ? "Added to Cart" : 0} color="primary">
                                                <img className={classes.Img} src={product.image} alt={product.name} />
                                            </Badge>
                                            <Typography>{product.name}</Typography>
                                            <Typography>{numeral(product.price).format('$0,0.00')}</Typography>
                                        </span>
                                    </Grid>
                                )
                            }
                        )  
                    }
                    </Grid>
                    <ProductSnackbar productName={selectedProduct.name} />
                </React.Fragment> 
            }
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        productList: state.product.productList,
        error: state.product.error,
        isDialogDisplayed: state.product.isDialogDisplayed,
        cartItems: state.shopping.cartItems,
        isLoading: state.product.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProducts: () => dispatch(actions.fetchProducts()),
        showDialog: () => dispatch(actions.showDialog()),
        hideDialog: () => dispatch(actions.hideDialog()),
        hideSnackbar: () => dispatch(actions.hideSnackbar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);