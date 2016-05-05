import React, {
  AppRegistry,
  Component
} from 'react-native';

import Main from './Seed/';

let App = React.createClass({
  render() {
    return (
      <Main />
    );
  }
});

AppRegistry.registerComponent('pointlook', () => App);
