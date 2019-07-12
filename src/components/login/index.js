import React from 'react';
import {
  View, TextInput, Alert,
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import signInOperation from '../../state/auth/operations';
import styles from './styles';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (Object.entries(user).length !== 0) {
      Actions.connectedUsers({ _id: user._id, username: user.username, type: 'reset' });
    }
  }

  userLogin = () => {
    const { username } = this.state;
    const { actions } = this.props;
    const params = { username };
    actions.signInOperation(params)
      .then((res) => {
        if (isEqual(res[1], undefined)) {
          Actions.connectedUsers({ res, type: 'reset' });
        } else {
          Alert.alert(
            '',
            'Username already taken. Would you like to continue with this user ?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => Actions.connectedUsers({ _id: res[0]._id, username: res[0].username, type: 'reset' }) },
            ],
            { cancelable: false },
          );
        }
      })
      .catch((error) => {
        console.log('error in axios', error);
      });
    this.setState({ username: '' });
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.textinputView}>
          <TextInput
            name="Username"
            value={username}
            onChangeText={name => this.setState({ username: name })}
            placeholder="Username"
            style={styles.textInput}
          />
          <Button style={styles.btn} onPress={this.userLogin}>
            <EvilIcons name="chevron-right" size={50} />
          </Button>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  actions: PropTypes.shape({
    signInOperation: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signInOperation }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
