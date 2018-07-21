import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ProductsListComponent } from 'pages/Home/components/ProductsList';

describe('Testing ProductList', () => {
  const products = [{
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
  }];

  it('render as expected', () => {
    const wrapper = shallow(<ProductsListComponent products={products} loading={false} />);

    expect(wrapper.find(View)).toHaveLength(2);
    expect(wrapper.find(FlatList)).toHaveLength(1);

    const componetInstance = wrapper.instance();
    const param = {
      item: products[0],
    };
    const categoryWrapper = shallow(componetInstance.renderProduct(param));

    expect(categoryWrapper.name()).toBe('TouchableOpacity');

    const { getItemKey } = componetInstance;

    expect(getItemKey(param.item)).toBe(String(param.item.id));
  });

  it('render loading', () => {
    const wrapper = shallow(<ProductsListComponent products={products} loading />);

    expect(wrapper.find(ActivityIndicator)).toHaveLength(1);
  });

  it('can navigate to Details', () => {
    const navigateSpy = sinon.spy();
    const wrapper = shallow(<ProductsListComponent
      products={products}
      navigation={{ navigate: navigateSpy }}
    />);

    wrapper.instance().goToDetails(products[0].id);

    expect(navigateSpy.withArgs('Details', { id: products[0].id }).calledOnce).toBe(true);
  });
});
