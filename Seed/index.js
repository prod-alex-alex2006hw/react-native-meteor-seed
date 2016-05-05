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
var startDate = new Moment().format();


export default React.createClass({
  // Configuration
  displayName: 'PointLook',

  // Initial Value (State and Props)
  getInitialState() {
      console.log('Initialize: Pointlook');
      // console.log("Device Unique ID: ", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
      // // * note this is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled
      // console.log("Device Manufacturer: ", DeviceInfo.getManufacturer());  // e.g. Apple
      // console.log("Device Model: ", DeviceInfo.getModel());  // e.g. iPhone 6
      // console.log("Device ID: ", DeviceInfo.getDeviceId());  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
      // console.log("Device Name: ", DeviceInfo.getSystemName());  // e.g. iPhone OS
      // console.log("Device Version: ", DeviceInfo.getSystemVersion());  // e.g. 9.0
      // console.log("Bundle Id: ", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile
      // console.log("Build Number: ", DeviceInfo.getBuildNumber());  // e.g. 89
      // console.log("App Version: ", DeviceInfo.getVersion());  // e.g. 1.1.0
      // console.log("App Version (Readable): ", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89
      // console.log("Device Name: ", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6
      // console.log("User Agent: ", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
      // console.log("Device Locale: ", DeviceInfo.getDeviceLocale()); // e.g en-US
      // console.log("Device Country: ", DeviceInfo.getDeviceCountry()); // e.g US

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
      console.log(startDate,' - PointLook DeviceInfo: ', deviceInfo);

    return {
      deviceInfo: deviceInfo,
      startDate: startDate,
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
