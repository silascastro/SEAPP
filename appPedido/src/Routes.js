import {createAppContainer, HeaderBackButton, createSwitchNavigator, } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/Login';
import Home from './screens/Home';

const Routes = createAppContainer(
    createStackNavigator({Login: Login, Home: Home},{
        headerLayoutPreset: 'center'
    })
);


export default Routes;
