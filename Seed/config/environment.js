'use strict'

import {Platform} from 'react-native';

let getEnvironmentName = () => {
  // Logic for figuring out platform

  // return 'dev';
  return 'stage';
  // return 'production';
}

const Environments = {
  dev: {
    env: 'dev',
    ddpOptions: {
      // Note: localhost for iOS, 10.0.2.2 for Android, 10.0.3.2 for Android Genymotion
      host : Platform.OS === 'ios' ? "127.0.0.1" : "10.0.3.2",
      port : 3000,
      ssl  : false,
      autoReconnect : true,
      autoReconnectTimer : 500,
      maintainCollections : true,
      ddpVersion : '1'
    }
  },
  stage: {
    env: 'stage',
    ddpOptions: {
      host : "m.pointlook.com",
      port : 3000,
      ssl  : false,
      autoReconnect : true,
      autoReconnectTimer : 500,
      maintainCollections : true,
      ddpVersion : '1'
    }
  },
  production: {
    env: 'production',
    ddpOptions: {
      // host : "app.com",
      // port : 443,
      // ssl  : true,
      // autoReconnect : true,
      // autoReconnectTimer : 500,
      // maintainCollections : true,
      // ddpVersion : '1'
    }
  }
}

module.exports = Environments[getEnvironmentName()]
