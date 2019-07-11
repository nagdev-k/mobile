import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import AvailableUsers from './components/availableUsers';
import Login from './components/login';
import ChatScreen from './components/chatscreen';
import CameraView from './components/chatscreen/cameraView';
import ViewImage from './components/chatscreen/viewImage';
import Home from './components/home';
import ConnectedUsers from './components/connectedUsers';

class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="home" component={Home} hideNavBar initial />
          <Scene key="login" component={Login} hideNavBar title="Login" />
          <Scene key="chatScreen" hideNavBar component={ChatScreen} />
          <Scene key="availableUsers" component={AvailableUsers} hideNavBar title="Available Users" />
          <Scene key="connectedUsers" component={ConnectedUsers} hideNavBar />
          <Scene key="camera" component={CameraView} hideNavBar />
          <Scene key="image" component={ViewImage} />
        </Stack>
      </Router>
    );
  }
}

export default Navigation;
