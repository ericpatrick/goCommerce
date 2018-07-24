import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import api from 'services/api';
import rootSaga from 'store/sagas';
import { Creators, Types } from 'store/ducks/products';

describe('Testing products SAGA', () => {
  let sagaTester = null;
  let apiMock = null;
  const categories = [
    {
      id: 1,
      title: 'Camisetas',
    },
    {
      id: 2,
      title: 'Camisas',
    },
  ];
  const categoryProducts = [
    {
      id: 1,
      products: [
        {
          id: 1,
          name: 'Camiseta Hyperas Preta',
          brand: 'Quiksilver',
          image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
          price: 49.99,
        },
        {
          id: 2,
          name: 'Camiseta Double Tap Preta',
          brand: 'Quiksilver',
          image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
          price: 59.99,
        },
      ],
    },
    {
      id: 2,
      products: [
        {
          id: 2,
          name: 'Camiseta Double Tap Preta',
          brand: 'Quiksilver',
          image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
          price: 59.99,
        },
        {
          id: 3,
          name: 'Camiseta Logo Azul',
          brand: 'Red Bull',
          image: 'https://t-static.dafiti.com.br/aC9871vKWfL3bDgbhLx5sFLa7xs=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fred-bull-camiseta-red-bull-logo-azul-0272-7714033-1-product.jpg',
          price: 54.99,
        },
      ],
    },
  ];

  beforeEach(() => {
    const productsByCategory = [[1, categoryProducts[0].products]];
    sagaTester = new SagaTester({
      initialState: {
        products: {
          productsByCategory: new Map(productsByCategory),
        },
      },
    });
    apiMock = new MockAdapter(api);

    sagaTester.start(rootSaga);
  });

  it('can initialize Home', async () => {
    const products = categoryProducts.slice(0, 1);
    apiMock.onGet('categories').reply(200, categories);
    apiMock.onGet(`category_products?id=${categories[0].id}`).reply(200, products);

    sagaTester.dispatch(Creators.initializeHome());
    await sagaTester.waitFor(Types.GET_CATEGORIES_SUCCESS);

    const categoriesModel = categories.map((cat, index) => ({ ...cat, selected: index === 0 }));

    const action = sagaTester.getCalledActions()[1];

    expect(action)
      .toEqual(Creators.getCategoriesSuccess(categoriesModel));

    await sagaTester.waitFor(Types.GET_PRODUCTS_SUCCESS);

    const catProduct = products[0];
    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductsSuccess(catProduct.id, catProduct.products));
  });

  it('throws error when categories does not exists', async () => {
    const products = categoryProducts.slice(0, 1);
    apiMock.onGet('categories').reply(400, categories);
    apiMock.onGet(`category_products?id=${categories[0].id}`).reply(200, products);

    sagaTester.dispatch(Creators.initializeHome());
    await sagaTester.waitFor(Types.GET_PRODUCTS_FAIL);

    const action = sagaTester.getCalledActions()[1];

    expect(action)
      .toEqual(Creators.getCategoriesError('Erro ao buscar as categorias'));
  });

  it('throws error when products does not exists', async () => {
    apiMock.onGet('categories').reply(200, categories);
    apiMock.onGet(`category_products?id=${categories[0].id}`).reply(400);

    sagaTester.dispatch(Creators.initializeHome());

    await sagaTester.waitFor(Types.GET_PRODUCTS_FAIL);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductsFail('Erro ao buscar os produtos'));
  });

  it('can change category', async () => {
    sagaTester.dispatch(Creators.changeCategory(categories[0].id));

    await sagaTester.waitFor(Types.GET_PRODUCTS_SUCCESS);

    const catProduct = categoryProducts[0];
    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductsSuccess(catProduct.id, catProduct.products));
  });

  it('can change category and get products', async () => {
    const products = categoryProducts.slice(1, 2);
    apiMock.onGet(`category_products?id=${categories[1].id}`).reply(200, products);

    sagaTester.dispatch(Creators.changeCategory(categories[1].id));

    await sagaTester.waitFor(Types.GET_PRODUCTS_SUCCESS);

    const catProduct = products[0];
    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductsSuccess(catProduct.id, catProduct.products));
  });

  it('could not change category because products does not exists', async () => {
    apiMock.onGet(`category_products?id=${categories[1].id}`).reply(400);

    sagaTester.dispatch(Creators.changeCategory(categories[1].id));

    await sagaTester.waitFor(Types.GET_PRODUCTS_FAIL);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(Creators.getProductsFail('Erro ao buscar os produtos'));
  });
});
