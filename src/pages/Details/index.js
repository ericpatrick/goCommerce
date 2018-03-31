import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as DetailsCreators } from 'store/ducks/details';

import numeral from 'numeral';
import { colors, general } from 'styles';

import styles from './styles';

class Details extends Component {
  static navigationOptions = {
    title: 'Detalhes do Produto',
    headerTitleStyle: general.headerTitle,
    headerStyle: general.header,
  };
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.number,
        }),
      }),
    }).isRequired,
    getProduct: PropTypes.func.isRequired,
    details: PropTypes.shape({
      product: PropTypes.object,
      loading: PropTypes.boolean,
    }).isRequired,
  };

  static defaultProps = {};

  static state = {};

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getProduct(id);
  }

  renderDetails = () => {
    const { product } = this.props.details;
    if (!product) return null;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.info}>
          <View style={styles.productInfo}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
          </View>
          <Text style={styles.price}>{numeral(product.price).format('$0,0.00')}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonLabel}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { loading } = this.props.details;
    return loading
      ? <View> <ActivityIndicator size="large" color={colors.black} /> </View>
      : this.renderDetails();
  }
}

const mapStateToProps = state => ({ details: state.details });
const mapDispatchToProps = dispatch => bindActionCreators(DetailsCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Details);
