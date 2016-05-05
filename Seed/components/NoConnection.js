import React from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import Environment from '../config/environment.js';

export default React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {this.props.loaded ? "No connection :(" : "Loading..." }
        </Text>
        {Environment.env == 'stage' ?
          <Text style={styles.message}>Staging...</Text>
        :
          null
        }
        <Button
          style={styles.button}
          onPress={this.props.handlePress}
        >
        Try again
      </Button>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20
  },
  button: {
    marginTop: 10,
    margin: 10
  }
});
