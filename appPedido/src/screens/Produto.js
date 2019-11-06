import React, {Component} from 'react';
import {Alert,DrawerLayoutAndroid,StyleSheet, Text, Button,View, TextInput, ActivityIndicator, FlatList, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import * as config from '../../config';

const _request ="PEDIDO";

export default class Produto extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: false, pesquisado: false, 
      input: '', produtos: [], qtds: [], 
      produtoSelecionado: '', select_qtd: '1',
      loadingAsync: false,
    };
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
    },tabBarVisible: true,
  });

  componentDidMount(){
    this.getIp();
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
        qtd_selec: "1",
        };
        aux.push(item);
      }

      this.setState({produtos: aux});
      this.setState({loading: false});
      //console.log(aux);
      
    }).catch((err)=>{
      this.setState({loading: false});
      //Alert.alert('Atenção', 'erro');
    });
  }
    
  changeText(value, index){
    alert(index);
    let aux = this.state.produtos;
    aux[index].qtd_selec = value;
    alert(aux[index].qtd_selec);
    this.setState({produtos: aux});
  }


  addValue(index){
    let aux = this.state.produtos;
    aux[index].qtd_selec=(Number(aux[index].qtd_selec)+1).toString();
    this.setState({produtos: aux});
  }

  minusValue(index){
    let aux = this.state.produtos;
    aux[index].qtd_selec=(Number(aux[index].qtd_selec)-1).toString();
    this.setState({produtos: aux});
    
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
  
  addItemToRequest(newItem){
    AsyncStorage.getItem(_request,(error,result) => {
      if(result){
        //alert(result);
        let aux = JSON.parse(result);
        aux.push(newItem);
        console.log(aux);
        AsyncStorage.setItem(_request,JSON.stringify(aux));
      }else{
        let aux = [];
        aux.push(newItem);
        AsyncStorage.setItem(_request,JSON.stringify(aux));
      }
    });
  }

  render() {
    var navigationView = (
      <View>
        <Text>drawer</Text>
      </View>

    );
    return (
      
      <DrawerLayoutAndroid
      drawerWidth={300}
      ref={'DRAWER'}
      drawerLockMode="locked-closed"      
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={() => navigationView}>
        {this.state.loadingAsync? 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        
          <ActivityIndicator size="large"/>
          
        </View>
        
        :
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput placeholder="Digite o nome do produto" 
            style={{flex: 4}} 
            value={this.state.input} 
            onChangeText={(value)=>{
              
                this.setState({produtoSelecionado: ''});
                this.setState({loading: true});
                this.setState({pesquisado: true});
                this.setState({input: value});
                this.getProdutos();
             
            }}
          />
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

                      }}>
                      <View style={styles.cardContent}>
                        <View style={styles.name}>
                          <Text style={{  fontWeight: '600', 
                          fontSize: 15, color: 'black',flex: 1}}>{item.cod_produto}</Text>
                          <Text style={{flex: 3}}>{item.descricao}</Text> 
                        </View>
                        <View style={{paddingLeft: 10, paddingRight: 10,
                          paddingBottom: 5, paddingTop: 5, flex: 0, flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                              <Text>Marca</Text>
                              <Text style={{fontWeight: '800'}}>{item.marca!=''?item.marca: 'S/N'}</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <Text>Quantidade</Text>
                              <Text style={{fontWeight: '700', color: Number(item.qtd)<=0 ? 'red': 'black'}}>{Number(item.qtd)}</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                              <Text>Valor</Text>
                              <Text style={{fontWeight: '700', color: 'black'}}>
                              {this.numberToReal(Number(item.preco_venda))}</Text>
                            </View>
                        </View>
                      
                        <View style={{paddingLeft: 10, 
                        backgroundColor: '#EEEEEE'}}>
                          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Button title="adicionar ao pedido" color="green"
                              onPress={()=>{
                                this.setState({produtoSelecionado: item});
                                //this.refs['DRAWER'].openDrawer();
                              }}
                            />
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
      {this.state.produtoSelecionado!=''?
      <View style={{flex: 1, backgroundColor: '#fff', elevation: 5}}>
        <View style={{backgroundColor: /*'#EEEEEE'*/'#ffffff',padding: 10 }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'black'}}>Produto: </Text> 
            </View>
            <View style={{flex: 3, alignItems: 'flex-end', textAlign: 'right'}}>
              <Text>
                {this.state.produtoSelecionado.cod_produto}-{this.state.produtoSelecionado.descricao}
              </Text>              
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'black'}}>Preço: </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{alignSelf: 'flex-end'}}>{this.numberToReal(Number(this.state.produtoSelecionado.preco_venda))}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'black'}}>Total: </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{alignSelf: 'flex-end'}}>{
                Number(this.state.select_qtd)>0?
                this.numberToReal(Number(Number(this.state.select_qtd)*Number(this.state.produtoSelecionado.preco_venda))):
                '0,00'
              }</Text>
            </View>
          </View>
        </View>
        
        <Text style={{margin: 10, fontSize: 15, textAlign: 'center'}}>Selecione a quantidade</Text>
          
            <View style={{flex: 2,}}>
              <View style={{flex: 0, flexDirection: 'row', flex: 1}}>
                <View style={{alignItems: 'center',flex: 1,}}>  
                  <View style={styles.float}>
                    <AntDesign name='minus' size={25} color="black" style={{}}
                    onPress={()=>{

                      let {select_qtd} = this.state;
                      if(Number(select_qtd != '1')){
                      
                      select_qtd = Number(select_qtd)-1;
                      //alert(qtds[index]);
                      this.setState({
                        select_qtd: select_qtd.toString()
                      });
                    }
                    }}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center' ,flex: 1,}}>

                  <TextInput /*value={this.state.produtos[index].qtd_selec} */
                    value={this.state.select_qtd}
                    //editable={true}
                    placeholder="qtd"
                    keyboardType="numeric"
                    
                    onChangeText={(value)=>{
                      
                      this.setState({
                        select_qtd: value,
                      });
                    
                  }}
                  
                  />
                  
                </View>
                <View style={{alignItems: 'center', 
                flex: 1}}>
                  <View style={styles.float}>
                    <AntDesign name='plus' size={25} 
                      color="black" style={{}}
                      onPress={()=>{
                        let {select_qtd} = this.state;
                        let aux = select_qtd;
                        
                        aux = Number(aux)+1;
                        
                        this.setState({select_qtd: aux.toString()});
                      }
                      /*this.state.produtos[index].qtd_selec+=1*/}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
                <Button title="confirmar" onPress={()=>{
                  if(this.state.select_qtd == '' || this.state.select_qtd.startsWith('-')){
                    Alert.alert('Atenção', 'quantidade inválida!',
                            [
                              {
                                text: 'ok',
                                onPress: () => console.log('quantidade inválida'),
                                style: 'cancel',
                              }, 
                            ])
                  }else{
                  this.addItemToRequest({
                    cod_produto: this.state.produtoSelecionado.cod_produto,
                    descricao: this.state.produtoSelecionado.descricao, 
                    marca: this.state.produtoSelecionado.marca,
                    preco_venda: Number(this.state.select_qtd)*Number(this.state.produtoSelecionado.preco_venda), 
                    qtd: Number(this.state.select_qtd),
                    preco_uni: Number(this.state.produtoSelecionado.preco_venda)
                  });
                  this.setState({loadingAsync: true});
                  setTimeout(() => {
                    //this.refs['DRAWER'].closeDrawer();
                    this.setState({loadingAsync: false});
                    this.props.navigation.navigate('Request', {
                      cod_produto: this.state.produtoSelecionado.cod_produto,
                      descricao: this.state.produtoSelecionado.descricao, 
                      marca: this.state.produtoSelecionado.marca,
                      preco_venda: this.numberToReal(Number(Number(this.state.select_qtd)*Number(this.state.produtoSelecionado.preco_venda))), 
                      qtd_selec: this.state.select_qtd,
                    })
                  }, 2000);
                }
                }}/>
            </View>

      </View>
      :
      null
      }
      </View>
        }
      </DrawerLayoutAndroid>
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
    opacity: 1.65,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flex: 1,
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
name : {
  borderBottomColor: 'gray', 
  borderBottomWidth: 0.65,
  paddingLeft: 10,paddingRight:10,
  paddingTop: 5,paddingBottom: 5 
  ,flex: 0, flexDirection: 'row'
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
