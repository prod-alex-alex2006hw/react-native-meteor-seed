import React, {
  StyleSheet,
  View,
  Text,
  Navigator,
} from 'react-native';

import NoConnection from '../components/NoConnection';

const SideMenu = require('react-native-side-menu');
import Menu from '../components/Menu';

import ddpClient from '../config/db/lib/ddpClient';
import Accounts from '../config/db/accounts';

import ExNavigator from '@exponent/react-native-navigator';
import Router from '../config/router';
import MenuEmitter from '../config/emitters';

// Polyfill the process functionality needed for minimongo-cache
global.process = require("../config/db/lib/process.polyfill");

export default React.createClass({
  // Configuration
  displayName: 'Main',

  // Initial Value (State and Props)
  getInitialState() {
    return {
      loaded: false,
      connecting: false,
      connectionFailed: false,
      showOnboarding: true,
      user: null,
      menuOpen: false
    };
  },

  // Try to establish DDP connection
  attemptConnection() {
    this.setState({
      loaded: false
    })

    // Close any connections if active
    try {
      ddpClient.close()
    } catch (err) {
      // TODO: Prevent error when trying to close
      // console.log(err);
    }

    ddpClient.initialize()
      .catch((err) => {
        this.setState({
          loaded: true,
          connectionFailed: true
        });
        return err;
      })
      .then((res) => {
        // Res will be true if no error
        if (res === true) {
          this.setState({
            connectionFailed: false
          })
        }
        return Accounts.signInWithToken();
      })
      .then((res) => {
        return this.setState({
          loaded: true
        });
      })
      .catch((err) => {
        console.log(err)

        // This will occur is you switch environments
        if (err.reason === "You've been logged out by the server. Please log in again."){
          Accounts.signOut();
        }
        this.setState({
          loaded: true
        });
        return
      })
  },
  handleOnboardingPress() {
    this.setState({
      showOnboarding: false
    })
  },

  // Component Lifecycle
  componentWillMount() {
    MenuEmitter.on('toggleMenu', () => {
      this.setState({menuOpen: true})
    })

    this.attemptConnection();

    // Handling user session
    Accounts.userId.then((userId) => {
      if (userId) {
        this.setState({user: {_id: userId}});
      }
    });

    Accounts.emitter.on('loggedIn', (userId) => {
      if (userId) {
        console.log('loggedIn');
        this.setState({user: {_id: userId}});
      }
    });

    Accounts.emitter.on('loggedOut', () => {
      console.log('loggedOut');
      this.setState({
        user: null,
        menuOpen: false
      });
    });
  },

  componentWillUnmount() {
    ddpClient.close();
  },

  // Component Render
  render() {
    if (this.state.connectionFailed) {
      return <NoConnection handlePress={this.attemptConnection} loaded={this.state.loaded} />
    }

    if (!this.state.loaded) {
      return (
        <View style={styles.loading}>
          <Text>Connecting...</Text>
        </View>
      );
    }

    const menu = <Menu handleLogOut={this.handleLogOut} />;
    let initialRoute = this.state.user
        ? Router.getHome({user: this.state.user})
        : Router.getOnboarding()
    return (
      <SideMenu menu={menu} isOpen={this.state.menuOpen}>
        <ExNavigator
          initialRoute={initialRoute}
          sceneStyle={{
            overflow: 'visible',
            shadowColor: '#ddd',
            shadowOpacity: 0.5,
            shadowRadius: 6,
            paddingTop: 64,
            // paddingTop: this.state.user ? 64 : 0,
          }}
          renderNavigationBar={(props) => {
            if (this.state.user)
              return (
                <Navigator.NavigationBar {...props} />
              )
         }}
        />
      </SideMenu>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
