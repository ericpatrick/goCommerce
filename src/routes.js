import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from 'pages/Home';
import Details from 'pages/Details';
import Cart from 'pages/Cart';

import { colors } from 'styles';

const Routes = TabNavigator({
  Cart: { screen: Cart },
  Products: {
    screen: StackNavigator({
      Home: { screen: Home },
      Details: { screen: Details },
    }, {
      initialRouteName: 'Home',
    }),
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color={tintColor} />
      ),
    },
  },
}, {
  initialRouteName: 'Products',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.gray,
    style: {
      backgroundColor: colors.white,
    }
  },
});

export default Routes;
