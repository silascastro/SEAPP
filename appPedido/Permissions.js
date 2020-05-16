import {PermissionsAndroid, NativeModules, NativeEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
const LoginModule = NativeModules.LoginModule;

async function readPhoneState() {
    try{
      //
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: 'App read write read phone state Permission',
            message:
            'App needs write external storage ' +
            'so you can take.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
      );
      if(granted== PermissionsAndroid.RESULTS.GRANTED){
        console.log('permissão de ler estado concedida');
        //CallPhone();
        eventEmitter.addListener(
          'imei', (e) =>{
            //this.setState({imei: e.imei});
            AsyncStorage.setItem('imei',e.imei);
            
          }
        );
        //Permission.readPhoneState();
        LoginModule.getImei();
        
      }else{
        //alert("Permissão negada");
      }
    }catch(err){
      alert(err);
    }
};

async function location() {
  try{
    //
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'App location Permission',
          message:
          'App needs access location ' +
          'so you can take.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      console.log('permissão de localização concedida');
      
    }else{
      //alert("Permissão negada");
    }
  }catch(err){
    alert(err);
  }
};

async function fine_location() {
  try{
    //
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App location Permission',
          message:
          'App needs access location ' +
          'so you can take.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      console.log('permissão de localização concedida');
      
    }else{
      //alert("Permissão negada");
    }
  }catch(err){
    alert(err);
  }
};

async function CallPhone() {
  try{
    //
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'App read write read phone state Permission',
          message:
          'App needs write external storage' +
          'so you can take.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      //console.log('permissão de ler estado concedida');
    }else{
      //alert("Permissão negada");
    }
  }catch(err){
    alert(err);
  }
};

export {
    readPhoneState,
    location,
    fine_location,
}
