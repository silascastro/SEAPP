/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import {name as appName} from './app.json';
import Routes from './src/Routes';

AppRegistry.registerComponent(appName, () => Routes);
