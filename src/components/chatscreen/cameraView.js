import React, { PureComponent } from 'react';
import {
  TouchableOpacity, View, Image,
} from 'react-native';
import { Button } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadImage } from '../../state/chatscreen/operations';
import styles from './styles';

class CameraView extends PureComponent {
  state = { imageData: {}, flash: false, backCamera: true };

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.3,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ imageData: data });
    }
  }

  uploadImage = () => {
    const { imageData } = this.state;
    const {
      senderId, conversationId, reciever, actions,
    } = this.props;
    const params = {
      uri: imageData.uri,
      base64: imageData.base64,
      conversationId,
      senderId,
    };
    actions.uploadImage(params)
      .then(() => {
        Actions.chatScreen({
          senderId, conversationId, reciever,
        });
      });
  }

  previewImage = () => {
    const { imageData } = this.state;
    return (
      <View style={styles.container}>
        <Image source={{ uri: imageData.uri }} style={styles.preview} />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            style={{ borderRadius: 50, padding: 10, marginRight: 30 }}
            transparent
            onPress={() => this.setState({ imageData: {} })}
          >
            <AntDesign style={{ color: 'white', fontSize: 45 }} name="retweet" />
          </Button>
          <Button
            style={{ borderRadius: 50, padding: 10 }}
            transparent
            onPress={this.uploadImage}
          >
            <AntDesign style={{ color: 'white', fontSize: 45 }} name="check" />
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const { imageData, flash, backCamera } = this.state;
    if (!isEmpty(imageData)) {
      return this.previewImage();
    }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {this.camera = ref;}}
          style={styles.preview}
          type={backCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => this.setState(prev => ({ backCamera: !prev.backCamera }))} style={styles.capture}>
            <Ionicons name="md-reverse-camera" size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Entypo name="camera" size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState(prev => ({ flash: !prev.flash }))} style={styles.capture}>
            {
              flash
                ? <MaterialCommunityIcons name="flash" size={40} />
                : <MaterialCommunityIcons name="flash-off" size={40} />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CameraView.propTypes = {
  conversationId: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  reciever: PropTypes.string.isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ uploadImage }, dispatch),
});

export default connect(null, mapDispatchToProps)(CameraView);
