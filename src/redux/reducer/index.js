import {combineReducers}  from 'redux';

import filterReducer from './filters';
import pizzasReducer from './pizzas';

import cart from './cart';

const rootReducer = combineReducers({
  filters: filterReducer,
  pizzas: pizzasReducer,
  cart: cart,
});


export default rootReducer;