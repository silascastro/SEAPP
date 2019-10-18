import {PermissionsAndroid} from 'react-native';


async function readPhoneState() {
    try{
      //
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
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
        console.log('permissão de ler estado concedida');
        //CallPhone();
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
}