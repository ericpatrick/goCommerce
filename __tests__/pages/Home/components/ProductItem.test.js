import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ProductItem from 'pages/Home/components/ProductsList/components/ProductItem';

describe('Testing ProductItem component', () => {
  const product = {
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
  };

  it('render as expected', () => {
    const wrapper = shallow(<ProductItem data={product} selectProduct={() => {}} />);

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Image)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(3);
  });

  it('can select product', () => {
    const selectProductSpy = sinon.spy();
    const wrapper = shallow(<ProductItem data={product} selectProduct={selectProductSpy} />);

    wrapper.simulate('press');

    expect(selectProductSpy.withArgs(product.id).calledOnce).toBe(true);
  });
});
