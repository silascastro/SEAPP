import React, {Component} from 'react';
import * as Permission from '../../Permissions';
import {Alert,StyleSheet, Text ,View,FlatList,
  
Button, TextInput, NativeModules, TouchableNativeFeedback} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
/*
  Screen para exibir os mapas 
  
*/


export default class Map extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      lat: 37.78825,
      lng: -122.4324,
      currentLat: '',
      currentLng: '',
    };
    Permission.location();
    Permission.fine_location();
    this.getLatLng();
  }
  

  componentDidMount(){
    const {navigation} = this.props;

    navigation.setParams({
      changeState : this.handleChangeState
    });
  }

  getLatLng(){
    fetch('https://api.opencagedata.com/geocode/v1/json?key=27699a4b223f4c028bca825642181b0f&q='
      +this.props.navigation.getParam('endereco')+
      ', '+this.props.navigation.getParam('numero')+
      ' - '+this.props.navigation.getParam('bairro')+
      ', '+this.props.navigation.getParam('cidade')+
      ' - '+this.props.navigation.getParam('uf')+
      '&pretty=1&no_annotations=1'
    ,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      this.setState({lat: responseJson.results[0].geometry.lat, lng: responseJson.results[0].geometry.lng})
    }).catch(err => {
      console.log('erro: ',err);
    })
  }

  handleChangeState = () =>{
    /*this.setState({
      modalIsVisible: true
    });*/
    this.getLocation();
  }

  getLocation(){
    Geolocation.getCurrentPosition(local => this.setState({currentLat: local.coords.latitude, currentLng: local.coords.longitude}));
  }

 
  static navigationOptions = ({navigation}) => {
      const { params = {} } = navigation.state;
      return {
        title: 'Localização',
      headerTintColor: '#ffffff',
      headerRight: <View style={{margin: 10}}>
        <Button title="Rota" color="blue" style={{marginRight: 20}}
          onPress={()=> params.changeState()}
        />
      </View>
      ,headerStyle: {
        backgroundColor: '#247869',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center'
        },
        tabBarVisible: true,
      }
  };

  render(){
    return (
      <View style={styles.container}>
           <MapView
            //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
              {
                (this.state.currentLat != '' && this.state.currentLng!= '') ?
                <MapViewDirections
                //{latitude: this.state.currentLat, longitude: this.state.currentLng}
                  origin={{latitude: this.state.currentLat, longitude: this.state.currentLng}}
                  destination={{latitude: this.state.lat, longitude: this.state.lng}}
                  apikey="AIzaSyBz-KnuVyTNLE8x50E4oA7ZEdzbG8G5cnU"
                />
                :null
              }
              <Marker
                coordinate={{latitude: this.state.lat,
                  longitude: this.state.lng,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,}}
                title={this.props.navigation.getParam('nome')}
                description={this.props.navigation.getParam('cod_cliente').toString()}
              />
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
