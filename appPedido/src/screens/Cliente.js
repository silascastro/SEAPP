import React, {Component} from 'react';
import {Alert,StyleSheet, Text,
View, TextInput, ActivityIndicator, FlatList, 
TouchableNativeFeedback, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

const OpenMapModule = NativeModules.OpenMapModule;

export default class Cliente extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: false, 
      clientes: [], 
      pesquisado: false, 
      input: '', 
      contasareceber: [],
      moeda: ''
    };
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

  componentDidMount(){
    this.getIp();
    this.getTipoMoeda();
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

  getClientes(){ 
    fetch(config.url+'clientes/byname/'+(this.state.input).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json()).then((resp) => {
      let aux = [];
      
      for(e in resp){
        aux.push(resp[e]);
      }

      this.setState({clientes: aux});
      this.setState({loading: false});
      this.getClientesHasNotCont();
    }).catch((err)=>{
      //Alert.alert('Atenção', 'erro');
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
    fetch(config.url+'clientes/notcont/'+(this.state.input).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json())
      .then((resp) => {
        let aux = this.state.clientes;

        for(let e in resp){
          //resp[e].tbcontasreceber.saldo_devedor = "0.00";
          //resp[e].tbcontasreceber.saldo_compra = resp[e].limite;
          let aux2 = {
            limite: resp[e].limite, 
            cod_cliente: resp[e].cod_cliente,
            nome: resp[e].nome, endereco: resp[e].endereco,
            bairro: resp[e].bairro, telefone: resp[e].telefone, 
            cidade: resp[e].cidade, numero: resp[e].numero,
            uf: resp[e].uf, cep: resp[e].cep, 
            observacao: resp[e].observacao,
            ["tbcontasreceber.saldo_devedor"]: '0.00',
            ["tbcontasreceber.saldo_compra"]: resp[e].limite
          }
          //alert(resp[e].nome);
          aux.push(aux2);
        }

        aux.sort();
        
        this.setState({clientes: aux});

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
    fetch('https://api.opencagedata.com/geocode/v1/json?key=27699a4b223f4c028bca825642181b0f&q='
      +endereco+
      ', '+numero+
      ' - '+bairro+
      ', '+cidade+
      ' - '+uf+
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
      //this.setState({lat: responseJson.results[0].geometry.lat, lng: responseJson.results[0].geometry.lng});
      OpenMapModule.show(responseJson.results[0].geometry.lat, responseJson.results[0].geometry.lng, endereco, cidade, uf);
    }).catch(err => {
      console.log('erro: ',err);
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput placeholder="Digite o nome do cliente" style={{flex: 4}} 
          value={this.state.input} 
          onChangeText={(value)=>{
              this.setState({loading: true});
              this.setState({pesquisado: true});
              this.setState({input: value});
              this.getClientes();
            
          }}/>
          {this.state.input != '' ?<Icon name='close' size={25} color="black"  
          style={{flex: 1,alignSelf: 'center', textAlign: 'right', paddingRight: 5}}
            onPress={()=> {
              this.setState({input: ''});
            }}
          />:null}
        </View>
        {this.state.loading? <ActivityIndicator size="large"/>:null}
        {
          this.state.clientes.length>0 && this.state.loading==false?
            <FlatList
              style={styles.list}
              data={this.state.clientes}
              numColumns={1}
              renderItem={({item}) => 
                <View style={styles.card} >
                    <TouchableNativeFeedback  onPress={()=>{
                      //this.refs['DRAWER'].openDrawer();
                      //this.getContasAReceber(item.cod_cliente);
                      this.props.navigation.navigate('ClienteContas',{
                        cod_cliente: item.cod_cliente,
                        nome: item.nome,
                        endereco: item.endereco,
                        telefone: item.telefone
                      });
                      }}>
                      <View style={styles.cardContent}>
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={styles.title}>{item.cod_cliente}</Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, color: 'black'}}>
                            -</Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, color: 'black', flex: 1}}>
                            {item.nome}</Text>
                          
                        </View>
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={{fontWeight: '600'}}>Telefone: </Text>
                          <Text>{item.telefone}</Text>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 5, flexDirection: 'row'}}>
                            <Text style={{fontWeight: '600'}}>Endereço: </Text>
                            <Text style={{flex: 1}}>{item.endereco}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            
                              <Text style={{fontWeight: '600'}}>Nº: </Text>
                              <Text style={{flex: 1}}>{item.numero}</Text>
                            
                          </View>
                        </View>
                        
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 1,marginRight: 1}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600'}}>CEP: </Text>
                              <Text>{item.cep}</Text>
                            </View>
                          </View>
                          <View style={{flex: 2}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600'}}>Bairro: </Text>
                              <Text>{item.bairro}</Text>
                            </View>
                          </View>
                          
                          
                          
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 0, marginRight: 2}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600', }}>Cidade: </Text>
                              <Text>{item.cidade}</Text>
                            </View>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row' ,}}>
                            <View style={{flex: 1, alignContent: 'flex-end', alignItems: 'flex-end'}}>
                              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={{fontWeight: '600'}}>UF: </Text>
                                <Text>{item.uf}</Text>
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
                                  this.getLatLng(item.endereco, item.numero, item.bairro, item.cidade, item.uf);
                                  
                                }}/>
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row', borderBottomWidth: 0.5,
                        borderBottomColor: '#000000'}}>
                          <Text style={{fontWeight: '600', color: 'red'}}>Observação: </Text>
                          <Text style={{color :'red', flex: 1}}>{item.observacao}</Text>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                            <View style={{flex: 2}}>
                              <Text style={{fontWeight: '600',fontSize: 13, color: 'black'}}>Limite de compra: </Text>
                              <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Saldo devedor: </Text>
                              <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Saldo de compra: </Text>
                            </View>
                            <View style={{flex: 1, alignContent: 'center', alignItems: 'flex-end'}}>
                              <Text style={{alignContent: "center", color: 'black', fontWeight: '600',fontSize: 13,}}>
                              {this.state.moeda == "G" ? this.numberToReal(Number(item.limite)).split(',')[0]:this.numberToReal(Number(item.limite))}</Text>
                              <Text style={{color: 'red'}}>{this.state.moeda == "G" ? this.numberToReal(Number(item['tbcontasreceber.saldo_devedor'])).split(',')[0]:this.numberToReal(Number(item['tbcontasreceber.saldo_devedor']))}</Text>
                              <Text style={{color: item['tbcontasreceber.saldo_compra']<0?'red':'green'}}>
                              {this.state.moeda == "G" ? (this.numberToReal(Number(item['tbcontasreceber.saldo_compra'])).replace("-.","-")).split(',')[0]:this.numberToReal(Number(item['tbcontasreceber.saldo_compra'])).replace("-.","-")}</Text>
                            </View>

                        </View>
                        
                      </View>

                    </TouchableNativeFeedback>
                </View>
            }
              keyExtractor={({id},index)=>id}
        />:null
          
        }
        {(this.state.clientes.length==0 && this.state.loading==false) && this.state.pesquisado?
          <View style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Cliente não encontrado!</Text>
          </View>
          : null
        }
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
    margin: 10,
    borderWidth: 0.2,
    flex: 0,
    flexDirection: 'row',
  },
  list:{

    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
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
