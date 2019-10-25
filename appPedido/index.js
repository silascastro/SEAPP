/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Cliente from './src/screens/Cliente';
import Login from './src/screens/Login';
import {name as appName} from './app.json';
import Routes from './src/Routes';
import Request from './src/screens/Request';
import Teste from './src/screens/Teste'
import ClienteContas from './src/screens/ClienteContas';

//AppRegistry.registerComponent(appName, ()=>Request);
AppRegistry.registerComponent(appName, () => Routes);
//AppRegistry.registerComponent(appName, () => ClienteContas);
