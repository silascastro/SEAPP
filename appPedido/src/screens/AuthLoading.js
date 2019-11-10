import React, {Component}from 'react';

import {ActivityIndicator,
StatusBar,
View,
NativeModules, 
DeviceEventEmitter,NativeEventEmitter} from 'react-native';
import { StackActions, NavigationActions, navigate } from 'react-navigation';
import * as Permission from '../../Permissions';
const LoginModule = NativeModules.LoginModule;
const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
import AsyncStorage from '@react-native-community/async-storage';
import * as config from '../../config'; 

export default class AuthLoadingScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={login: ''};
    this._bootstrapAsync();
  }

  static navigationOptions ={
    header: null,
    headerVisible: false,
  };


  _bootstrapAsync = async () => {
    
    const {dispatch} = this.props.navigation;
    const resetActionHome = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    const resetActionLogin = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
      ],
    });

    eventEmitter.addListener(
      'LoginStatus', (e) =>{
        
        if(e.login==1){
          dispatch(resetActionHome);
          this.setState({login: true});
        }if(e.login==0){
          dispatch(resetActionLogin);
        }
        
      }
    );
    //Permission.readPhoneState();
    LoginModule.getLoginStatus();
    this.getIp();
  };

  getIp(){
    AsyncStorage.getItem('_ip',(error,result)=> {
        if(error){
            AsyncStorage.setItem('_ip',config.url);
        }
    });
  }


  // Render any loading content that you like here
  render() {

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor="#008577" barStyle="light-content" />
        <ActivityIndicator size="large"/>
        
      </View>
    );
  }
}
