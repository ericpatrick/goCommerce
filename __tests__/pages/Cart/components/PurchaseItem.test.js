import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import PurchaseItem from 'pages/Cart/components/PurchaseList/components/PurchaseItem';
import Helpers from 'helpers';
import { Creators as CartCreators } from 'store/ducks/cart';

describe('Testing PurchaseItem component', () => {
  const mockStore = configureStore();
  const store = mockStore({});

  const data = {
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
    amount: '1',
  };

  it('render as expected', () => {
    const wrapper = shallow(
      <PurchaseItem data={data} />,
      { context: { store } },
    );
    const innerComponent = wrapper.dive();

    expect(innerComponent.find(View)).toHaveLength(2);
    expect(innerComponent.find(Text)).toHaveLength(3);
    expect(innerComponent.find(Image)).toHaveLength(1);
    expect(innerComponent.find(TextInput)).toHaveLength(1);
    expect(innerComponent.find(TouchableOpacity)).toHaveLength(1);
    expect(innerComponent.find(Icon)).toHaveLength(1);
    expect(innerComponent.find(Text).first().prop('children')).toBe(data.name);
    expect(innerComponent.find(Text).at(1).prop('children')).toBe(data.brand);
    expect(innerComponent.find(Text).last().prop('children')).toBe(Helpers.getCurrency(data.price));
  });

  it('can change amount of item', () => {
    const wrapper = shallow(
      <PurchaseItem data={data} />,
      { context: { store } },
    );

    wrapper.dive().find(TextInput).simulate('changeText', '2');

    expect(store.getActions()).toContainEqual(CartCreators.changeAmount(data.id, '2'));

    wrapper.setProps({
      data: {
        ...data,
        amount: null,
      },
    });
    wrapper.dive().find(TextInput).simulate('blur');
    expect(store.getActions()).toContainEqual(CartCreators.changeAmount(data.id, '1'));
  });

  it('can remove item', () => {
    const wrapper = shallow(
      <PurchaseItem data={data} />,
      { context: { store } },
    );

    wrapper.dive().find(TouchableOpacity).simulate('press');
    expect(store.getActions()).toContainEqual(CartCreators.removeProduct(data.id));
  });
});
