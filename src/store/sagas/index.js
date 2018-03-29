import { all, takeLatest } from 'redux-saga/effects';

import { Types as ProductTypes } from 'store/ducks/products';
import { initializeHome } from "./products";

export default function* rootSaga() {
  return yield all([
    takeLatest(ProductTypes.INITIALIZE_HOME, initializeHome),
  ]);
}
