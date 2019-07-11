import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
    width: '50%',
    paddingLeft: 20,
  },
  btn: {
    color: colors.white,
    margin: 10,
    borderRadius: 50,
    fontSize: 20,
    backgroundColor: '#4e97e5',
  },
});

export default styles;
