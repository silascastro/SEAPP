import React, {Component} from 'react';
import {ActivityIndicator,StyleSheet, Text, View, TextInput, 
  Button,Alert ,StatusBar, Switch, Picker, NativeModules, 
  NativeEventEmitter, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Permission from '../../Permissions';
import * as config from '../../config';
const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
const LoginModule = NativeModules.LoginModule;
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

const resetActionHome = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
       rememberPass: false,
       userSelect: '', 
       usuarios: [],
       user: '', 
       userData: {},
       password: '',
      // _ipAddress: '',
       loading: false, 
       loadingUser: true,
       deviceId: '',
       imei: '',
       phoneNumber: '',
    };
       
       this.willFocuSub = this.props.navigation.addListener(
        'willFocus',
        ()=>{
          //alert('voltando');
          //Permission.readPhoneState();
          this.getIp();
          this.getImeiStorage();
          this.SetPermission();
          //this.getImei();
          setTimeout(()=>{this.getUser();},500);
        }
      );
  }

  static navigationOptions = {
    title: 'Login',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#247869',
    },
  };

  componentDidMount(){
    this.getIp();
    //Permission.readPhoneState();
    //this.getPhoneNumber();
    //this.getDeviceId();
    this.getImeiStorage();
    this.SetPermission();
    //this.getImei();
    setTimeout(()=>{this.getUser();},500);
    
    /*AsyncStorage.getItem('imei',(error, result) => {
      if(result){
        alert(result);
        this.setState({imei: result});
      }
      
    });*/
    //this. getUsers();
    //alert(config.url);
  }

  async SetPermission(){
    try{
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
        /*eventEmitter.addListener(
          'imei', (e) =>{
            //this.setState({imei: e.imei});
            AsyncStorage.setItem('imei',e.imei);
            
          }
        );*/
        //Permission.readPhoneState();
        LoginModule.getImei();
        this.getImei();
        
      }else{
        //alert("Permissão negada");
      }
    }catch(err){
      alert(err);
    }
  }

  getIp(){
    AsyncStorage.getItem('_ip',(error,result)=> {
        if(error){
            
        }
        if(result){

          config.url = result;
          //this.getUsers();
          /*let aux = result.split('//')[1];
          let final = aux.split(':')[0];
          this.setState({_ipAddress: result});*/
        }
    });
  }

  getImeiStorage(){
    AsyncStorage.getItem('_imei',(error,result)=> {
        if(error){
            
        }
        if(result){
          if(result!='' && result!= undefined && result!=null)
            this.setState({imei: result});
          //this.getUsers();
          /*let aux = result.split('//')[1];
          let final = aux.split(':')[0];
          this.setState({_ipAddress: result});*/
        }
    });
  }

  getDeviceId(){

  }

  getPhoneNumber(){
    
  }

  getUser(){
    fetch(config.url+'usuario/byimei/'+this.state.imei, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      /*body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),*/
    }).then((response)=> response.json())
      .then((resp) => {
        if(resp.msg == "Usuário não encontrado!"){
          Alert.alert('Atenção', resp.msg);
        }
      this.setState({
        user: resp.nome, 
      });
      
    }).catch((err)=>{
      this.setState({loadingUser: false});
      Alert.alert('Atenção', 'erro ao conectar-se com o servidor!'+'users');
    });
  }

  async getImei(){
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE );
    if (granted) {
      eventEmitter.addListener(
        'imei', (e) =>{
          if(e.imei != null && e.imei!=undefined && e.imei != '')
            this.setState({imei: e.imei});
        }
      );
      LoginModule.getImei();
    } 
    
  }

  getUsers(){
    fetch(config.url+'usuario', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      /*body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),*/
    }).then((response)=> response.json())
      .then((resp) => {
      var aux = [];
      for(let e in resp){
        aux.push(resp[e]);
      }
      this.setState({usuarios: aux});
      
    }).catch((err)=>{
      Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
    });
  }

  doLogin(){
      this.setState({loading: true});
      fetch(config.url+'usuario/'+this.state.user.toUpperCase(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        /*body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        }),*/
      }).then((response)=> response.json())
      .then((resp) => {
        console.log(resp);
        if(resp.msg == "Usuário não encontrado!"){
          Alert.alert('Atenção', resp.msg);
          this.setState({loading: false});
        }else{
          if(resp.imei1 == this.state.imei){
            this.setState({loading: false});
            this.setuser(resp.nome);
            this.setuserCode(resp.codigo);
            this.getEmpresaName(resp.id_empresa);
            AsyncStorage.setItem('usuario_tipo',resp.tipo);
            if(resp.tipo == "C"){
              this.getClienteData(resp.nome);
            }
            LoginModule.login((resp.codigo),"senha");
            let {dispatch} = this.props.navigation;
            dispatch(resetActionHome);
            //this.props.navigation.navigate('Home');
          }else{
            Alert.alert('Atenção', 'Dispositivo não autorizado!');
          }
          this.setState({loading: false});
        }
      }).catch((err)=>{
        this.setState({loading: false});
        
        Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
      });
  }

  getClienteData(name){ 
    fetch(config.url+'clientes/byname/'+(name).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json())
    .then((resp) => {
      AsyncStorage.setItem('userdata', JSON.stringify(resp[0]));
            
    }).catch((err)=>{
      console.log(err);
    });
  }

  setuser(user){
    AsyncStorage.setItem('user',user.toString());
  }

  setuserCode(code){
    AsyncStorage.setItem('user_cod',code.toString());
  }
  
  getEmpresaName(id){
    fetch(config.url+'empresas/byid/'+id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      /*body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),*/
    }).then((response)=> response.json()).then(async(resp) => {
      //this.setState({usuarios: resp.nome_fantasia});
      //alert(JSON.stringify(resp));
      await AsyncStorage.setItem('empresa',resp.codigo+"-"+resp.nome_fantasia);
      await AsyncStorage.setItem('moeda',resp.moeda);
      //AsyncStorage.setItem('empresa_cod', resp.codigo);
    }).catch((err)=>{
      Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
    });
  }

  render() {
    let serviceItems = this.state.usuarios.map( (s, i) => {
      return <Picker.Item key={i} value={s.nome} label={s.nome} />
    });
    return (
      this.state.loading?
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
        <Text>Carregando</Text>
      </View>:
      <View style={styles.container}>
      <StatusBar backgroundColor="#194c40" barStyle="light-content" />
        <View style={styles.loginCard}>
          <View style={styles.user}>
            <View style={{justifyContent: 'center', }}>
              <Icon name="person" size={25} color="black" style={{alignSelf: 'baseline'}}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput  /*underlineColorAndroid='#0000ff'*/value={this.state.user} 
                textContentType='nickname' placeholder="Usuário" secureTextEntry={false}
                  onChangeText={(text)=>this.setState({user:text})}
                />
            </View>
          </View>
          
          <View style={styles.user}>
            <View style={{justifyContent: 'center', }}>
              <Icon name="settings-cell" size={25} color="black" style={{alignSelf: 'baseline'}}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput  /*underlineColorAndroid='#0000ff'*/value={this.state.imei} 
                textContentType='postalCode' placeholder="Imei" secureTextEntry={false} editable={false}
                  onChangeText={(text)=>this.setState({imei:text})}
                />
            </View>
          </View>
        
        </View>
        <View style={styles.btn}>
          <Button title="login" color="#124d34" onPress={()=>{
            if(this.state.user!='' && this.state.imei != '')
              {
                this.doLogin(this.state.user);
              }
            else{
              if(this.state.user == ''){
                Alert.alert('Atenção', 'digite o seu nome!');
              }
              if(this.state.imei == ''){
                Alert.alert('Atenção', 'digite o imei do aparelho!');
              }
            }
              
            
            }/**/
          }/>
        </View>
        <View style={styles.btn}>
          <Button title="configurar ip" color="blue" onPress={()=>{
            this.props.navigation.navigate('Settings');
            
            }/**/
          }/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'/*'#3ca597'*/,
    //justifyContent: 'center'
  },
  loginCard:{
    //height: 40,
    elevation: 5,
    marginTop: 50,
    marginBottom: 10, 
    marginLeft: 20, 
    marginRight: 20, 
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  user: {
    flex: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  password: {
    flex: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  ipAddress: {
    flex: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  lembrarSenha: {
    height: 40,
    flex: 0,
    flexDirection: 'row'
  },
  btn:{
    marginLeft: 20, 
    marginRight: 20,
    elevation: 5, 
    marginBottom: 5
  },
});
