import { combineReducers } from 'redux';

import products from './products';
import details from './details';
import cart from './cart';

export default combineReducers({
  products,
  details,
  cart,
});
