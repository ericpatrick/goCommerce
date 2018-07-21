import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { colors } from 'styles';

import ProductItem from './components/ProductItem';
import styles from './styles';

class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  static defaultProps = {
    products: [],
    loading: false,
    navigation: {
      navigate: () => {},
    },
  };

  static state = {};

  getItemKey = item => String(item.id);

  goToDetails = id => this.props.navigation.navigate('Details', { id });

  renderProduct = ({ item }) => (<ProductItem data={item} selectProduct={this.goToDetails} />);
  // renderCategories = ({ item }) => (<Category data={item} />);

  renderList = products => (
    <View style={styles.listContainer}>
      <FlatList
        data={products}
        renderItem={this.renderProduct}
        keyExtractor={this.getItemKey}
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

export { ProductsList as ProductsListComponent };

export default withNavigation(ProductsList);
