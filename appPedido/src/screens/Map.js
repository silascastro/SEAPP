import React, {Component} from 'react';
import {Alert,StyleSheet, Text ,View,FlatList,
Button, TextInput, NativeModules, TouchableNativeFeedback} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
/*
  Screen para exibir os mapas 
  
*/


export default class Map extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
    
    };
    
  }
  

  componentDidMount(){

  }

 
  static navigationOptions = ({navigation}) => ({
      title: 'Mapa',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#247869',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center'
        },
        tabBarVisible: true,
        headerRight: null
  });

  render(){
    return (
      <View style={styles.container}>
           <MapView
            //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
            </MapView>
      </View>
    );                                                                                                                                    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
});
