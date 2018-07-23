import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartCreators } from 'store/ducks/cart';

import { FlatList } from 'react-native';
import PurchaseItem from './components/PurchaseItem';

class PurchaseList extends Component {
  static propTypes = {
    chosenProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {};

  static state = {
    amount: 1,
  };

  getItemKey = item => String(item.id);

  renderProduct = ({ item }) => <PurchaseItem data={item} />;

  render() {
    const { chosenProducts } = this.props;
    if (!chosenProducts) return null;
    return (
      <FlatList
        data={this.props.chosenProducts}
        renderItem={this.renderProduct}
        keyExtractor={this.getItemKey}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(CartCreators, dispatch);
export default connect(null, mapDispatchToProps)(PurchaseList);
