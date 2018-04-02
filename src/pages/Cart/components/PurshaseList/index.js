import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartCreators } from 'store/ducks/cart';

import { View, FlatList, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Helpers from 'helpers';

import { colors } from 'styles';
import styles from './styles';

class PurchaseList extends Component {
  static propTypes = {
    chosenProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeProduct: PropTypes.func.isRequired,
    changeAmount: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  static state = {
    amount: 1,
  };

  renderProduct = ({ item }) => (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: item.image }}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>{Helpers.getCurrency(item.price)}</Text>
      </View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        style={styles.amount}
        underlineColorAndroid="rgba(0, 0, 0, 0)"
        value={item.amount}
        onChangeText={amount => this.props.changeAmount(item.id, amount)}
        onBlur={() => !item.amount && this.props.changeAmount(item.id, '1')}
      />
      <TouchableOpacity onPress={() => this.props.removeProduct(item.id)}>
        <Icon name="close" size={20} color={colors.darkGray} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { chosenProducts } = this.props;
    if (!chosenProducts) return null;
    return (
      <FlatList
        data={this.props.chosenProducts}
        renderItem={this.renderProduct}
        keyExtractor={item => String(item.id)}
      />
    );
  }
}

const mapDispatchTOProps = dispatch => bindActionCreators(CartCreators, dispatch);
export default connect(null, mapDispatchTOProps)(PurchaseList);
