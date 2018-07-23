import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: metrics.baseMargin,
  },
  image: {
    height: 60,
    width: 60,
  },
  info: {
    marginRight: metrics.baseMargin * 2,
  },
  name: {
    fontSize: 14,
    color: colors.black,
  },
  brand: {
    fontSize: 11,
    color: colors.darkGray,
  },
  price: {
    fontSize: 14,
    color: colors.secondary,
  },
  amount: {
    width: 40,
    height: 40,
    marginRight: metrics.baseMargin,
    borderWidth: 1,
    borderColor: colors.darkGray,
    padding: metrics.baseMargin,
    textAlign: 'center',
  },
});

export default styles;
