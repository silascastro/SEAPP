import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList,
TouchableNativeFeedback,StatusBar, Alert,
NativeModules, ImageBackground, Image,
NativeEventEmitter
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as config from '../../config'; 
import * as Permission from '../../Permissions'
import AsyncStorage from '@react-native-community/async-storage';

const DATA = [
  {title: 'Pedidos', subtitle: 'Crie e gerencie os pedidos', icon: 'local-offer', type: Icon}, 
  {title: 'Clientes', subtitle: 'Analise e gerencie seus clientes', icon: 'people', type: Icon},
  {title: 'Inventário', subtitle: 'Analise e gerencie seus inventarios', icon: 'inbox', type: Icon},
  {title: 'Configurações', subtitle: 'Analise e gerencie seus clientes', icon: 'md-settings', 
  type: Ionicons},
  {title: 'Sair', subtitle: 'Analise e gerencie seus clientes', icon: 'md-exit', type: Ionicons},
];

const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
const LoginModule = NativeModules.LoginModule;
const ToastModule = NativeModules.ToastModule;

const resetActionLogin = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' }),
  ],
});

export default class Home extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true, user: '',
      empresa: '', empresa_cod: '',
      usuario: '',
      imei: ''
    };
    this.getEmpresaData();
    this.getUserType();
  }

  async getEmpresaData(){
   await AsyncStorage.getItem('empresa', (error,result) => {
      if(result){
        this.setState({empresa: result});
      }
    });
  }

  async getUserType(){
    await AsyncStorage.getItem('usuario', (error,result) => {
       if(result){
         this.setState({usuario: result});
       }
     });
   }

  static navigationOptions = ({navigation}) => {
    const {params={}} = navigation.state;
    return {
      title: params.empresa!=null?params.empresa: null,
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
    }
  };

  formatCurrency(value){
    var tmp = value+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if(tmp.length > 6){
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return tmp;
  }

  componentDidMount(){
   Permission.readPhoneState();
   this.getIp(); 
   let e = this.props.navigation.getParam('message')
   if(e!=null)
    ToastModule.show(e,3000);

    this.getEmpresa();
    AsyncStorage.removeItem("PEDIDO");
  }

  async getIp(){
    await AsyncStorage.getItem('_ip',(error,result)=> {
        if(result){
          config.url = result;
        }
    });
  }

  getEmpresa(){
      setTimeout(() => {
        this.props.navigation.setParams({empresa: this.state.empresa});
      }, 2000);
  }

  sair(){
    LoginModule.logoff();
    let {dispatch} = this.props.navigation;
    dispatch(resetActionLogin);
    AsyncStorage.removeItem('empresa');
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('user_cod');
  }

  getEmpresaName(){
    fetch(config.url+'empresas/byid/'+this.state.user, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json())
      .then((resp) => {
        this.setState({usuarios: resp.nome_fantasia});
    }).catch((err)=>{
      Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
    });
  }

  render() {

    return (
      <ImageBackground style={styles.backgroundImage}
      resizeMode='cover'
      source={require('../assets/background.jpeg')}
      imageStyle= {{opacity:0.7}}
      >
        <View style={styles.container}>
          <StatusBar backgroundColor="#194c40" barStyle="light-content" />
          <FlatList
            style={{}}
            data={DATA}
            renderItem={({item})=>
              <View style={styles.card} >
                <TouchableNativeFeedback onPress={
                  ()=>{
                  if(item.title == "Clientes"){
                    AsyncStorage.getItem("usuario_tipo",(err,result)=> {
                      if(result){
                        if(result == "C"){
                          
                          AsyncStorage.getItem('userdata', (err, result)=> {
                            if(result){                     
                              let aux = JSON.parse(result);
                              this.props.navigation.push('ClienteContas', {
                                cod_cliente: aux.cod_cliente,
                                nome: aux.nome,
                                telefone: aux.telefone,
                                endereco: aux.endereco,                             
                              });
                            }
                          });
                        }else
                          this.props.navigation.push('Cliente');
                          //AsyncStorage.getItem('userdata', (err, result)=> {if(result)alert(result)});
                          
                      }
                    });
                    
                  }
                  if(item.title == "Pedidos"){
                    AsyncStorage.getItem("usuario_tipo",(err,result)=> {
                      if(result){
                        if(result == "C"){
                          
                          AsyncStorage.getItem('userdata', (err, result)=> {
                            if(result){                     
                              let aux = JSON.parse(result);
                              this.props.navigation.push('Request', {
                                cod_cliente: aux.cod_cliente,
                                nome: aux.nome,
                                telefone: aux.telefone,
                                celular: aux.celular,
                                endereco: aux.endereco,
                                cep: aux.cep,
                                bairro: aux.bairro,
                                cidade: aux.cidade,
                                numero: aux.numero,
                                uf: aux.uf,
                                observacao: aux.observacao,
                                limite: aux.limite_compra,
                                saldo_devedor: aux['tbcontasreceber.saldo_devedor'],
                                saldo_compra: aux['tbcontasreceber.saldo_compra']
                              
                              });
                            }
                          });
                        }else
                          this.props.navigation.push('Pedido');
                          //AsyncStorage.getItem('userdata', (err, result)=> {if(result)alert(result)});
                          
                      }
                    });
                    
                  }
                  if(item.title == "Sair"){
                    Alert.alert('Atenção', 'confirma a sua ação?',
                    [
                      {
                        text: 'Cancelar',
                        onPress: () => console.log('cancel'),
                        style: 'cancel',
                      },
                      {
                        text: 'Confimar',
                        onPress: () => {
                          this.sair();
                          
                        },  
                      }
                    ]);
                    
                  }
                  if(item.title == 'Configurações'){
                    //alert(this.state.empresa);
                    //alert(this.state.empresa);
                    this.props.navigation.navigate('Settings');
                  }
                  if(item.title == 'Inventário'){
                    //alert(this.state.empresa);
                    //alert(this.state.empresa);
                    this.props.navigation.navigate('Inventario');
                  }
                }}>

                  <View style={styles.cardContent}>
                    <View style={{flex: 1,alignItems: 'center'}}>
                      <item.type name={item.icon} size={25} color="black"/> 
                    </View>
                    <View style={{flex: 6, textDecorationStyle: 'solid', textDecorationColor: 'red'}}>
                      <Text 
                      style={{fontWeight: '700', fontSize: 15, color: 'black'}}>{item.title}</Text>
                      
                    </View>
                  </View>
                  
                </TouchableNativeFeedback>
                
              </View>
            }
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%', height: '100%',
  },
  container: {
    flex: 1,
  },
  card: {
    textAlign: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    textDecorationStyle: "solid",
  },
  cardContent:{
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
    flexDirection: "row",
  },
  float: {
    width: 60,  
    height: 60,   
    borderRadius: 30,
    backgroundColor: '#30dac5',
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",                                 
    bottom: 10,                                          
    right: 15,
    elevation: 3
  }
  
});

