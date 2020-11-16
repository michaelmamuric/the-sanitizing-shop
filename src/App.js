import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from './Components/MenuBar/MenuBar';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
import Login from './Components/Login/Login';
import { Switch, Route } from 'react-router-dom';

function App() {
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
          </Switch>
        </Grid>
      </Grid>
  );
}

export default App;
