import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as DetailsCreators } from 'store/ducks/details';
import { Creators as CartCreators } from 'store/ducks/cart';

import Helpers from 'helpers';
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
      navigate: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
    getProduct: PropTypes.func.isRequired,
    details: PropTypes.shape({
      product: PropTypes.object,
      loading: PropTypes.boolean,
    }).isRequired,
    cart: PropTypes.shape({
      purchaseList: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  static state = {};

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getProduct(id);
  }

  sendToCart = (product) => {
    const { purchaseList } = this.props.cart;
    const listedProduct = purchaseList.find(prod => prod.id === product.id);
    const [chosenProduct, index] = listedProduct
      ? [
        {
          ...listedProduct,
          amount: String(parseInt(listedProduct.amount, 10) + 1),
        },
        purchaseList.indexOf(listedProduct),
      ]
      : [
        {
          ...product,
          amount: '1',
        },
        -1,
      ];
    this.props.addToCart(chosenProduct, index);

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Cart');
  };

  renderDetails = () => {
    const { product } = this.props.details;
    if (!product) return null;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: product.image }}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <View style={styles.productInfo}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
          </View>
          <Text style={styles.price}>{Helpers.getCurrency(product.price)}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.sendToCart(product)} >
          <Text style={styles.buttonLabel}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderLoading = () => (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );

  render() {
    const { loading } = this.props.details;
    return loading
      ? this.renderLoading()
      : this.renderDetails();
  }
}

const mapStateToProps = state => ({
  details: state.details,
  cart: state.cart,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  ...DetailsCreators,
  ...CartCreators,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Details);
