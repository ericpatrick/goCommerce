import React from 'react';
import { connect } from 'react-redux';
import { Selectors as CartSelectors} from 'store/ducks/cart';

import { View, Text } from 'react-native';
import TabIcon from 'components/TabIcon';

import Helpers from 'helpers';

import Header from './components/Header';
import PurchaseList from './components/PurshaseList';

import styles from './styles';

const Cart = ({ purchaseList, subtotal }) => {
  // console.tron.log(purchaseList);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.listContainer}>
        { purchaseList.length === 0
          ? <Text style={styles.emptyText}>Nenhum item adicionado ao carrinho</Text>
          : <PurchaseList chosenProducts={purchaseList} />
        }
      </View>
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalTitle}>Subtotal</Text>
        <Text style={styles.subtotalValue}>{Helpers.getCurrency(subtotal)}</Text>
      </View>
    </View>
  );
};

Cart.navigationOptions = {
  title: 'Detalhes',
  tabBarIcon: props => <TabIcon name="shopping-cart" {...props} />,
};

const mapStateToProps = state => ({
  purchaseList: state.cart.purchaseList,
  subtotal: CartSelectors.subtotalSelector(state.cart),
});
export default connect(mapStateToProps)(Cart);
