import DDPClient from "ddp-client";
import _ from "underscore";

import Environment from '../../environment';

let ddpClient = new DDPClient(Environment.ddpOptions);

let ddp = {};
ddp.connection = ddpClient;

ddp.initialize = () => {
  console.log('ddpClient: initialize');
  return new Promise(function(resolve, reject) {
    ddpClient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this back will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log(error);
        console.log('DDP connection error!');
        return reject(error);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      // Connected
      console.log('ddpClient: connected!');
      resolve(true);
    });
  });
};

ddp.close = function() {
  console.log('ddpClient: close connection');
  return ddpClient.close();
};

ddp.subscribe = function(pubName, params) {
  params = params || undefined;
  if (params && !_.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.subscribe');
  }
  return new Promise(function(resolve, reject) {
    ddpClient.subscribe(pubName, params, function () {
      console.log('ddpClient: subscribe: ', pubName, ' params: ', params);
      resolve(true);
    });
  });
};

ddp.call = function(methodName, params) {
  console.log('ddpClient: call: ', methodName);
  params = params || undefined;
  if (params && !_.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.call');
  }

  return new Promise(function(resolve, reject) {
    console.log('ddpClient: Promise return');
    ddpClient.call(methodName, params,
      function (err, result) {   // callback which returns the method call results
        console.log('ddpClient: called function, result: ' + result);
        if (err) {
          console.log('ddpClient: error: ', err);
          reject(err);
        } else {
          console.log('ddpClient: result: ', result);
          resolve(result);
        }
      },
      function () {              // callback which fires when server has finished
         console.log('ddpClient: updated');  // sending any updated documents as a result of
         console.log(ddpclient.collections.posts);  // calling this method
      }
    );
  });
};

module.exports = ddp;
