import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.blue,
  },
  headerIcons: {
    fontSize: 25,
    color: colors.blue,
  },
  rightMenu: {
    position: 'absolute',
    right: '8.5%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    width: 200,
    top: '75%',
    zIndex: 9,
  },
  closeIcon: {
    padding: 10,
    fontSize: 20,
  },
});

export default styles;
