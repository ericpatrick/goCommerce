import api from 'services/api';
import { call, put } from 'redux-saga/effects';
import { Creators as DetailsCreators } from 'store/ducks/details';

export function* getProduct(action) {
  try {
    console.tron.log(action.payload.id);
    const { data } = yield call(api.get, `/products/${action.payload.id}`);
    yield put(DetailsCreators.getProductSuccess(data));
  } catch (err) {
    yield put(DetailsCreators.getProductFail('Erro ao buscar produto'));
    console.tron.log(`Erro ao buscar produto: ${err}`);
  }
}
