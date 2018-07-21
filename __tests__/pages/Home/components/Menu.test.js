import React from 'react';
import { FlatList, View } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Menu from 'pages/Home/components/Menu';

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

describe('Testing Menu component', () => {
  it('Render with state', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <Menu />,
      { context: { store } },
    );

    // console.log(wrapper.dive().debug());

    expect(wrapper.dive().children).toHaveLength(1);
    expect(wrapper.dive().find(FlatList)).toHaveLength(1);
    expect(wrapper.dive().find(View)).toHaveLength(1);

    const componetInstance = wrapper.dive().instance();
    const param = {
      item: initialState.products.categories[0],
    };
    const categoryWrapper = shallow(
      componetInstance.renderCategories(param),
      { context: { store } },
    );

    expect(categoryWrapper.name()).toBe('Category');

    const { getItemKey } = componetInstance;

    expect(getItemKey(param.item)).toBe(String(param.item.id));
  });
});
