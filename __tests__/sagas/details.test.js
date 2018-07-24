import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import api from 'services/api';
import rootSaga from 'store/sagas';
import { Creators, Types } from 'store/ducks/details';

describe('Testing details SAGA', () => {
  let sagaTester = null;
  let apiMock = null;
  const product = {
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
  };

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api);

    sagaTester.start(rootSaga);
  });

  it('can get product', async () => {
    apiMock.onGet(`/products/${product.id}`)
      .reply(200, product);

    sagaTester.dispatch(Creators.getProduct(product.id));

    await sagaTester.waitFor(Types.GET_PRODUCT_SUCCESS);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductSuccess(product));
  });

  it('throws error when product does not exist', async () => {
    apiMock.onGet(`/products/${product.id}`).reply(400);

    sagaTester.dispatch(Creators.getProduct(product.id));
    await sagaTester.waitFor(Types.GET_PRODUCT_FAIL);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductFail('Erro ao buscar produto'));
  });
});
