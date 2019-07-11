import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
    flex: 1,
    margin: 10,
    backgroundColor: colors.white,
  },
  messageView: {
    flex: 1,
    borderColor: colors.black,
    padding: 5,
  },
  textView: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  recieverView: {
    alignItems: 'flex-start',
  },
  senderView: {
    alignItems: 'flex-end',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 17,
    color: colors.black,
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    padding: 10,
    borderColor: colors.white,
  },
  messageBox: {
    borderWidth: 1,
    borderColor: colors.black,
    width: '70%',
    margin: 10,
    fontSize: 20,
    height: 50,
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  messageBoxView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  sendBtn: {
    marginTop: 10,
    backgroundColor: colors.blue,
  },
  receiverText: {
    backgroundColor: colors.blue,
    fontSize: 17,
    color: colors.white,
    borderRadius: 20,
    padding: 10,
  },
  headerView: {
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.black,
  },
  newConvo: {
    marginLeft: '30%',
    alignItems: 'center',
    backgroundColor: '#ffeec4',
    width: '40%',
    borderRadius: 10,
    borderWidth: 0,
    padding: 3,
  },
  cameraBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
    borderWidth: 0,
  },
  chatImages: {
    flex: 1,
    height: 100,
    width: 100,
    justifyContent: 'center',
    opacity: 0.5,
  },
});

export default styles;
