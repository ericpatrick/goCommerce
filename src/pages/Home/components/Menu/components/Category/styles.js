import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: metrics.basePadding,
  },
  titleContainerSelected: {
    borderBottomWidth: 5,
    borderBottomColor: colors.white,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.transparentWhite,
  },
  titleSelected: {
    color: colors.white,
  },
});

export default styles;
