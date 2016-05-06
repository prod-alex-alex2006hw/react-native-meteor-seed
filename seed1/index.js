import React, {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Navigator,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';
import DeviceInfo from 'react-native-device-info';
import Moment from 'moment';

import Router from './config/router';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var accessDate = new Moment().format();


export default React.createClass({
  // Configuration
  displayName: 'PointLook',

  // Initial Value (State and Props)
  getInitialState() {
      console.log(accessDate +':Initialize: Pointlook');

      var deviceInfo = {
        uniqueId: DeviceInfo.getUniqueID(),
        manufacturer: DeviceInfo.getManufacturer(),
        model: DeviceInfo.getModel(),
        deviceId: DeviceInfo.getDeviceId(),
        systemName: DeviceInfo.getSystemName(),
        bundleId: DeviceInfo.getBundleId(),
        buildNumber: DeviceInfo.getBuildNumber(),
        version: DeviceInfo.getVersion(),
        readableVersion: DeviceInfo.getReadableVersion(),
        deviceName: DeviceInfo.getDeviceName(),
        userAgent: DeviceInfo.getUserAgent(),
        deviceLocale: DeviceInfo.getDeviceLocale(),
        deviceCountry: DeviceInfo.getDeviceCountry(),
        width: width,
        height: height,
      }
      // console.log(accessDate,' - PointLook DeviceInfo: ', deviceInfo);

    return {
      deviceInfo: deviceInfo,
      accessDate: accessDate,
      user: null,
    };
  },

  // Component Lifecycle
  componentWillMount() {

  },


  componentWillUnmount() {

  },

  // Component Render
  render() {

    let initialRoute = Router.getOnboarding()


   return (
        <ExNavigator
          initialRoute={initialRoute}
          deviceInfo={this.state.deviceInfo}
          user={this.state.user}
          sceneStyle={{
            overflow: 'visible',
            shadowColor: '#ddd',
            shadowOpacity: 0.5,
            shadowRadius: 6,
            paddingTop: 0,
            // paddingTop: this.state.user ? 64 : 0,
          }}
          renderNavigationBar={(props) => {
            if (this.state.user)
              return (
                <Navigator.NavigationBar {...props} />
              )
         }}
        />
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
