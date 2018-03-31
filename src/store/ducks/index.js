import { combineReducers } from 'redux';

import products from './products';
import details from './details';

export default combineReducers({
  products,
  details,
});
