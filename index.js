/**
 * @format
 */

import {AppRegistry, Platform, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyAy9R0lqATeWTNcAkD0KSPsk0_uJ7Dv7fY');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
AppRegistry.registerComponent(appName, () => App);
