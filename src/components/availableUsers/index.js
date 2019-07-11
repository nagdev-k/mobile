import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import RenderChats from '../connectedUsers/renderChats';
import { getUsersOperation, findConversation } from '../../state/availableusers/operations';
import { signoutAction } from '../../state/auth/actions';
import styles from './styles';
import HeaderView from '../layout/header';

class AvailableUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const { users } = this.state;
    const { actions } = this.props;
    actions.getUsersOperation()
      .then((res) => {
        this.setState({ users: [...users, ...res] });
      })
      .catch((error) => {
        console.log('error in axios', error);
      });
  }

  startConversation = (recieverId, reciever) => {
    const { actions, _id } = this.props;
    actions.findConversation({ senderId: _id, recieverId })
      .then((res) => {
        if (!Array.isArray(res)) {
          Actions.chatScreen({
            reciever, senderId: _id, conversationId: res._id,
          });
        } else {
          Actions.chatScreen({
            reciever, senderId: _id, conversationId: res[0]._id,
          });
        }
      });
  }

  renderItem = ({ item }) => {
    const { username } = this.props;
    if (isEqual(username, item.username)) {
      return null;
    }
    return (
      <RenderChats item={item} startConversation={this.startConversation} />
    );
  }

  render() {
    const { users } = this.state;
    return (
      <View style={styles.mainView}>
        <HeaderView hideAddUser back title="Available Users" />
        {!isEqual(users.length, 1)
          ? (
            <FlatList
              data={users}
              renderItem={this.renderItem}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <View style={styles.noUserText}>
              <Text> No user available.</Text>
            </View>
          )
        }
      </View>
    );
  }
}

AvailableUsers.propTypes = {
  actions: PropTypes.shape({
    getUsersOperation: PropTypes.func.isRequired,
    findConversation: PropTypes.func.isRequired,
    signoutAction: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUsersOperation,
    findConversation,
    signoutAction,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(AvailableUsers);
