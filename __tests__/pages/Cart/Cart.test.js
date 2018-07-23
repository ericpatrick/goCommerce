import React from 'react';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Cart from 'pages/Cart';
import Header from 'pages/Cart/components/Header';
import PurchaseList from 'pages/Cart/components/PurchaseList';
import Helpers from 'helpers';

describe('Testing Cart component', () => {
  const mockStore = configureStore();
  const cart = {
    purchaseList: [
      {
        id: 1,
        name: 'Camiseta Hyperas Preta',
        brand: 'Quiksilver',
        image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
        price: 49.99,
        amount: 1,
      },
    ],
  };

  it('render as expected', () => {
    const store = mockStore({
      cart,
    });
    const wrapper = shallow(
      <Cart />,
      { context: { store } },
    );
    const subtotal = wrapper.prop('subtotal');
    const innerComponent = wrapper.dive();

    expect(innerComponent.find(View)).toHaveLength(3);
    expect(innerComponent.find(Text)).toHaveLength(2);
    expect(innerComponent.find(Header)).toHaveLength(1);
    expect(innerComponent.find(PurchaseList)).toHaveLength(1);
    expect(subtotal).toBe(49.99);
    expect(innerComponent.find(Text).first().prop('children')).toBe('Subtotal');

    const formattedSubtotal = Helpers.getCurrency(subtotal);
    expect(innerComponent.find(Text).last().prop('children')).toBe(formattedSubtotal);
  });

  it('render with empty list', () => {
    const store = mockStore({
      cart: {
        purchaseList: [],
      },
    });
    const wrapper = shallow(
      <Cart />,
      { context: { store } },
    );
    const innerComponent = wrapper.dive();
    const subtotal = wrapper.prop('subtotal');

    expect(innerComponent.find(Text)).toHaveLength(3);
    expect(subtotal).toBe(0);
    expect(innerComponent.find(Text).first().prop('children')).toBe('Nenhum item adicionado ao carrinho');

    const formattedSubtotal = Helpers.getCurrency(subtotal);
    expect(innerComponent.find(Text).last().prop('children')).toBe(formattedSubtotal);
  });

  it('can render TabIcon', () => {
    const param = {
      name: 'shopping-cart',
      tintColor: 'black',
    };
    const wrapper = shallow(Cart.navigationOptions.tabBarIcon(param));

    expect(wrapper.name()).toBe('Icon');
  });
});
