// import { name as appName } from './app.json';
import 'text-encoding-polyfill';
import 'react-native-url-polyfill/auto';

import {AppRegistry, Text, TextInput} from 'react-native';
import { LogBox } from 'react-native'; // console log

import App from './App';

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent('medicle_alpha', () => App);

// Disable fontScaling.
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications