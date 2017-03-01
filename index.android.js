import { AppRegistry, Linking } from 'react-native';
import AppContainer from './src/';
var config = require('./config.js')
global.access_token = config.access_token;
global.api_url = "http://192.168.0.113:3000/api/v1/";

AppRegistry.registerComponent('SupplyThisApp', () => AppContainer);
