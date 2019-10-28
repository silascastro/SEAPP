import React, {Component} from 'react';
import {StyleSheet, Text ,View,Button, FlatList, TouchableNativeFeedback} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as config from '../../config';

//const cod_cliente = this.props.navigation.getParam('cod_cliente');
/*
const nome = this.props.navigation.getParam('nome');
const telefone= this.props.navigation.getParam('telefone');
const endereco= this.props.navigation.getParam('endereco');
const observacao= this.props.navigation.getParam('observacao');
const cidade= this.props.navigation.getParam('cidade');
const estado = this.props.navigation.getParam('estado');
const limite = this.props.navigation.getParam('limite');
const saldo_devedor= this.props.navigation.getParam('saldo_devedor');
const saldo_compra= this.props.navigation.getParam('saldo_compra');*/
let dados;

export default class Request extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      cod_cliente: '',
      nome: '',
      telefone: '',
      endereco: '',
      observacao: '',
      cidade: '',
      estado: '',
      limite: '',
      saldo_devedor: '',
      saldo_compra: '',
      data: ''
    };
    const { navigation } = this.props;
    //this.aysncData();
  }

  componentDidMount(){
    dados = this.props.navigation.getParam('endereco');
    console.log(dados);
  }

  static navigationOptions = ({navigation}) => ({
      title: 'Novo Pedido',
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
  });

  
  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <View style={styles.cardContentOneRow}>
                <View style={{flex: 0, flexDirection: 'row'}}>
                    <Text style={styles.title}>{this.props.navigation.getParam('cod_cliente')}</Text>
                    <Text style={{  fontWeight: '600', fontSize: 15, color: 'black'}}>-</Text>
                    <Text style={{  fontWeight: '600', fontSize: 15, color: 'black', flex: 1}}>{this.props.navigation.getParam('nome')}</Text>    
                </View>
                <View style={{flex: 0, flexDirection: 'row'}}>
                  <Text style={{fontWeight: '600'}}>Telefone: </Text>
                  <Text>{this.props.navigation.getParam('telefone')}</Text>
                </View>
                <View style={{flex: 0, flexDirection: 'row'}}>
                    <Text style={{fontWeight: '600'}}>Endereço: </Text>
                    <Text style={{flex: 1}}>{this.props.navigation.getParam('endereco')}</Text>
                </View>
                        
                <View style={{flex: 0, flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: '600'}}>Cidade: </Text>
                      <Text>{this.props.navigation.getParam('cidade')}</Text>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: '600'}}>Estado: </Text>
                      <Text>{this.props.navigation.getParam('estado')}</Text>
                    </View>
                  </View>
                </View>

                <View style={{flex: 0, flexDirection: 'row'}}>
                  <Text style={{fontWeight: '600', color: 'red'}}>Observação: </Text>
                  <Text style={{color :'red', flex: 1}}>{this.props.navigation.getParam('observacao')}</Text>
                </View>
                <View style={{flex: 0, flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Text style={{fontWeight: '600',fontSize: 13, color: 'black'}}>Limite de compra: </Text>
                    <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Saldo devedor: </Text>
                    <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Saldo de compra: </Text>
                  </View>
                  <View style={{flex: 1, alignContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{alignContent: "center", color: 'black', fontWeight: '600',fontSize: 13,}}>
                    {this.numberToReal(Number(this.props.navigation.getParam('limite')))}</Text>
                    <Text style={{color: 'red'}}>{this.numberToReal(Number(this.props.navigation.getParam('saldo_devedor')))}</Text>
                    <Text style={{color: this.props.navigation.getParam('saldo_compra')<0?'red':'green'}}>{this.numberToReal(Number(this.props.navigation.getParam('saldo_compra'))).replace("-.","-")}</Text>
                  </View>

                </View>
          </View>
          <TouchableNativeFeedback style={styles.card} onPress={()=>{}}>
              <View style={styles.cardContent}>
                <View style={{ flex: 1}}>
                  <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>Data do pedido</Text>
                  <Text>04/10/2019</Text>
                </View>
                <View style={{flex: 1}}>
                <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>Hora do pedido</Text>
                  <Text>19:05</Text>
                </View>
              </View>
          </TouchableNativeFeedback>      
          <TouchableNativeFeedback style={styles.card} onPress={()=>{}}>
              <View style={styles.cardContentOneRow}>
                  <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
                    Forma de pagamento
                  </Text>
                  <Text>DINHEIRO</Text>
              </View>
          </TouchableNativeFeedback>    
        <View style={{backgroundColor: "#E0E0E0", padding: 10,flex: 1}}>
            <Text>Itens do pedido</Text>
            <View style={{backgroundColor: '#E0E0E0',
              borderWidth: 0.4, borderColor: 'gray',
              alignItems: 'center', paddingTop: 10,paddingBottom: 10
              }}>
              <Text>Nenhum item no pedido</Text>
            </View>
            
            <View style={styles.float}>
              <AntDesign name={'plus'} size={25} color="#ffffff" onPress={()=>{
                this.props.navigation.navigate('Produto');
              }}/>
            </View>
            
        </View>

        <View style={{ flexDirection: 'row',}}>
          <View style={{flex: 1, padding: 5,  elevation: 5}}>
            <TouchableNativeFeedback style={{}}>
              <View style={{alignItems: 'center', justifyContent: 'center',
              flex: 1, borderColor: 'green', borderWidth: 2,}}>
              <Text style={{color: 'green', fontWeight: 'bold'}}>SARVAR ORÇAMENTO</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={{flex: 1, padding: 5}}>
            <Button title="salvar pedido"/>
          </View>
        </View>

      </View>
    );                                                                                                                                    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  card: {
    //textAlign: 'center',
    //borderBottomWidth: 2,
   // borderColor: 'black',
    //textDecorationStyle: "solid",
  },
  cardContent:{
    flex: 0, flexDirection: 'row', paddingTop: 25, 
    paddingBottom:25, borderBottomColor: 'gray', borderBottomWidth: 0.65,
    paddingLeft: 10,paddingRight: 10
  },
  cardContentOneRow: {
    paddingLeft: 10,paddingRight: 10,
    paddingTop: 25, paddingBottom:25,borderBottomColor: 'gray', borderBottomWidth: 0.65,
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
