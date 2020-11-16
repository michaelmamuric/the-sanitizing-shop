import './App.css';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from './Components/MenuBar/MenuBar';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
import Login from './Components/Login/Login';
import Checkout from './Components/Checkout/Checkout';
import { Switch, Route } from 'react-router-dom';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const App = (props) => {

  // Destructure for easier referencing
  const { token, checkAuthState } = props;

  // Check Auth State
  useEffect(() => {
    checkAuthState(token);
  }, [checkAuthState]);

  return (
      <Grid container>
        <Grid item xs={12}>
          <MenuBar />
        </Grid>
        <Grid item xs={12} style={{padding: '20px'}}>
          {/* Routing */}
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/cart" component={Cart} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={Login} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Grid>
      </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: (token) => dispatch(actions.checkAuthState(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
