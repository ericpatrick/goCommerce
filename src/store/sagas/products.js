import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as ProductCreators } from 'store/ducks/products';

export function* initializeHome() {
  let currentCategory = {};
  try {
    const { data } = yield call(api.get, 'categories');
    currentCategory = data[0];

    yield put(ProductCreators.getCategoriesSuccess(data));
  } catch (error) {
    yield put(ProductCreators.getCategoriesError('Erro ao buscar as categorias'));
    console.tron.log(error);
  }

  try {
    const { data } = yield call(api.get, `category_products?id=${currentCategory.id}`);
    const catProduct = data[0];
    console.tron.log(catProduct);

    yield put(ProductCreators.getProductsSuccess(catProduct.id, catProduct.products));
  } catch (error) {
    yield put(ProductCreators.getProductsFail('Erro ao buscar os produtos'));
    console.tron.log(error);
  }
}
