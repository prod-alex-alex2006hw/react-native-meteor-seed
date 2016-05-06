//create a file inside your project logger.js
import logger from 'react-native-logger';
import Environment from './environment';

const noop = () => {};

const initLogger = () => {
  console.log('Environment: ', Environment['env'])
  if (Environment['env'] !== 'production') {
    //for android make sure you use your ip addtess e.g '192.168.1.110'
    return logger('localhost');
  }
  return noop;
}

export default initLogger();
