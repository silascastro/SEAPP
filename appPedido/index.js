/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Cliente from './src/screens/Cliente';
import Login from './src/screens/Login';
import {name as appName} from './app.json';
import Routes from './src/Routes';
import Request from './src/screens/Request';
import Produto from './src/screens/Produto';
import ClienteContas from './src/screens/ClienteContas';

//AppRegistry.registerComponent(appName, ()=>Produto);
//AppRegistry.registerComponent(appName, ()=>Request);
AppRegistry.registerComponent(appName, () => Routes);
//AppRegistry.registerComponent(appName, () => ClienteContas);
