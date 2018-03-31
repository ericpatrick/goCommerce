import { all, takeLatest } from 'redux-saga/effects';

import { Types as ProductTypes } from 'store/ducks/products';
import { Types as DetailsTypes } from 'store/ducks/details';

import { initializeHome, changeCategory } from './products';
import { getProduct } from './details';

export default function* rootSaga() {
  return yield all([
    takeLatest(ProductTypes.INITIALIZE_HOME, initializeHome),
    takeLatest(ProductTypes.CHANGE_CATEGORY, changeCategory),
    takeLatest(DetailsTypes.GET_PRODUCT, getProduct),
  ]);
}
