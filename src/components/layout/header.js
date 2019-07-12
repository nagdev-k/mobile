import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual } from 'lodash';

import { signoutAction } from '../../state/auth/actions';
import styles from './styles';

class HeaderView extends React.Component {
  state = { isCardActive: false };

  logoutUser = () => {
    this.setState({ isCardActive: false });
    this.props.actions.signoutAction();
    Actions.login({ type: 'reset' });
  }

  backPress= () => {
    if (isEqual(Actions.currentScene, 'chatScreen')) {
      Actions.connectedUsers({ type: 'reset', username: this.props.user.username, _id: this.props.user._id });
    } else {
      Actions.pop();
    }
  }

  render() {
    const { isCardActive } = this.state;
    const {
      user, title, back, hideAddUser,
    } = this.props;
    return (
      <View>
        <View style={styles.headerView}>
          {
            back
              && (
                <TouchableOpacity>
                  <AntDesign name="back" style={styles.headerIcons} onPress={() => this.backPress()} />
                </TouchableOpacity>
              )
          }
          <Text style={styles.headerText}>{title}</Text>
          <View style={{ flexDirection: 'row' }}>
            {!hideAddUser && (
              <AntDesign
                name="adduser"
                style={styles.headerIcons}
                onPress={() => Actions.availableUsers({ username: user.username, _id: user._id })}
              />
            )}
            <Text>{'    '}</Text>
            <Entypo name="dots-three-vertical" onPress={() => this.setState(prevState => ({ isCardActive: !prevState.isCardActive }))} style={styles.headerIcons} />
          </View>
        </View>
        {
          isCardActive && (
            <View style={styles.rightMenu}>
              <TouchableOpacity
                onPress={() => this.logoutUser()}
              >
                <Text style={{ padding: 10, flex: 1 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    );
  }
}

HeaderView.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.shape({
    signoutAction: PropTypes.func.isRequired,
  }).isRequired,
  back: PropTypes.bool,
  hideAddUser: PropTypes.bool,
};

HeaderView.defaultProps = {
  back: false,
  hideAddUser: false,
};

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signoutAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
