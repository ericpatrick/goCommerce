import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProductsCreators } from 'store/ducks/products';

import styles from './styles';

const Category = ({ data, changeCategory }) => {
  const containerStyle = data.selected
    ? [styles.titleContainer, styles.titleContainerSelected]
    : styles.titleContainer;
  const titleStyle = data.selected ? [styles.title, styles.titleSelected] : styles.title;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => changeCategory(data.id)}
    >
      <Text style={titleStyle}>{data.title}</Text>
    </TouchableOpacity>
  );
};

Category.propTypes = {
  data: PropTypes.shape({
    selected: PropTypes.bool,
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  changeCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(ProductsCreators, dispatch);
export default connect(null, mapDispatchToProps)(Category);
