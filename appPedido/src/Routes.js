import React,{Component} from 'react';
import {View, Button} from 'react-native';
import {createAppContainer, HeaderBackButton, createSwitchNavigator, } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import Config from './screens/Config';
import AuthLoading from './screens/AuthLoading';
import Search from './screens/Search';
import Request from './screens/Request';
import Cliente from './screens/Cliente';

/*const MainStack = createStackNavigator({
  Home: Home,
  Search: Search
},{headerMode: 'screen'});

const configStack = createStackNavigator({Config: Config});

const TabNavigator = createMaterialBottomTabNavigator({
    MainStack: MainStack,
    Config: configStack
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'MainStack') {
        iconName = `home`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
        //IconComponent = HomeIconWithBadge; 
      } else if (routeName === 'Config') {
        iconName = `config`;
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  
  })
,
  initialRouteName: 'MainStack',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#018786'},
}

);

MainStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0){
    
    tabBarVisible = false;
  }

  return {
    tabBarVisible,

  };
};*/

const Routes = createAppContainer(createStackNavigator({AuthLoading: AuthLoading,Login: Login,Home: Home,Search: Search, Request: Request , Cliente: Cliente},{

    //headerMode: 'none'
}));






export default Routes;
