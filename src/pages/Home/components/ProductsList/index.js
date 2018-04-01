import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import Helpers from 'helpers';

import { colors } from 'styles';
import styles from './styles';

class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    products: [],
  };

  static state = {};

  renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContanier}
      onPress={() => this.props.navigation.navigate('Details', { id: item.id })}
    >
      <Image
        style={styles.productImage}
        source={{ uri: item.image }}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
      <Text style={styles.productPrice}>{Helpers.getCurrency(item.price)}</Text>
    </TouchableOpacity>
  );

  renderList = products => (
    <View style={styles.listContainer}>
      <FlatList
        data={products}
        renderItem={this.renderProduct}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnContainer}
      />
    </View>
  );

  render() {
    const { products, loading } = this.props;
    return (
      <View style={styles.container}>
        { loading
          ? <ActivityIndicator size="large" color={colors.black} />
          : this.renderList(products)
        }
      </View>
    );
  }
}

export default withNavigation(ProductsList);
