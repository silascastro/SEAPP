import React, {Component}from 'react';
import {
  ActivityIndicator,
  
  StatusBar,
  View,
} from 'react-native';
import { StackActions, NavigationActions, navigate } from 'react-navigation';

export default class AuthLoadingScreen extends Component<Props> {
  constructor(props) {
    super(props);
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
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
      });
      const resetActionLogin = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      });
        /*await AsyncStorage.getItem('LOGIN').then(resp => {
            if(resp){
                if(resp == '1'){
                    dispatch(resetActionHome);
                }
                if(resp == '0'){
                    dispatch(resetActionLogin);
                }
            }else{
                dispatch(resetActionLogin);
            }
        })*/

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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
