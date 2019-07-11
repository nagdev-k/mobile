import React from 'react';
import {
  Text, View, TextInput, ScrollView, BackHandler,
} from 'react-native';
import { map, isEqual } from 'lodash';
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
  }

  componentDidMount() {
    const { messages } = this.state;
    const { actions, conversationId } = this.props;
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
      this.setState({ messages: [...messages] });
    });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  submitChatMessage = () => {
    const { message } = this.state;
    const { actions, conversationId, senderId } = this.props;
    const params = { message, conversationId, senderId };
    if (message !== '') {
      socket.emit('message', `${message}-${conversationId}${senderId}`);
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

  handleBackPress = () => {
    Actions.home({ type: 'reset' });
    return true;
  }

  render() {
    const { messages, prevMessages, height } = this.state;
    const { senderId, conversationId } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderView back hideAddUser title={this.props.reciever} />
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
            {/* {
                (isEqual(prevMessages.length, 0) && isEqual(messages.length, 0))
                && (
                  <View style={styles.newConvo}>
                    <Text style={{ color: 'black', fontSize: 15 }}>Start Conversation</Text>
                  </View>
                )
              }
              {map(prevMessages, (data, index) => (
                <View
                  key={index}
                  style={
                    [styles.textView,
                      isEqual(data.author, senderId) ? styles.senderView : styles.recieverView,
                    ]
                  }
                >
                  <Text style={isEqual(data.author, senderId) ? styles.text : styles.receiverText}>{data.message}</Text>
                </View>
              ))
              }
              {
                map(messages, (msg, index) => msg.includes(conversationId) && (
                  <View
                    key={index}
                    style={
                      [styles.textView,
                        msg.includes(senderId) ? styles.senderView : styles.recieverView,
                      ]
                    }
                  >
                    {
                      msg.includes(senderId)
                        ? <Text style={styles.text}>{msg.replace(`-${conversationId}${senderId}`, '')}</Text>
                        : <Text style={styles.receiverText}>{msg.substr(0, msg.lastIndexOf('-'))}</Text>
                    }
                  </View>
                ))
              } */}
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
              onPress={() => Actions.camera()}
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
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getMessages, saveMessage }, dispatch),
});

export default connect(null, mapDispatchToProps)(ChatScreen);
