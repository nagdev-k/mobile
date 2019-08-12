import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { isEqual, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import socket from '../../constants/socket';
import HeaderView from '../layout/header';
import RenderChats from './renderChats';
import { getChatsOperation, findConversation } from '../../state/availableusers/operations';
import { signoutAction } from '../../state/auth/actions';
import styles from './styles';

class ConnectedUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isEmptyText: false,
    };
  }

  componentDidMount() {
    const { users } = this.state;
    const { actions, _id } = this.props;
    socket.on('receiver', (recieverId) => {
      if (!isEqual(_id, recieverId)) {
        actions.getChatsOperation({ senderId: _id, newUser: true })
          .then((res) => {
            if (isEmpty(res)) {
              this.setState({ isEmptyText: true });
            }
            this.setState({ users: [...users, ...res], isEmptyText: false });
          });
      }
    });
    actions.getChatsOperation({ senderId: _id, newUser: false })
      .then((res) => {
        if (isEmpty(res)) {
          this.setState({ isEmptyText: true });
        }
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
        Actions.chatScreen({
          reciever, senderId: _id, conversationId: res[0]._id, recieverId
        });
      });
  }

  logoutUser = () => {
    this.props.actions.signoutAction();
    Actions.login({ type: 'reset' });
  }

  renderItem = ({ item }) => {
    const { username, newUserMessage } = this.props;
    if (isEqual(username, item.username)) {
      return null;
    }
    return (
      <RenderChats item={item} isNew={newUserMessage.findIndex(e => e.username === item.username)} startConversation={this.startConversation} />
    );
  }

  render() {
    const { users, isEmptyText } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <HeaderView title="Chats" />
        <View style={styles.mainView}>
          {
            isEmptyText
              && (
                <View style={styles.noUserText}>
                  <Text>No Chats Available, Start a new Chat</Text>
                </View>
              )
            }
          <FlatList
            data={users}
            renderItem={this.renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    );
  }
}

ConnectedUsers.propTypes = {
  actions: PropTypes.shape({
    getChatsOperation: PropTypes.func.isRequired,
    findConversation: PropTypes.func.isRequired,
    signoutAction: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  newUserMessage: PropTypes.instanceOf(Array).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getChatsOperation,
    findConversation,
    signoutAction,
  }, dispatch),
});

const mapStateToProps = state => ({
  newUserMessage: state.newUserMessagReducer.newUserMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedUsers);
