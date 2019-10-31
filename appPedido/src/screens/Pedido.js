import React, {Component} from 'react';
import {DrawerLayoutAndroid,Alert,StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as config from '../../config';
const API = "http://179.177.126.10:3000/";

export default class Pedido extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: false, clientes: [], pesquisado: false, input: '', contasareceber: []};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Pedido',
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
        this.setState({loading: false});
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
        //Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
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
          let aux2 = {limite: resp[e].limite, cod_cliente: resp[e].cod_cliente,
            nome: resp[e].nome, endereco: resp[e].endereco,
            bairro: resp[e].bairro, telefone: resp[e].telefone, cidade: resp[e].cidade,
            estado: resp[e].estado, cep: resp[e].cep, observacao: resp[e].observacao,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput placeholder="Digite o nome do cliente" style={{flex: 4}} value={this.state.input} 
          onChangeText={(value)=>{

              this.setState({loading: true});
              this.setState({pesquisado: true});
              this.setState({input: value});
              this.getClientes();
            
            
          }}/>
          {this.state.input != '' ?<Icon name='close' size={25} color="black"  style={{flex: 1,alignSelf: 'center', textAlign: 'right', paddingRight: 5}}
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
              renderItem={({item, index}) => 
                <View style={styles.card} >
                    <TouchableNativeFeedback  onPress={()=>{
                      
                      this.props.navigation.navigate('Request',
                      {
                        cod_cliente: item.cod_cliente,
                        nome: this.state.clientes[index].nome,
                        telefone: item.telefone,
                        endereco: item.endereco,
                        cidade: item.cidade,
                        estado: item.estado,
                        observacao: item.observacao,
                        limite: item.limite,
                        saldo_devedor: item['tbcontasreceber.saldo_devedor'],
                        saldo_compra: item['tbcontasreceber.saldo_compra']

                      });
                      }}>
                      <View style={styles.cardContent}>
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={styles.title}>{item.cod_cliente}</Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, color: 'black'}}>-</Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, color: 'black', flex: 1}}>{item.nome}</Text>
                          
                        </View>
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={{fontWeight: '600'}}>Telefone: </Text>
                          <Text>{item.telefone}</Text>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={{fontWeight: '600'}}>Endereço: </Text>
                          <Text style={{flex: 1}}>{item.endereco}</Text>
                        </View>
                        
                        <View style={{flex: 0, flexDirection: 'row'}}>
                          <View style={{flex: 2}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600'}}>Cidade: </Text>
                              <Text>{item.cidade}</Text>
                            </View>
                          </View>
                          <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: '600'}}>Estado: </Text>
                              <Text>{item.estado}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 0, flexDirection: 'row', borderBottomWidth: 0.5,borderBottomColor: '#000000'}}>
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
                              {this.numberToReal(Number(item.limite))}</Text>
                              <Text style={{color: 'red'}}>{this.numberToReal(Number(item['tbcontasreceber.saldo_devedor']))}</Text>
                              <Text style={{color: item['tbcontasreceber.saldo_compra']<0?'red':'green'}}>{this.numberToReal(Number(item['tbcontasreceber.saldo_compra'])).replace("-.","-")}</Text>
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
