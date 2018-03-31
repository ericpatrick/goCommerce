import React from 'react';

import { View } from 'react-native';
import TabIcon from 'components/TabIcon';

// import styles from './styles';

const Cart = () => (
  <View />
);

Cart.navigationOptions = {
  title: 'Detalhes',
  tabBarIcon: props => <TabIcon name="shopping-cart" {...props} />,
};

export default Cart;
