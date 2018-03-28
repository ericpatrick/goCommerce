import React from 'react';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import styles from './styles';

const Cart = () => (
  <View/>
);

Cart.navigationOptions = {
  title: 'Detalhes',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="shopping-cart" size={20} color={tintColor} />
  ),
};

export default Cart;
