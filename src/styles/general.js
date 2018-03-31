import metrics from './metrics';
import colors from './colors';

export default {
  box: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
  },
  header: {
    height: 54,
  },
  headerTitle: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    color: colors.primary,
  },
};
