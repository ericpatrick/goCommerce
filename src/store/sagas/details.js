import api from 'services/api';
import { call, put } from 'redux-saga/effects';
import { Creators as DetailsCreators } from 'store/ducks/details';

export function* getProduct(action) {
  try {
    const { data } = yield call(api.get, `/products/${action.payload.id}`);
    yield put(DetailsCreators.getProductSuccess(data));
  } catch (err) {
    yield put(DetailsCreators.getProductFail('Erro ao buscar produto'));
  }
}
