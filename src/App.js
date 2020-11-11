import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from './Components/MenuBar/MenuBar';
import ShoppingItems from './Components/ShoppingItems/ShoppingItems';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
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
            <Route path="/" exact component={ShoppingItems} />
            <Route path="/cart" component={Cart} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Grid>
      </Grid>
  );
}

export default App;
