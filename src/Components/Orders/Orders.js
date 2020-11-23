import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Redirector from '../Redirector/Redirector';
import dayjs from 'dayjs';
import numeral from 'numeral';
import * as actions from '../../store/actions/index';
import classes from './Orders.module.css';

const Orders = (props) => {

    // Destructure for easier referencing
    const { isAuthenticated, userId, fetchOrders, orderList, isLoading } = props;

    // Fetch orders
    useEffect(() => {
        fetchOrders(userId);
    }, [fetchOrders, userId]);

    // Default component to be rendered
    let component = <Redirector location="/" />;

    // If user is authenticated
    if(isAuthenticated) {
        if(isLoading) {
            component = (
                <div className={classes.LoadingSpinner}>
                    <CircularProgress />
                </div>                
            );
        }
        else {
            component = (
                <Card className={classes.Card}>
                <CardContent>
                    <Typography variant="h6">My Orders</Typography>
                    <Grid container className={classes.OrderGrid}>
                    {
                        orderList.map((order, index) => {
                            // To be used to compute total price
                            let totalPrice = 0;

                            return (
                                <Grid item key={index} style={{margin: '15px 15px 0px 0px', width: '100%'}}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography style={{fontWeight: 'bold'}}>{`Order # ${index + 1}`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.Bold}>
                                                    Date of Purchase
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography>
                                                    {dayjs(order.purchaseDate).format('D MMMM YYYY')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} className={classes.FillerGrid}>&nbsp;</Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.Bold}>
                                                    Shipping Address
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography>
                                                    {`${order.shippingHouseNumber} ${order.shippingStreetNumber}, ${order.shippingCity}, ${order.shippingProvince} ${order.shippingPostalCode}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} className={classes.FillerGrid}>&nbsp;</Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.Bold}>
                                                    Items Purchased
                                                </Typography>
                                            </Grid>
                                            {
                                            <Grid item xs={12} sm={9}>
                                                <Typography>
                                                {
                                                    order.items.map((item, index) => {
                                                        // Compute total price
                                                        totalPrice += item.qty * item.product.price;

                                                        return ( 
                                                            <React.Fragment key={index}>
                                                                {`${item.qty} x ${item.product.name} (${numeral(item.product.price).format('$0,0.00')} each)`}<br />
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                                </Typography>
                                            </Grid>
                                            }
                                            <Grid item xs={12} className={classes.FillerGrid}>&nbsp;</Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.Bold}>
                                                    Total Price Paid
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography>
                                                {numeral(totalPrice).format('$0,0.00')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                </CardContent>
            </Card>            
            );
        }
    }

    return component;
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token.id !== null,
        userId: state.auth.token.localId,
        orderList: state.product.orderList,
        isLoding: state.product.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (userId) => dispatch(actions.fetchOrders(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);