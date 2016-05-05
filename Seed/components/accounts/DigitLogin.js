
'use strict';

var React = require('react-native');
var DigitsManager = require("react-native").NativeModules.DigitsManager;

import Accounts from '../../config/db/accounts';
import Router from '../../config/router';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

exports = module.exports = React.createClass({
  getInitialState: function() {
      var digitAppearance = {
          backgroundColor: {
            hex: "#ffffff",
            alpha: 1.0
          },
          accentColor: {
            hex: "#43a16f",
            alpha: 0.7
          },
          headerFont: {
            name: "Arial",
            size: 16
          },
          labelFont: {
            name: "Helvetica",
            size: 18
          },
          bodyFont: {
            name: "Helvetica",
            size: 16
          }
    }
    return {
     digitLoginOptions: {
        title: "Pointlook",
          phoneNumber: "",
          appearance: digitAppearance
      },
      digitLoginText: 'This is the disclaimer that you will have to agree to.  Auto-upload of your device content to Pointlook cloud storage.'
    }
  },

  handleDigitLogin(error, response) {
    if (error) this.handleDigitCancel();
    console.log('handleDigitLogin: response: ', response)
    this.props.navigator.push(Router.getHome(this.props))
  },

  handleDigitCancel(error) {
    console.log('handleDigitCancel: ', error)
    this.props.navigator.pop()
    // this.props.navigator.resetTo(Router.getOnboarding(this.props))
  },

  buttonPressed() {
    DigitsManager.launchAuthentication(this.state.digitLoginOptions).then((responseData) => {
      console.log("buttonPressed: Login Successful", responseData);
      this.handleDigitLogin(null, responseData);
    }).catch((error) => {
      if(error && error.code != 1){
              console.error("buttonPressed: Login Error", error);
      }
      this.handleDigitCancel(error);
    });
  },

  render() {
    console.log('DigitLogin: props', this.props)
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5eba46',
      }}>
        <TouchableHighlight  onPress={this.buttonPressed} >
          <Text style={{
            backgroundColor: '#5eba46',
          }}>

              {this.state.digitLoginText}

          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});
