import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

class HomeScreen extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    if (user !== undefined && isEmpty(user)) {
      setTimeout(() => Actions.login({ type: 'reset' }), 1);
    } else {
      setTimeout(() => Actions.connectedUsers({ _id: user._id, username: user.username, type: 'reset' }), 1);
    }
  }

  render() {
    return <ActivityIndicator />;
  }
}

HomeScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

export default connect(mapStateToProps)(HomeScreen);
