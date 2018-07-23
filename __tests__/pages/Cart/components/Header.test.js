import React from 'react';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import Header from 'pages/Cart/components/Header';

describe('Testing Header component', () => {
  it('render as expected', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).first().prop('children')).toBe('Carrinho');
  });
});
