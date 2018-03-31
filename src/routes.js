import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Home from 'pages/Home';
import Details from 'pages/Details';
import Cart from 'pages/Cart';

import TabIcon from 'components/TabIcon';

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
      tabBarIcon: props => <TabIcon name="home" {...props} />,
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
      height: 54,
    },
  },
});

export default Routes;
