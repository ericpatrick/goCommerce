import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProductsCreators } from 'store/ducks/products';

import styles from './styles';

class Menu extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeCategory: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  renderCategories = ({ item }) => {
    const containerStyle = item.selected
      ? [styles.titleContainer, styles.titleContainerSelected]
      : styles.titleContainer;
    const titleStyle = item.selected ? [styles.title, styles.titleSelected] : styles.title;
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => this.props.changeCategory(item.id)}
      >
        <Text style={titleStyle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { categories } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={this.renderCategories}
          keyExtractor={item => String(item.id)}
          horizontal
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ProductsCreators, dispatch);

export default connect(null, mapDispatchToProps)(Menu);
