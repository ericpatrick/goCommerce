import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  productContanier: {
    ...general.box,
    flex: 1,
    maxWidth: (metrics.screenWidth - 50) / 2,
  },
  productImage: {
    height: 180,
  },
  productName: {
    fontSize: 14,
    color: colors.black,
  },
  productBrand: {
    fontSize: 11,
    color: colors.darkGray,
  },
  productPrice: {
    fontSize: 14,
    color: colors.secondary,
  },
});

export default styles;
