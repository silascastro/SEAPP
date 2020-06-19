import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, PermissionsAndroid, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class Inventario extends Component<Props> {
  
  constructor(props){
    super(props);
    this.state = {
      showCamera: false
    };
  }
  
  componentDidMount(){
    this.permission();
  }

  async permission(){
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App read write camera Permission',
            message:
            'App needs camera ' +
            'so you can take.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
      );
      if(granted== PermissionsAndroid.RESULTS.GRANTED){
        console.log('permissão de camera concedida');
        
      }else{
        //alert("Permissão negada");
      }
    }catch(err){
      alert(err);
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };  
 
  static navigationOptions = ({navigation}) => {
      const { params = {} } = navigation.state;
      return {
        title: 'Inventário',
        headerTintColor: '#ffffff',
        headerStyle: {
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
            
              {this.state.showCamera?
                <View style={styles.containerReader}>
                  <View style={{flex: 0, 
                    flexDirection: 'row', 
                    justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.capture}>
                      <Text>teste</Text>
                    </TouchableOpacity>
                  </View>
                  <RNCamera
                      ref={(ref) => {
                        this.camera = ref;
                      }}
                      style={styles.preview}
                      onBarCodeRead={(value)=>alert(value)}
                      androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                      }}
                      type={RNCamera.Constants.Type.back}
                      captureAudio={false}
                  />
                  {/*<View style={{ flex: 0, 
                    flexDirection: 'row', 
                    justifyContent: 'space-around' }}>
                    <TouchableOpacity 
                      onPress={this.takePicture.bind(this)} 
                      style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>*/}
                </View> 
                :
                <Button title="ler código de barras" onPress={()=>this.setState({showCamera: true})}/>
              }
     
      </View>
    );                                                                                                                                    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  containerReader: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',    
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
