import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: colors.primary,
    paddingHorizontal: metrics.basePadding,
    width: '100%',
  },
  titleContainer: {
    flex: 1,
    borderBottomWidth: 5,
    borderBottomColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: metrics.basePadding,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  }
});

export default styles;
