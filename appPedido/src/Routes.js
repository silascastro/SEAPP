import React,{Component} from 'react';
import {View, Button} from 'react-native';
import {createAppContainer, HeaderBackButton, createSwitchNavigator, } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import AuthLoading from './screens/AuthLoading';
import Search from './screens/Search';
import Request from './screens/Request';
import Cliente from './screens/Cliente';
import ClienteContas from './screens/ClienteContas';
import Pedido from './screens/Pedido';
import Produto from './screens/Produto';
import Settings from './screens/Settings';

const Routes = createAppContainer(
  createStackNavigator(
    {AuthLoading: AuthLoading,
      Login: Login,
      Home: Home,
      Search: Search, 
      Request: Request , 
      Cliente: Cliente, 
      ClienteContas: ClienteContas,
      Pedido: Pedido,
      Produto: Produto,
      Settings: Settings
    },{

}));

export default Routes;
