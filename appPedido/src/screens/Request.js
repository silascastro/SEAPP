import React, {Component} from 'react';
import {StyleSheet, Text ,View,Button, FlatList, TouchableNativeFeedback, TouchableHighlight, BackHandler} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import {SwipeListView} from 'react-native-swipe-list-view';
import * as config from '../../config';


const _request ="PEDIDO";

export default class Request extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      /*cod_cliente: '',
      nome: '',
      telefone: '',
      endereco: '',
      observacao: '',
      cidade: '',
      estado: '',
      limite: '',
      saldo_devedor: '',
      saldo_compra: '',
      data: ''*/
      pedido: [],
    };
    const { navigation } = this.props;
    //this.aysncData();
    //this.teste();
    this.willFocuSub={};
    this.willFocuSub = this.props.navigation.addListener(
      'willFocus',
      ()=>{
        console.log('voltando');
        this.contabilizaProdutos();
      }
    );
  }

  contabilizaProdutos(){
    
    AsyncStorage.getItem(_request,(error,result) => {
      if(result){
        //console.log(result);
        //console.log(JSON.parse(result));
        this.setState({pedido: JSON.parse(result)});
      }else{
       //alert('não tem nada');
      }
    });
    
  }
  

  componentDidMount(){
    
    //AsyncStorage.removeItem(_request)
  }

  componentWillUnmount(){
    
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

                <View style={{flex: 0, flexDirection: 'row', borderBottomWidth: 0.5,borderBottomColor: '#000000'}}>
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
          <View style={styles.card} onPress={()=>{}}>
              <View style={styles.cardContent}>
                <View style={{ flex: 2}}>
                  <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>Data/Hora</Text>
                  <View style={{flex: 0, flexDirection: 'row'}}>
                    <Text style={{marginRight: 10}}>{new Date().getDate()}/{new Date().getMonth()+1}/{new Date().getFullYear()}</Text>
                    <Text>{new Date().getHours()}:{new Date().getMinutes()<10?'0'+new Date().getMinutes(): new Date().getMinutes()}</Text>
                  </View>
                 
                </View>
                <View style={{flex: 2}}>
                  <Text style={{fontWeight: '600', 
                  color: 'black', fontSize: 15}}>
                    Forma de pagamento
                  </Text>
                  <Text>DINHEIRO</Text>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.float}>
                    <AntDesign name={'plus'} size={25} color="#ffffff" onPress={()=>{
                      this.props.navigation.navigate('Produto');
                    }}/>
                  </View>
                </View>
              </View>
          </View>      
 
        <View style={{backgroundColor: "#E0E0E0", padding: 10,flex: 1}}>
            <Text>Itens do pedido</Text>
            {this.state.pedido.length==0
            ?<View style={{backgroundColor: '#E0E0E0',
              borderWidth: 0.4, borderColor: 'gray',
              alignItems: 'center', paddingTop: 10,
              paddingBottom: 10
              }}>
              <Text>Nenhum item no pedido</Text>
            </View>
            :
           /* <FlatList
            data={this.state.pedido}
            numColumns={1}
            renderItem={({item, index}) =>

                <View style={{
                  borderRadius: 5,
                  borderWidth: 0.6,
                  borderColor: '#EEEEEE',
                  elevation: 2,
                }}>
                  <TouchableHighlight>
                    <View style={{flex: 0, padding: 10, flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text style={{
                          fontWeight: '800', color: 'black'
                        }}>
                        {item.cod_produto}</Text>
                        
                        <Text>Quantidade: {Number(item.qtd)} |</Text>
                        <Text>Preço: {item.preco_uni} </Text>
                        
                        
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text>Total: {item.preco_venda}</Text>
                      </View>


                    </View>
                  </TouchableHighlight>
                </View>
            }
            />*/
            <SwipeListView
              data={this.state.pedido}
              renderItem={(data, rowMap) => (
                <View style={{
                  borderRadius: 5,
                  borderWidth: 0.6,
                  backgroundColor: '#ccc',
                  borderColor: '#EEEEEE',
                  elevation: 2,
                }}>
                      <View style={{flex: 0, padding: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontWeight: '800', color: 'black', flex: 1}}>
                            {data.item.cod_produto}
                          </Text>
                          <Text style={{flex: 5}}>
                            {data.item.descricao}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                           <Text>Quantidade:</Text> 
                          </View>
                          <View style={{flex: 1, alignItems: 'center'}}>
                            <Text >Preço: </Text>
                          </View>
                          <View style={{flex: 1, alignItems: 'center'}}>
                            <Text >Total: </Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>

                          <View style={{flex: 1, alignItems: 'stretch'}}>
                            <Text >{Number(data.item.qtd)} </Text>
                          </View>
                          <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text >{data.item.preco_uni} </Text> 
                          </View>
                          <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text>{data.item.preco_venda}</Text>
                          </View>
 
                        </View>
                      </View>
                      
                                      
                </View>
              )}
              renderHiddenItem={({data, index}, rowMap) => (
                <View style={styles.rowBack}>
                  <Text style={{flex: 1}}></Text>
                  <TouchableNativeFeedback style={{paddingTop: 5, paddingBottom:5, 
                  backgroundColor: 'red'}} 
                  onPress={()=> {
                    
                    let aux = this.state.pedido;
                    let newAux = [];

                    for(let e in aux){
                      if(e!=index){
                        console.log(e);
                        newAux.push(aux[e]);
                      }
                      
                    }
                    console.log(newAux);
                    AsyncStorage.setItem(_request,JSON.stringify(newAux));
                    this.setState({pedido: newAux});

                  }}
                  >
                    
                    <Text style={{color: 'white'}}>Remover</Text>
                   
                  </TouchableNativeFeedback>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          }
          
          
        </View>

        <View >
           <Button title="confirmar pedido" onPress={
             ()=> AsyncStorage.removeItem(_request)
           }/> 
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
    flex: 0, flexDirection: 'row', paddingTop: 15, 
    paddingBottom:15, borderBottomColor: 'gray', borderBottomWidth: 0.65,
    paddingLeft: 10,paddingRight: 10
  },
  cardContentOneRow: {
    paddingLeft: 10,paddingRight: 10,
    paddingTop: 15, paddingBottom:15,borderBottomColor: 'gray', borderBottomWidth: 0.65,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    //height: 50,
},
rowBack: {
  alignItems: 'center',
  backgroundColor: 'red',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 15,
  borderWidth: 0.6,
  borderColor: '#eeeeee'
},
  float: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#30dac5',
    marginTop: 2,                                   
   // position: 'absolute', 
    justifyContent: "center",
    alignItems: "center",                                     
    //bottom: 10,                                                    
    //right: 15,
    elevation: 3
  }
  
});
