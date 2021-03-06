import React from 'react';
import {
  View, TextInput, ScrollView, Alert,
} from 'react-native';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import HeaderView from '../layout/header';
import { getMessages, saveMessage } from '../../state/chatscreen/operations';
import socket from '../../constants/socket';
import styles from './styles';
import RenderMessages from './renderMessages';
import NotifService from '../notifications/NotifService';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      prevMessages: [],
      height: 50,
      flag: false,
    };
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  componentDidMount() {
    const { messages } = this.state;
    const {
      actions, conversationId, senderId, reciever,
    } = this.props;
    const params = { conversationId };
    actions.getMessages(params)
      .then((res) => {
        this.setState({ prevMessages: res },
          () => {
            this._scrollView.scrollToEnd({ animated: true });
          });
      });
    socket.on('new_message', (msg) => {
      messages.push(msg);
      if (!msg.includes(senderId)) {
        this.notif.localNotif(msg.substr(0, msg.lastIndexOf('-')), reciever);
      }
      this.setState({ messages: [...messages] });
    });
  }

  submitChatMessage = () => {
    const { message } = this.state;
    const {
      actions, conversationId, senderId,
      // recieverId,
    } = this.props;
    const params = { message, conversationId, senderId };
    if (message !== '') {
      socket.emit('message', `${message}-${conversationId}${senderId}`);
      // socket.emit('newConversation', recieverId);
      actions.saveMessage(params)
        .then(() => {
          this.setState({ flag: true });
        });
    }
    this.setState({ message: '' });
  }

  updateSize = (height) => {
    if (height < 150) this.setState({ height });
  }

  onRegister = (token) => {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif = (notif) => {
    console.log(notif);
  }

  render() {
    const { messages, prevMessages, height } = this.state;
    const {
      senderId, conversationId, reciever,
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderView back hideAddUser title={reciever} showLogout={false} />
        <View style={styles.mainView}>
          <ScrollView
            style={styles.messageView}
            ref={component => this._scrollView = component}
            onContentSizeChange={() => {
              this._scrollView.scrollToEnd({ animated: true });
            }}
          >
            <RenderMessages
              senderId={senderId}
              conversationId={conversationId}
              messages={messages}
              prevMessages={prevMessages}
            />
          </ScrollView>
          <View style={styles.messageBoxView}>
            <TextInput
              name="message"
              value={this.state.message}
              onChangeText={message => this.setState({ message })}
              placeholder="Type Here"
              multiline
              style={[styles.messageBox, { height }]}
              onContentSizeChange={e => this.updateSize(e.nativeEvent.contentSize.height)}
            />
            <Button
              style={[styles.sendBtn, styles.cameraBtn]}
              onPress={() => Actions.camera({ senderId, conversationId, reciever })}
            >
              <Icon name="md-camera" color="white" size={25} />
            </Button>
            <Button
              style={[styles.sendBtn, { padding: 10, borderWidth: 1, borderRadius: 50 }]}
              onPress={() => this.submitChatMessage()}
            >
              <Icon name="md-send" color="white" size={25} />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

ChatScreen.propTypes = {
  reciever: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    getMessages: PropTypes.func.isRequired,
    saveMessage: PropTypes.func.isRequired,
  }).isRequired,
  conversationId: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  // recieverId: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getMessages, saveMessage }, dispatch),
});

export default connect(null, mapDispatchToProps)(ChatScreen);
