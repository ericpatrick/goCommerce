import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Category from 'pages/Home/components/Menu/components/Category';
import { Creators as ProductsCreators } from 'store/ducks/products';

describe('Testing Category component', () => {
  const mockStore = configureStore();

  it('render as expected', () => {
    const store = mockStore({});

    const categoryItem = {
      id: 1,
      title: 'Camisetas',
      selected: true,
    };
    const wrapper = shallow(
      <Category data={categoryItem} />,
      { context: { store } },
    );

    expect(wrapper.dive().find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.dive().find(Text)).toHaveLength(1);
    expect(wrapper.dive().find(Text).prop('children')).toBe(categoryItem.title);
  });

  it('can change category', () => {
    const store = mockStore({});

    const categoryItem = {
      id: 1,
      title: 'Camisetas',
      selected: true,
    };
    const wrapper = shallow(
      <Category data={categoryItem} />,
      { context: { store } },
    );

    wrapper.dive().find(TouchableOpacity).simulate('press');
    const expectedAction = ProductsCreators.changeCategory(categoryItem.id);
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
