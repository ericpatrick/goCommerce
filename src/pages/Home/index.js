import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProductsCreators } from 'store/ducks/products';
import { general } from 'styles';

import Menu from './components/Menu';
import ProductsList from './components/ProductsList';

class Home extends Component {
  static navigationOptions = {
    title: 'GoCommerce',
    headerTitleStyle: general.headerTitle,
    headerStyle: general.header,
  };

  static propTypes = {
    products: PropTypes.shape({
      categories: PropTypes.arrayOf(PropTypes.object),
      productsByCategory: PropTypes.object,
      loading: PropTypes.object,
    }).isRequired,
    initializeHome: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.initializeHome();
  }

  render() {
    const { categories, productsByCategory, loading } = this.props.products;
    if (categories.length === 0) return null;

    const [{ id }] = categories.filter(x => x.selected);
    const products = productsByCategory.get(id);
    return (
      <Fragment>
        <Menu categories={categories} />
        <ProductsList products={products} loading={loading.products} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ products: state.products });

const mapDispatchToProps = dispatch => bindActionCreators(ProductsCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
