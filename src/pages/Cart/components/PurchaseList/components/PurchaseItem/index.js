import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartCreators } from 'store/ducks/cart';

import Helpers from 'helpers';

import { colors } from 'styles';
import styles from './styles';

const PurchaseItem = ({ data, changeAmount, removeProduct }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={{ uri: data.image }}
      resizeMode="contain"
    />
    <View style={styles.info}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.brand}>{data.brand}</Text>
      <Text style={styles.price}>{Helpers.getCurrency(data.price)}</Text>
    </View>
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="numeric"
      style={styles.amount}
      underlineColorAndroid="rgba(0, 0, 0, 0)"
      value={data.amount}
      onChangeText={amount => changeAmount(data.id, amount)}
      onBlur={() => !data.amount && changeAmount(data.id, '1')}
    />
    <TouchableOpacity onPress={() => removeProduct(data.id)}>
      <Icon name="close" size={20} color={colors.darkGray} />
    </TouchableOpacity>
  </View>
);

PurchaseItem.propTypes = {
  data: PropTypes.shape(PropTypes.object).isRequired,
  removeProduct: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(CartCreators, dispatch);
export default connect(null, mapDispatchToProps)(PurchaseItem);
