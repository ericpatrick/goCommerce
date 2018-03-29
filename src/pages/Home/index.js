import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProductsCreators } from 'store/ducks/products';

import { FlatList, Text, View } from 'react-native';

import styles from './styles';
import { colors } from 'styles';

class Home extends Component {
  static navigationOptions = {
    title: "GoCommerce",
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
      color: colors.primary,
    },
  };

  componentWillMount() {
    this.props.initializeHome();
  }

  renderCategories = ({ item }) => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  render() {
    const { categories } = this.props.products;
    return(
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

const mapStateToProps = state => ({ products: state.products });

const mapDispatchToProps = dispatch => bindActionCreators(ProductsCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
