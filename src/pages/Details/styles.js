import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.baseMargin * 2,
    padding: metrics.basePadding,
  },
  image: {
    height: 285,
    width: '100%',
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: metrics.baseMargin,
  },
  name: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 12,
    color: colors.darkGray,
  },
  price: {
    fontSize: 24,
    color: colors.secondary,
  },
  button: {
    height: 45,
    width: '100%',
    paddingTop: 12,
    backgroundColor: colors.secondary,
  },
  buttonLabel: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
