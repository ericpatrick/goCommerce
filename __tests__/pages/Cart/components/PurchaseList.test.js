import React from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import PurchaseList from 'pages/Cart/components/PurchaseList';

describe('Testing PurchaseList component', () => {
  const mockStore = configureStore();
  const store = mockStore({});
  const purchaseList = [
    {
      id: 1,
      name: 'Camiseta Hyperas Preta',
      brand: 'Quiksilver',
      image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
      price: 49.99,
      amount: 1,
    },
  ];

  it('render as expected', () => {
    const wrapper = shallow(
      <PurchaseList chosenProducts={purchaseList} />,
      { context: { store } },
    );
    const innerComponent = wrapper.dive();

    expect(innerComponent.find(FlatList)).toHaveLength(1);

    const componentInstance = innerComponent.instance();
    const param = {
      item: purchaseList[0],
    };
    const itemWrapper = shallow(
      componentInstance.renderProduct(param),
      { context: { store } },
    );

    expect(itemWrapper.name()).toBe('PurchaseItem');
    expect(componentInstance.getItemKey(param.item)).toBe(String(param.item.id));
  });

  it('render without products', () => {
    const wrapper = shallow(
      <PurchaseList chosenProducts={null} />,
      { context: { store } },
    );

    expect(wrapper.dive().type()).toBe(null);
  });
});
