import { StyleSheet } from 'react-native';
import { colors, general } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.header,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    ...general.headerTitle,
    flex: 0,
    fontWeight: 'bold',
  },
});

export default styles;
