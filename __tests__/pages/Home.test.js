import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Home from 'pages/Home';
import Menu from 'pages/Home/components/Menu';
import ProductsList from 'pages/Home/components/ProductsList';

const mockStore = configureStore();

const initialState = {
  products: {
    categories: [
      {
        id: 1,
        title: 'Camisetas',
        selected: true,
      },
    ],
    productsByCategory: new Map().set(
      1,
      [{
        id: 1,
        name: 'Camiseta Hyperas Preta',
        brand: 'Quiksilver',
        image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
        price: 49.99,
      }],
    ),
    error: '',
    loading: {
      categories: false,
      products: false,
    },
  },
};

describe('Testing Home component', () => {
  const store = mockStore(initialState);

  it('Render as expected', () => {
    const wrapper = shallow(
      <Home />,
      { context: { store } },
    );
    const productsState = initialState.products;
    const products = productsState.productsByCategory.get(1);

    expect(wrapper.dive().contains(<Menu categories={productsState.categories} />))
      .toBe(true);
    expect(wrapper.dive().contains(<ProductsList
      products={products}
      loading={productsState.loading.products}
    />)).toBe(true);
  });

  it('Render with empty state', () => {

  });
});
