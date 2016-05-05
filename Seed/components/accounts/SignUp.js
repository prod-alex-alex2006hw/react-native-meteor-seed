import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Navigator
} from 'react-native';

import styles from './_accountsStyles';

import Accounts from '../../config/db/accounts';
import Router from '../../config/router';
import {validateEmail} from '../../config/utils'

export default React.createClass({
  // Configuration
  displayName: 'Sign Up',

  // Initial State
  getInitialState() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },

  // Event Handlers
  handleSignUp() {
    this.setState({
      error: null
    })

    let { username, email, password} = this.state;

    if (!username || !email || !password)
      return this.setState({error: 'Please enter all fields.'});

    if (!validateEmail(email))
      return this.setState({error: 'Not a valid email'})

    Accounts.signUp(username, email, password).then( (result) => {
      console.log("Signed up successfully");
      this.props.navigator.resetTo(Router.getHome({user: {_id: result.userId}}))
    }, (err) => {
      Alert.alert("Error", err.reason)
    })
  },

  // Component Render
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign Up</Text>
        <TextInput
          ref='username'
          style={styles.input}
          placeholder="Username"
          autoFocus={true}
          onChangeText={(text) => this.setState({username: text})}
          />

        <TextInput
          ref='email'
          style={styles.input}
          placeholder="email address"
          onChangeText={(text) => this.setState({email: text})}
          />

        <TextInput
          ref='password'
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          />

        <TouchableOpacity
          onPress={this.handleSignUp}
          style={styles.button}
          >
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <Text style={styles.error}>{this.state.error}</Text>
      </View>
    );
  }
});
