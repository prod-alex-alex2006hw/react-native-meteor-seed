'use strict'

import React, {
  Component,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');
import Button from 'apsl-react-native-button';

import Accounts from '../config/db/accounts';

export default React.createClass({
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>TinderChatCrud</Text>
        <TouchableOpacity style={styles.button} onPress={()=> Accounts.signOut()}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
    marginTop: 16,
    width: window.width * 2 / 3,
    height: window.height,
    paddingTop: 20
  },
  title: {
    fontSize: 30,
    color: "#eee",
    textAlign: 'center',
    paddingBottom: 20
  },
  button: {
    padding: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#eee'
  }
})
