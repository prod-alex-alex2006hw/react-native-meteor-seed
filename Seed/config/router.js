import React, {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import MenuEmitter from '../config/emitters';

let Router = {
  getHome(props) {
    return {
      renderScene(navigator) {
        let Home = require('../components/home/Home').default
        return <Home navigator={navigator} {...props} />
      },
      getTitle() {
        return 'Home';
      },
      renderLeftButton(navigator) {
        return (
          <TouchableOpacity onPress={() => {
              MenuEmitter.emit('toggleMenu');
            }}>
            <Text style={[styles.buttonText, styles.buttonLeft]}>Menu</Text>
          </TouchableOpacity>
        );
      },
    };
  },
  getSeeding(props) {
    return {
      renderScene(navigator) {
        let Home = require('../components/home/Seeding').default
        return <Home navigator={navigator} {...props} />
      },
      getTitle() {
        return 'Seeding';
      },
      renderLeftButton(navigator) {
        return (
          <TouchableOpacity onPress={() => {
              MenuEmitter.emit('toggleMenu');
            }}>
            <Text style={[styles.buttonText, styles.buttonLeft]}>Menu</Text>
          </TouchableOpacity>
        );
      },
    };
  },
  getOnboarding() {
    return {
      getSceneClass() {
        return require('../components/onboarding/Onboarding').default;
      },
      getTitle() {
        return 'Starter';
      },
      // showNavigationBar: false
    };
  },
  getSignIn() {
    return {
      getSceneClass() {
        return require('../components/accounts/SignIn').default;
      },
      getTitle() {
        return 'SignIn';
      }
    }
  },
  getSignUp() {
    return {
      getSceneClass() {
        return require('../components/accounts/SignUp').default;
      },
      getTitle() {
        return 'SignUp';
      }
    }
  },
  getDigitLogin() {
    return {
      getSceneClass() {
        return require('../components/accounts/DigitLogin');
      },
      getTitle() {
        return 'DigitLogin';
      }
    }
  },
  getTinder(props) {
    return {
      renderScene(navigator) {
        let Tinder = require('../components/tinder/Tinder').default
        return <Tinder navigator={navigator} {...props} />
      },
      getTitle() {
        return 'Tinder';
      },
      renderRightButton(navigator) {
        return (
          <TouchableOpacity onPress={() => {
              navigator.push(Router.getMatches(props))
            }}>
            <Text style={[styles.buttonText, styles.buttonRight]}>Matches</Text>
          </TouchableOpacity>
        );
      },
    }
  },
  getChat(props) {
    return {
      renderScene(navigator) {
        let Chat = require('../components/chat/Chat').default
        return <Chat navigator={navigator} {...props} />
      },
      getTitle() {
        return 'Chat';
      }
    }
  },
  getCrud(props) {
    return {
      renderScene(navigator) {
        let Crud = require('../components/crud/Crud').default
        return <Crud navigator={navigator} {...props} />
      },
      getTitle() {
        return 'Crud';
      }
    }
  },
  getMatches() {
    return {
      renderScene(navigator) {
        let Matches = require('../components/tinder/Matches').default
        return <Matches navigator={navigator} />
      },
      getTitle() {
        return 'Matches';
      }
    }
  }
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
    marginTop: 11,
    color: 'rgb(0, 122, 255)'
  },
  buttonLeft: {
    marginLeft: 6,
  },
  buttonRight: {
    marginRight: 6,
  }
})

export default Router
