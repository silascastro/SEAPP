import React, {Component} from 'react';
import {Alert,StyleSheet, Text, Button,
View, TextInput, ActivityIndicator, FlatList, ScrollView,
TouchableNativeFeedback, NativeModules, Linking} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

//const OpenMapModule = NativeModules.OpenMapModule;
const LoginModule = NativeModules.LoginModule;
const ToastModule = NativeModules.ToastModule;

const resetActionLogin = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' }),
  ],
});

const _ipcollections = 'ipcollections';
export default class Cliente extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: false, 
      clientes: [], 
      pesquisado: false, 
      input: '', 
      empresa: '',
      usuario: '',
      contasareceber: [],
      ipcollections: [],
      moeda: ''
    };
    this.getEmpresaData();
    this.getUserType();
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Clientes',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#247869',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center'
      },
      tabBarVisible: true,
  });

  async getEmpresaData(){
    await AsyncStorage.getItem('empresa', (error,result) => {
       if(result){
         this.setState({empresa: result});
       }
     });
   }
 
   async getUserType(){
     await AsyncStorage.getItem('usuario_tipo', (error,result) => {
        if(result){
          this.setState({usuario: result});
        }
      });
    }

  componentDidMount(){
    this.getIp();
    this.getTipoMoeda();
    let e = this.props.navigation.getParam('message');
    if(e!=null)
     ToastModule.show(e,3000);
    this.getEmpresa();
    AsyncStorage.removeItem("PEDIDO");
    this.getIpCollections();
    //alert(JSON.stringify(this.state.usuario));
  }

  getIpCollections(){
    AsyncStorage.getItem(_ipcollections,(error,result)=>{
      if(result){
        let array = JSON.parse(result);
        for(let e in array){
          let aux = (array[e].ip).split('//')[1];
          let final = aux.split(':')[0];
          array[e].ip = final;
          
        }

        this.setState({ipcollections: array});
      }
    });
  }

  getEmpresa(){
    setTimeout(() => {
      this.props.navigation.setParams({empresa: this.state.empresa});
    }, 2000);
  }

  getTipoMoeda(){
    AsyncStorage.getItem('moeda',(error,result)=> {
      if(error){
          //AsyncStorage.setItem('_ip',config.url);
          //API = config.url;
      }
      if(result){
        //API = result;
        this.setState({moeda: result});
      }
    });
  }

  getIp(){
    AsyncStorage.getItem('_ip',(error,result)=> {
        if(error){
            //AsyncStorage.setItem('_ip',config.url);
            //API = config.url;
        }
        if(result){
          //API = result;
          config.url = result;
        }
    });
  }

  sair(){
    LoginModule.logoff();
    let {dispatch} = this.props.navigation;
    dispatch(resetActionLogin);
    AsyncStorage.removeItem('empresa');
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('user_cod');
  }

  getClientes(){ 
    fetch(config.url+'clientes/one/byname/'+(this.state.input).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json()).then((resp) => {
      //alert(JSON.stringify(resp));
      if(resp.length == 0 || (resp.msg != undefined)){
        this.getClientesHasNotCont();
      }else{
        let aux = [];
        aux.push(resp[0]);
        

        this.setState({clientes: aux});
        this.setState({loading: false});
      
      }
    }).catch((err)=>{
      //this.setState({loading: false});
      this.getClientesHasNotCont();
      //Alert.alert('Atenção', 'erro: '+err);
    });
  }

  getContasAReceber(id){
    fetch(config.url+'contasreceber/'+id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response)=> response.json()).then((resp) => {
        console.log(resp);
        let aux = [];
        for(e in resp){
          aux.push(resp[e]);
        }
        this.setState({contasareceber: aux});
        //this.setState({loading: false});
        
      }).catch((err)=>{
        Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
      });
  }

  getClientesHasNotCont(){
    fetch(config.url+'clientes/one/notcont/'+(this.state.input).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json())
      .then((resp) => {
        if((resp.msg != undefined) || (resp.length == 0)){        
          this.setState({loading: false});
        }else{

          let aux = this.state.clientes;
;
            let aux2 = {
              limite_compra: resp.limite_compra, 
              cod_cliente: resp.cod_cliente,
              nome: resp.nome, endereco: resp.endereco,
              bairro: resp.bairro, telefone: resp.telefone, celular: resp.celular,
              cidade: resp.cidade, numero: resp.numero,
              uf: resp.uf, cep: resp.cep, 
              observacao: resp.observacao,
              ["tbcontasreceber.saldo_devedor"]: '0.00',
              ["tbcontasreceber.saldo_compra"]: resp.limite_compra
            };
            //alert(resp[e].nome);
            aux.push(aux2);
          
          
          this.setState({clientes: aux});
        } 
    }).catch(e => {
      //Alert.alert('Atenção', 'erro nos clientes que não tem contas');
    });
      
  }

  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

  removerPonto(campo)
	{	
		campo = campo.split(".").join("");
		return campo;
  }
  
  getLatLng(endereco, numero, bairro, cidade, uf){
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination='+endereco+', '+numero+' - '+bairro+', '+cidade+' - '+uf+'&travelmode=driving');
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
        {this.state.usuario != "C" ? <View style={styles.input}>
          <TextInput placeholder="Digite o nome do cliente" style={{flex: 4}} 
          value={this.state.input} 
          onChangeText={(value)=>{
            if(value!=''){
              this.setState({input: value,loading: true,pesquisado: true})
              this.getClientes();
            }else{
              this.setState({input: value, loading: false});
            }
            
          }}/>
          {this.state.input != '' ?<Icon name='close' size={25} color="black"  
          style={{flex: 1,alignSelf: 'center', textAlign: 'right', paddingRight: 5}}
            onPress={()=> {
              this.setState({input: ''});
            }}
          />:null}
        </View> : null}
        {this.state.loading? <View style={{flex: 1}}><ActivityIndicator size="large"/></View>:null}
        {
          this.state.clientes.length>0 && this.state.loading==false?
 
                <View style={styles.list} >
                    <TouchableNativeFeedback  onPress={()=>{
                      //this.refs['DRAWER'].openDrawer();
                      //this.getContasAReceber this.state.clientes[0].cod_cliente);
                      this.props.navigation.navigate('ClienteContas',{
                        cod_cliente: this.state.clientes[0].cod_cliente,
                        nome: this.state.clientes[0].nome,
                        endereco: this.state.clientes[0].endereco,
                        telefone: this.state.clientes[0].telefone
                      });
                      //alert(JSON.stringify(this.state.clientes));
                      }}>
                      <View style={styles.cardContent}>
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={styles.title}>{this.state.clientes[0].cod_cliente}</Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, color: 'black'}}>
                            -</Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, color: 'black', flex: 1}}>
                            {this.state.clientes[0].nome}</Text>
                          
                        </View>
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={{fontWeight: '600'}}>Telefone: </Text>
                          <Text>{this.state.clientes[0].telefone} / {this.state.clientes[0].celular}</Text>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 5, flexDirection: 'row'}}>
                            <Text style={{fontWeight: '600'}}>Endereço: </Text>
                            <Text style={{flex: 1}}>{this.state.clientes[0].endereco}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            
                              <Text style={{fontWeight: '600'}}>Nº: </Text>
                              <Text style={{flex: 1}}>{this.state.clientes[0].numero}</Text>
                            
                          </View>
                        </View>
                        
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 1,marginRight: 1}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600'}}>CEP: </Text>
                              <Text>{this.state.clientes[0].cep}</Text>
                            </View>
                          </View>
                          <View style={{flex: 2}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600'}}>Bairro: </Text>
                              <Text>{this.state.clientes[0].bairro}</Text>
                            </View>
                          </View>
                          
                          
                          
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 0, marginRight: 2}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600', }}>Cidade: </Text>
                              <Text>{this.state.clientes[0].cidade}</Text>
                            </View>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row' ,}}>
                            <View style={{flex: 1, alignContent: 'flex-end', alignItems: 'flex-end'}}>
                              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={{fontWeight: '600'}}>UF: </Text>
                                <Text>{this.state.clientes[0].uf}</Text>
                              </View>
                            </View>

                            <View style={{flex: 1, alignContent: 'flex-end', alignItems: 'flex-end'}}>
                              <View style={styles.float}>
                                <MaterialCommunityIcons name={'map-marker'} size={25} color="#ea4335" 
                                onPress={()=>{
                                  /*this.props.navigation.navigate('Map',
                                  {
                                    cod_cliente: item.cod_cliente,
                                    nome: item.nome,
                                    telefone: item.telefone,
                                    endereco: item.endereco,
                                    cidade: item.cidade,
                                    estado: item.estado,
                                    numero: item.numero,
                                    uf: item.uf,
                                  });*/
                                  this.getLatLng(this.state.clientes[0].endereco, this.state.clientes[0].numero, this.state.clientes[0].bairro, this.state.clientes[0].cidade, this.state.clientes[0].uf);
                                  
                                }}/>
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row', borderBottomWidth: 0.5,
                        borderBottomColor: '#000000'}}>
                          <Text style={{fontWeight: '600', color: 'red'}}>Observação: </Text>
                          <Text style={{color :'red', flex: 1}}>{this.state.clientes[0].observacao}</Text>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                            <View style={{flex: 2}}>
                              <Text style={{fontWeight: '600',fontSize: 13, color: 'black'}}>Limite de compra: </Text>
                              <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Saldo devedor: </Text>
                              <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Saldo de compra: </Text>
                            </View>
                            <View style={{flex: 1, alignContent: 'center', alignItems: 'flex-end'}}>
                              <Text style={{alignContent: "center", color: 'black', fontWeight: '600',fontSize: 13,}}>
                              {this.state.moeda == "G" ? this.numberToReal(Number(this.state.clientes[0].limite_compra)).split(',')[0]:this.numberToReal(Number(this.state.clientes[0].limite_compra))}</Text>
                              <Text style={{color: 'red'}}>{this.state.moeda == "G" ? this.numberToReal(Number(this.state.clientes[0]['tbcontasreceber.saldo_devedor'])).split(',')[0]:this.numberToReal(Number(this.state.clientes[0]['tbcontasreceber.saldo_devedor']))}</Text>
                              <Text style={{color: this.state.clientes[0]['tbcontasreceber.saldo_compra']<0?'red':'green'}}>
                              {this.state.moeda == "G" ? (this.numberToReal(Number(this.state.clientes[0]['tbcontasreceber.saldo_compra'])).replace("-.","-")).split(',')[0]:this.numberToReal(Number(this.state.clientes[0]['tbcontasreceber.saldo_compra'])).replace("-.","-")}</Text>
                            </View>

                        </View>
                        
                      </View>

                    </TouchableNativeFeedback>
                </View>
            :null
          
        }
        {(this.state.clientes.length==0 && this.state.loading==false) && this.state.pesquisado?
          <View style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', flex:1}}>
            <Text>Cliente não encontrado!</Text>
          </View>
          : null
        }
        {
          //this.state.clientes.length>0 && !this.state.loading
          //?
            <ScrollView style={{flex: 1, padding: 10}}>
              <View style={{paddingBottom: 10,borderBottomWidth: 1,borderBottomColor: 'gray'}}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title="C. Receber" onPress={()=>{
                      if(this.state.clientes.length>0 && !this.state.loading){
                        
                          
                       this.props.navigation.navigate('ClienteContas',{
                        cod_cliente: this.state.clientes[0].cod_cliente,
                        nome: this.state.clientes[0].nome,
                        endereco: this.state.clientes[0].endereco,
                        telefone: this.state.clientes[0].telefone
                      });
                    }else{
                      AsyncStorage.getItem("usuario_tipo",(err,result)=> {
                        if(result){
                          
                          if(result == "C"){
                            //alert(JSON.stringify(result));
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
                          }else{
                            if(this.state.clientes.length> 0){
                            this.props.navigation.navigate('ClienteContas',{
                              cod_cliente: this.state.clientes[0].cod_cliente,
                              nome: this.state.clientes[0].nome,
                              endereco: this.state.clientes[0].endereco,
                              telefone: this.state.clientes[0].telefone
                            });
                          }
                          }
                          //this.props.navigation.push('Cliente');
                          //AsyncStorage.getItem('userdata', (err, result)=> {if(result)alert(result)});
                          
                      }
                    });
                    }
                    
                    }}/>
                  </View>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title="pontos" color="red"/>
                  </View>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title="pedidos" color="green" onPress={()=>{
                      if(this.state.clientes.length>0 && !this.state.loading){
                        this.props.navigation.navigate('Request',
                            {
                              cod_cliente: this.state.clientes[0].cod_cliente,
                              nome: this.state.clientes[0].nome,
                              telefone: this.state.clientes[0].telefone,
                              celular: this.state.clientes[0].celular,
                              endereco: this.state.clientes[0].endereco,
                              cep: this.state.clientes[0].cep,
                              bairro: this.state.clientes[0].bairro,
                              cidade: this.state.clientes[0].cidade,
                              numero: this.state.clientes[0].numero,
                              uf: this.state.clientes[0].uf,
                              observacao: this.state.clientes[0].observacao,
                              limite: this.state.clientes[0].limite_compra,
                              saldo_devedor: this.state.clientes[0]['tbcontasreceber.saldo_devedor'],
                              saldo_compra: this.state.clientes[0]['tbcontasreceber.saldo_compra']
      
                            });

                      /**/
                    }else{
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
                          }else{
                            if(this.state.clientes.length> 0){
                            this.props.navigation.navigate('Request',
                            {
                              cod_cliente: this.state.clientes[0].cod_cliente,
                              nome: this.state.clientes[0].nome,
                              telefone: this.state.clientes[0].telefone,
                              celular: this.state.clientes[0].celular,
                              endereco: this.state.clientes[0].endereco,
                              cep: this.state.clientes[0].cep,
                              bairro: this.state.clientes[0].bairro,
                              cidade: this.state.clientes[0].cidade,
                              numero: this.state.clientes[0].numero,
                              uf: this.state.clientes[0].uf,
                              observacao: this.state.clientes[0].observacao,
                              limite: this.state.clientes[0].limite_compra,
                              saldo_devedor: this.state.clientes[0]['tbcontasreceber.saldo_devedor'],
                              saldo_compra: this.state.clientes[0]['tbcontasreceber.saldo_compra']
      
                            });
                          }
                          }
                            
                            
                        }else{
                          if(this.state.clientes.length> 0){
                            this.props.navigation.navigate('Request',
                            {
                              cod_cliente: this.state.clientes[0].cod_cliente,
                              nome: this.state.clientes[0].nome,
                              telefone: this.state.clientes[0].telefone,
                              celular: this.state.clientes[0].celular,
                              endereco: this.state.clientes[0].endereco,
                              cep: this.state.clientes[0].cep,
                              bairro: this.state.clientes[0].bairro,
                              cidade: this.state.clientes[0].cidade,
                              numero: this.state.clientes[0].numero,
                              uf: this.state.clientes[0].uf,
                              observacao: this.state.clientes[0].observacao,
                              limite: this.state.clientes[0].limite_compra,
                              saldo_devedor: this.state.clientes[0]['tbcontasreceber.saldo_devedor'],
                              saldo_compra: this.state.clientes[0]['tbcontasreceber.saldo_compra']
      
                            });
                          }
                        }
                      });
                    }
                    }}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title={this.state.usuario != '' ? '' : "Inventário"} color="blue" onPress={()=>{
                      if(this.state.usuario == '')
                      this.props.navigation.navigate('Inventario');
                    }}/>
                  </View>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title="" color="orange"/>
                  </View>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title="" color="#124d34"/>
                  </View>
                </View>
              </View>

              <View style={{paddingTop: 10,}}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title={this.state.ipcollections[0] ? this.state.ipcollections[0].descricao : ''}
                    onPress={()=>{
                      if(this.state.ipcollections[0]){
                        AsyncStorage.setItem('_ip',"http://"+this.state.ipcollections[0].ip+":3000/");
                        config.url = "http://"+this.state.ipcollections[0].ip+":3000/";
                      }
                    }}
                    />
                  </View>
                  
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title={this.state.ipcollections[1] ? this.state.ipcollections[1].descricao : ''} 
                    color="orange"
                    onPress={()=>{
                      if(this.state.ipcollections[1]){
                        AsyncStorage.setItem('_ip',"http://"+this.state.ipcollections[1].ip+":3000/");
                        config.url = "http://"+this.state.ipcollections[1].ip+":3000/";
                        
                      }
                    }}/>
                  </View>
                  
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Button title={this.state.ipcollections[2] ? this.state.ipcollections[2].descricao : ''} 
                    color="#124d34" onPress={()=>{
                      if(this.state.ipcollections[2]){
                        AsyncStorage.setItem('_ip',"http://"+this.state.ipcollections[2].ip+":3000/");
                        config.url = "http://"+this.state.ipcollections[2].ip+":3000/";
                        
                      }
                      
                      
                    }}/>
                  </View>
                  
                </View>
                
                
              </View>
              <View style={{flex: 1,justifyContent: 'flex-end', marginBottom: 5}}>
                  <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginRight: 15,}}>
                    <Button title="Configuração" onPress={()=>this.props.navigation.navigate('Settings')}/>
                  </View>
                  <View style={{flex: 1, marginLeft: 15}}>
                    <Button title="sair" color="green" onPress={()=>{
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
                    }}/>
                  </View>
                </View>
                </View>
            </ScrollView>
            //:
            //null
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  float: {
    width: 25,  
    height: 25,   
    borderRadius: 12,            
    backgroundColor: 'white',                                    
    //position: 'absolute', 
    justifyContent: "center",
    alignItems: "center",                                     
    //bottom: 10,                                                    
    //right: 15,
    elevation: 3,
    
  },
  input: {
    height: 50,
    elevation: 2,
    //margin: 10,
    marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 2,
    borderWidth: 0.2,
    flex: 0,
    flexDirection: 'row',
  },
  list:{
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 5,
},
  card: {
    //paddingLeft: 10,
    marginRight: 2,
    marginLeft: 2,
    //height: 150,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 5,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
    
},
cardContent: {
  padding: 10,
  flex: 1,
  //flexDirection: 'row'  
},
menu: {
  padding: 10,
},
title: {
  fontWeight: '600', 
  fontSize: 15, 
  color: 'black'
},
  
});
