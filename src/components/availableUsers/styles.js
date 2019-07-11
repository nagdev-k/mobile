import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
    flex: 1,
    backgroundColor: colors.white,
  },
  noUserText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
