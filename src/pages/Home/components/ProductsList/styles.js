import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    maxHeight: metrics.screenHeight - 182,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: metrics.baseMargin,
  },
  listContainer: {
    width: '100%',
  },
  columnContainer: {
    marginHorizontal: metrics.baseMargin * 2,
    justifyContent: 'space-between',
    paddingTop: metrics.basePadding,
  },
});

export default styles;
