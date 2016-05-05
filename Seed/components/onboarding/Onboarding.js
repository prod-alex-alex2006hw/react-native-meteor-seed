import React, {
  StyleSheet,
  View,
  Text,
  Image,
  Navigator,
} from 'react-native';

import OnboardingPage from './OnboardingPage';
import SimpleTabBar from './SimpleTabBar';

import Accounts from '../../config/db/accounts';
import Router from '../../config/router';

export default React.createClass({
  handlePressDigitLogin() {
    // console.log('onboarding: handlePressDigitLogin')
    this.props.navigator.push(Router.getDigitLogin(this.props))
  },
  handlePressSignUp() {
    this.props.navigator.push(Router.getSignUp())
  },
  handlePressSignIn() {
    this.props.navigator.push(Router.getSignIn())
  },
  render() {
    // console.log('onboarding: render : props :', this.props)
    // console.log('onboarding: render : navigator.props.deviceInfo :', this.props.navigator.props.deviceInfo)

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text onPress={this.handlePressDigitLogin} style={styles.text}>
            <Image style={styles.image} onPress={this.handlePressDigitLogin} source={require('../../images/PL/pl-logo-wht-grn-bck1024.png')}></Image>
          </Text>
        </View>
      </View>
    )
  }
})

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#5eba46'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderColor: '#5eba46',
    backgroundColor: '#5eba64',
  },
  text: {
        color: 'white',
  },
  image: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100
  }
}
