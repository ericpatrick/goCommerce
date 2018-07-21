import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProductsCreators } from 'store/ducks/products';

import Category from './components/Category';
import styles from './styles';

class Menu extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {};

  getItemKey = item => String(item.id);

  renderCategories = ({ item }) => (<Category data={item} />);

  render() {
    const { categories } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={this.renderCategories}
          keyExtractor={this.getItemKey}
          horizontal
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ProductsCreators, dispatch);

export default connect(null, mapDispatchToProps)(Menu);
