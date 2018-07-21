import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Image, Text } from 'react-native';
import Helpers from 'helpers';

import styles from './styles';

const ProductItem = ({ data, selectProduct }) => (
  <TouchableOpacity
    style={styles.productContanier}
    onPress={() => selectProduct(data.id)}
  >
    <Image
      style={styles.productImage}
      source={{ uri: data.image }}
      resizeMode="contain"
    />
    <Text style={styles.productName}>{data.name}</Text>
    <Text style={styles.productBrand}>{data.brand}</Text>
    <Text style={styles.productPrice}>{Helpers.getCurrency(data.price)}</Text>
  </TouchableOpacity>
);

ProductItem.propTypes = {
  data: PropTypes.shape({
    selected: PropTypes.bool,
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  selectProduct: PropTypes.func.isRequired,
};

export default ProductItem;
