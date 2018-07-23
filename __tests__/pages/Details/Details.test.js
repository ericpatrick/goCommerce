import React from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Details from 'pages/Details';
import { Creators as DetailsCreators } from 'store/ducks/details';
import { Creators as CartCreators } from 'store/ducks/cart';

describe('Testing Details component', () => {
  const mockStore = configureStore();

  const product = {
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
  };
  const details = {
    product: {
      ...product,
    },
    loading: false,
  };
  const cart = {
    purchaseList: [],
  };
  const navigation = {
    state: {
      params: {
        id: product.id,
      },
    },
    navigate: () => {},
    dispatch: () => {},
  };

  const defaultStore = mockStore({
    details,
    cart,
  });
  const defaultWrapper = shallow(
    <Details navigation={navigation} />,
    { context: { store: defaultStore } },
  );

  it('render as expected', () => {
    const innerComponent = defaultWrapper.dive();

    expect(innerComponent.find(View)).toHaveLength(3);
    expect(innerComponent.find(Image)).toHaveLength(1);
    expect(innerComponent.find(Text)).toHaveLength(4);
    expect(innerComponent.find(TouchableOpacity)).toHaveLength(1);
  });

  it('render without product', () => {
    const store = mockStore({
      details: {
        ...details,
        product: null,
      },
      cart,
    });
    const wrapper = shallow(
      <Details navigation={navigation} />,
      { context: { store } },
    );

    expect(wrapper.dive().type()).toBe(null);
  });

  it('render loading', () => {
    const store = mockStore({
      details: {
        ...details,
        loading: true,
      },
      cart,
    });
    const wrapper = shallow(
      <Details navigation={navigation} />,
      { context: { store } },
    );
    const innerComponent = wrapper.dive();

    expect(innerComponent.find(View)).toHaveLength(1);
    expect(innerComponent.find(ActivityIndicator)).toHaveLength(1);
  });

  it('can get product', () => {
    // É necessário fazer uma chamada ao componente para que os metodos
    // do ciclo de vida sejam chamados
    defaultWrapper.dive();

    const expectedAction = DetailsCreators.getProduct(product.id);
    expect(defaultStore.getActions()).toContainEqual(expectedAction);
  });

  it('cant add product to cart', () => {
    defaultWrapper
      .dive()
      .find(TouchableOpacity)
      .first()
      .simulate('press');

    const expectedAction = CartCreators.addToCart({
      ...product,
      amount: '1',
    }, -1);
    expect(defaultStore.getActions()).toContainEqual(expectedAction);
  });
});
