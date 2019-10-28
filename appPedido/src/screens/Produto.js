import React, {Component} from 'react';
import {Alert,StyleSheet, Text, Button,View, TextInput, ActivityIndicator, FlatList, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as config from '../../config';


export default class Produto extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: false, pesquisado: false, input: '', produtos: []};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Produtos',
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

  getProdutos(){ 
    fetch(config.url+'produtos/'+(this.state.input).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json()).then((resp) => {
      let aux = [];
      
      for(e in resp){
        //aux.push(resp[e]);
        let item = {cod_produto: resp[e].cod_produto,
        descricao: resp[e].descricao, marca: resp[e].marca,
        preco_venda: resp[e].preco_venda, qtd: resp[e].qtd,
        qtd_selec: '1'
        };
        aux.push(item);
      }

      this.setState({produtos: aux});
      this.setState({loading: false});
      console.log(aux);
      
    }).catch((err)=>{
      this.setState({loading: false});
      //Alert.alert('Atenção', 'erro');
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

  changeText(index, value){

    let aux = this.state.produtos;
    if(aux==[]){
      aux[index].qtd_selec = value;
      this.setState({produtos: aux});
    }
    
  }
  addValue(index){
    let aux = this.state.produtos;
    let currentlyValue=aux[index].qtd_selec;
    let newValue = Number(currentlyValue)+1;
    aux[index].qtd_selec = newValue.toString();
  
    
    this.setState({produtos: aux});
  }

  minusValue(index){
    
    let aux = this.state.produtos;
    let currentlyValue=aux[index].qtd_selec;
    if(currentlyValue!='1'){
      let newValue = Number(currentlyValue)-1;
    aux[index].qtd_selec = newValue.toString();
    this.setState({produtos: aux});
    }
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
          <TextInput placeholder="Digite o nome do produto" style={{flex: 4}} value={this.state.input} 
          onChangeText={(value)=>{
            if(value != ''){
              this.setState({loading: true});
              this.setState({pesquisado: true});
              this.setState({input: value});
              this.getProdutos();
            }
            
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
          this.state.produtos.length>0 && this.state.loading==false?
            <FlatList
              style={styles.list}
              data={this.state.produtos}
              numColumns={1}
              renderItem={({item, index}) => 
                <View style={styles.card} >
                    <TouchableNativeFeedback  onPress={()=>{
                      /*this.props.navigation.navigate('ClienteContas',{
                        cod_cliente: item.cod_cliente,
                        nome: item.nome,
                        endereco: item.endereco,
                        telefone: item.telefone
                      });*/
                      //this.props.navigation.navigate('Request');
                      }}>
                      <View style={styles.cardContent}>
                        <View style={{borderBottomColor: 'gray', borderBottomWidth: 0.65,
                      paddingLeft: 10}}>
                          <Text style={{  fontWeight: '600', 
                          fontSize: 15, color: 'black',}}>{item.cod_produto}</Text>
                          <Text>{item.descricao}</Text> 
                        </View>
                        <View style={{paddingLeft: 10}}>
                          <Text>Marca</Text>
                          <Text style={{fontWeight: '800'}}>{item.marca!=''?item.marca: 'S/N'}</Text>
                        </View>
                        <View style={{backgroundColor: '#EEEEEE', flex: 0, 
                        flexDirection: 'row', paddingLeft: 10, borderBottomColor: 'gray',
                         borderBottomWidth: 0.65}}>
                          <View style={{flex: 1}}>
                            <Text>Valor</Text>
                            <Text style={{fontWeight: '700', color: 'black'}}>{this.numberToReal(Number(item.preco_venda))}</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text>Estoque</Text>
                            <Text style={{fontWeight: '700', color: 'black'}}>{Number(item.qtd)}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row',flex: 0, paddingLeft: 10, backgroundColor: '#EEEEEE'}}>
                          <View style={{flex: 1,}}>
                            <View style={{flex: 0, flexDirection: 'row', flex: 1}}>
                              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>  
                                <View style={styles.float}>
                                  <AntDesign name='minus' size={25} color="black" style={{}}
                                  onPress={()=>this.minusValue(index)}
                                  />
                                </View>
                              </View>
                              <View style={{alignItems: 'center', flex: 1}}>
                                  
                                  <TextInput value={this.state.produtos[index].qtd_selec} 
                                  keyboardType="number-pad"
                                  onChangeText={(value)=>this.changeText(value)}/>
                              </View>
                              <View style={{alignItems: 'center', justifyContent: 'center',flex: 1}}>
                                <View style={styles.float}>
                                  <AntDesign name='plus' size={25} color="black" style={{}}
                                  onPress={()=>this.addValue(index)}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Button title="adicionar"/>
                          </View>
                        </View>

                      </View>

                    </TouchableNativeFeedback>
                </View>
            }
              keyExtractor={({id},index)=>id}
        />:null
          
        }
        {(this.state.produtos.length==0 && this.state.loading==false) && this.state.pesquisado?
          <View style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Produto não encontrado!</Text>
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
float: {
  width: 25,  
  height: 25,   
  borderRadius: 12,            
  backgroundColor: '#30dac5',                                    
  //position: 'absolute', 
  justifyContent: "center",
  alignItems: "center",                                     
  //bottom: 10,                                                    
  //right: 15,
  elevation: 3
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
  //padding: 10,
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
