import api from 'services/api';
import { call, put, select } from 'redux-saga/effects';

import { Creators as ProductCreators } from 'store/ducks/products';

function* getProducts(action) {
  try {
    const { data } = yield call(api.get, `category_products?id=${action.payload.id}`);
    const catProduct = data[0];

    yield put(ProductCreators.getProductsSuccess(catProduct.id, catProduct.products));
  } catch (error) {
    yield put(ProductCreators.getProductsFail('Erro ao buscar os produtos'));
  }
}

export function* initializeHome() {
  let currentCategory = {};
  try {
    const { data } = yield call(api.get, 'categories');
    const categories = data.map((cat, index) => ({ ...cat, selected: index === 0 }));
    [currentCategory] = categories;

    yield put(ProductCreators.getCategoriesSuccess(categories));
  } catch (error) {
    yield put(ProductCreators.getCategoriesError('Erro ao buscar as categorias'));
  }

  yield call(getProducts, { payload: { id: currentCategory.id } });
}

export function* changeCategory(action) {
  const { id } = action.payload;
  const { productsByCategory } = yield select(state => state.products);
  const products = productsByCategory.get(id);
  if (products) {
    yield put(ProductCreators.getProductsSuccess(id, products));
  } else {
    yield call(getProducts, { payload: { id } });
  }
}
