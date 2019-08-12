import React from 'react';
import { View, Image } from 'react-native';
import { ListItem, Text } from 'native-base';
import { PropTypes } from 'prop-types';
import {
  a, b, c, d, e, f, g, h, j, k, l, m, n, p, s, r, t, u, v, y, user,
} from '../../constants/images';

import styles from './styles';

class RenderChats extends React.Component {
  userLogo = (name) => {
    switch (name) {
      case 'a':
        return <Image source={a} style={{ width: 50, height: 50 }} />;
      case 'b':
        return <Image source={b} style={{ width: 50, height: 50 }} />;
      case 'c':
        return <Image source={c} style={{ width: 50, height: 50 }} />;
      case 'd':
        return <Image source={d} style={{ width: 50, height: 50 }} />;
      case 'e':
        return <Image source={e} style={{ width: 50, height: 50 }} />;
      case 'f':
        return <Image source={f} style={{ width: 50, height: 50 }} />;
      case 'g':
        return <Image source={g} style={{ width: 50, height: 50 }} />;
      case 'h':
        return <Image source={h} style={{ width: 50, height: 50 }} />;
      case 'j':
        return <Image source={j} style={{ width: 50, height: 50 }} />;
      case 'k':
        return <Image source={k} style={{ width: 50, height: 50 }} />;
      case 'l':
        return <Image source={l} style={{ width: 50, height: 50 }} />;
      case 'm':
        return <Image source={m} style={{ width: 50, height: 50 }} />;
      case 'n':
        return <Image source={n} style={{ width: 50, height: 50 }} />;
      case 'p':
        return <Image source={p} style={{ width: 50, height: 50 }} />;
      case 'r':
        return <Image source={r} style={{ width: 50, height: 50 }} />;
      case 's':
        return <Image source={s} style={{ width: 50, height: 50 }} />;
      case 't':
        return <Image source={t} style={{ width: 50, height: 50 }} />;
      case 'u':
        return <Image source={u} style={{ width: 50, height: 50 }} />;
      case 'v':
        return <Image source={v} style={{ width: 50, height: 50 }} />;
      case 'y':
        return <Image source={y} style={{ width: 50, height: 50 }} />;
      default:
        return <Image source={user} style={{ width: 50, height: 50 }} />;
    }
  }

  render() {
    const { item, startConversation } = this.props;
    return (
      <ListItem style={{ borderBottomWidth: 0 }} onPress={() => startConversation(item._id, item.username)}>
        {this.userLogo(item.username[0].toLowerCase())}
        <View style={styles.username}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 15 }}>{`  ${item.username}`}</Text>
          <View style={{ width: '100%' }} />
        </View>
      </ListItem>
    );
  }
}

RenderChats.propTypes = {
  startConversation: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};

export default RenderChats;
