import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { map, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import baseUrl from '../../constants/baseUrl';
import styles from './styles';

class RenderMessages extends React.Component {
  render() {
    const {
      senderId, conversationId, messages, prevMessages,
    } = this.props;
    return (
      <View>
        {
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
            {
              data.isFile
                ? (
                  <ImageBackground
                    source={{ uri: `${baseUrl}/${data.message}` }}
                    style={styles.chatImages}
                  >
                    <Button
                      transparent
                      block
                      onPress={() => Actions.image({ url: `${baseUrl}/${data.message}` })}
                    >
                      <MaterialCommunityIcons name="open-in-new" size={35} />
                    </Button>
                  </ImageBackground>
                )
                : <Text style={isEqual(data.author, senderId) ? styles.text : styles.receiverText}>{data.message}</Text>
            }
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
        }
      </View>
    );
  }
}

RenderMessages.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired,
  prevMessages: PropTypes.instanceOf(Array).isRequired,
  conversationId: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
};


export default RenderMessages;
