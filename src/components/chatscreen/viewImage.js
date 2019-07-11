import React from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const ViewImage = props => (
  <Image source={{ uri: props.url }} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }} />
);

ViewImage.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ViewImage;
