import React, {Component} from 'react';
import {ActivityIndicator,StyleSheet, Text, View, TextInput, Button,Alert ,StatusBar, Switch, Picker, NativeModules, DeviceEventEmitter, NativeEventEmitter} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
const LoginModule = NativeModules.LoginModule;
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {rememberPass: false, userSelect: '', usuarios: [],user: '', password: '', loading: false};

  }

  static navigationOptions = {
    title: 'Login',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#247869',
    },
  };

  componentDidMount(){
    this. getUsers();
    /*   
    eventEmitter.addListener(
      'LoginStatus', (e) =>{
        console.log(e);
      }
    );
    LoginModule.getLoginStatus();*/
  }

  getUsers(){
    fetch('http://192.168.0.5:3000/funcionarios', {
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
      fetch('http://192.168.0.5:3000/funcionarios/'+user, {
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
          LoginModule.login(this.state.user,this.state.password);
          this.props.navigation.navigate('Home');
        }else{
          alert('senha incorreta!');
        }
      }).catch((err)=>{
        this.setState({loading: false});
        
      });
    }
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
          <View>
            <View style={styles.password}>
              <View style={{justifyContent: 'center', }}>
                <Icon name="lock" size={25} color="black" style={{alignSelf: 'baseline'}}/>
              </View>
              <View style={{justifyContent: 'center', flex: 1 }}>
                <TextInput  /*underlineColorAndroid='#0000ff'*/value={this.state.password} select textContentType='password' placeholder="Senha" secureTextEntry={true}
                  onChangeText={(text)=>this.setState({password:text})}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.lembrarSenha}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text >Lembrar minha senha</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Switch value={this.state.rememberPass} onValueChange={()=>{
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
  lembrarSenha: {
    height: 40,
    flex: 0,
    flexDirection: 'row'
  },
  btn:{
    marginLeft: 20, 
    marginRight: 20,
    elevation: 5
  },
});
