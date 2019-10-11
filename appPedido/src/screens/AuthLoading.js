import React, {Component}from 'react';
import {
  ActivityIndicator,
  
  StatusBar,
  View,
} from 'react-native';
import { StackActions, NavigationActions, navigate } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  static navigationOptions ={
    header: null,
    headerVisible: false,
  };

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
