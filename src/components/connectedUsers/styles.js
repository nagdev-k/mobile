import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
    flex: 1,
    backgroundColor: colors.white,
  },
  availableUsersBtn: {
    backgroundColor: colors.green,
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    left: '45%',
  },
  logoutBtn: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  availableUsersText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
  },
  noUserText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.darkgrey,
    padding: 10,
  },
});

export default styles;
