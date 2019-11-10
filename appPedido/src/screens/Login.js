import React, {Component} from 'react';
import {ActivityIndicator,StyleSheet, Text, View, TextInput, 
  Button,Alert ,StatusBar, Switch, Picker, NativeModules, 
  DeviceEventEmitter, NativeEventEmitter} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions, navigate } from 'react-navigation';
import * as Permission from '../../Permissions';
import * as config from '../../config';
const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
const LoginModule = NativeModules.LoginModule;
import AsyncStorage from '@react-native-community/async-storage';

const resetActionHome = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
    //NavigationActions.navigate({ routeName: 'Search' }),
    //NavigationActions.navigate({ routeName: 'Cliente' }),
  ],
});
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {rememberPass: false,
       userSelect: '', 
       usuarios: [],
       user: '', 
       password: '',
      // _ipAddress: '',
       loading: false, 
       imei: ''};
       
       this.willFocuSub = this.props.navigation.addListener(
        'willFocus',
        ()=>{
          //alert('voltando');
          this.getIp();
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
    //this. getUsers();
    //alert(config.url);
  }

  getIp(){
    AsyncStorage.getItem('_ip',(error,result)=> {
        if(error){
            //AsyncStorage.setItem('_ip',config.url);
            //API = config.url;
        }
        if(result){

          config.url = result;
          this.getUsers();
          /*let aux = result.split('//')[1];
          let final = aux.split(':')[0];
          this.setState({_ipAddress: result});*/
        }
    });
  }

  async getImei(){
    eventEmitter.addListener(
      'imei', (e) =>{
        //alert(e.imei);
        this.setState({imei: e.imei});
      }
    );
    LoginModule.getImei();
  }

  getUsers(){
    fetch(config.url+'funcionarios', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      /*body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),*/
    }).then((response)=> response.json()).then((resp) => {
      var aux = [];
      for(let e in resp){
        aux.push(resp[e]);
      }
      this.setState({usuarios: aux});
      
    }).catch((err)=>{
      Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
    });
  }

  doLogin(user){
    if(user==""){
      Alert.alert('Atenção', 'nenhum usuário selecionado!');
    }else{
      this.setState({loading: true});
      fetch(config.url+'funcionarios/'+user, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        /*body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        }),*/
      }).then((response)=> response.json()).then((resp) => {
        this.setState({loading: false});
        if(this.state.password == resp.senha){
          if(this.state.imei == resp.codigo1){
            console.log(resp.id_funcionario);
            LoginModule.login((resp.id_funcionario),this.state.password);
            let {dispatch} = this.props.navigation;
            dispatch(resetActionHome);
            //this.props.navigation.navigate('Home');
          }else{
            console.log(resp.id_funcionario);
            //até resolver permissões do imei
            this.setuser(resp.nome);
            this.setuserCode(resp.id_funcionario);
            
            this.getEmpresaName(resp.id_empresa);
            LoginModule.login((resp.id_funcionario),this.state.password);
            let {dispatch} = this.props.navigation;
            dispatch(resetActionHome);
            //Alert.alert('Atenção', 'dispositivo não autorizado!');
          }
        }else{
          alert('senha incorreta!');
        }
      }).catch((err)=>{
        this.setState({loading: false});
        Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
      });
    }
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
              <Picker
                selectedValue={this.state.userSelect}
                mode="dialog"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({userSelect: itemValue})
                }>
                  {serviceItems}
              </Picker>
            </View>
          </View>
          <View style={styles.password}>
            <View style={{justifyContent: 'center', }}>
              <Icon name="lock" size={25} color="black" style={{alignSelf: 'baseline'}}/>
            </View>
            <View style={{justifyContent: 'center', flex: 1 }}>
              <TextInput  /*underlineColorAndroid='#0000ff'*/value={this.state.password} 
              textContentType='password' placeholder="Senha" secureTextEntry={true}
                onChangeText={(text)=>this.setState({password:text})}
              />
            </View>
          </View>
        
          <View style={styles.lembrarSenha}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text >Lembrar minha senha</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Switch value={this.state.rememberPass} 
              onValueChange={()=>{
                this.setState({rememberPass: !this.state.rememberPass});
              }}/>
            </View>
          </View>
        </View>
        <View style={styles.btn}>
          <Button title="login" color="#124d34" onPress={()=>{
            if(this.state.password!='')
              this.doLogin(this.state.userSelect);
            else
            Alert.alert('Atenção', 'digite a sua senha!');
            
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
