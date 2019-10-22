import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, View,
   TextInput, 
   Button,
   ActivityIndicator,  
   FlatList, TouchableNativeFeedback} from 'react-native';
   import AntDesign from 'react-native-vector-icons/AntDesign'

   const API = "http://177.16.53.198:3000/";


export default class ClienteContas extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true, clientes: [], pesquisado: false, input: '', contasareceber: []};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Contas',
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
    this.getContasAReceber(this.props.navigation.getParam('cod_cliente'));
    //this.getContasAReceber(608);
  }

  getContasAReceber(id){
    fetch(API+"contasreceber/"+id, {
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
        for(let e in aux){
          aux[e].status = "aberto";
        }
        this.setState({contasareceber: aux});
        this.setState({loading: false});
        
      }).catch((err)=>{
        Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
      });
  }


  getClientes(){
      fetch(API+'clientes/byname/'+(this.state.input).toUpperCase(), {
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
        let aux = [];
        
        for(e in resp){
          aux.push(resp[e]);
        }
        
        
        this.setState({clientes: aux});
        this.setState({loading: false});
        
      }).catch((err)=>{
        Alert.alert('Atenção', err);
      });
    
  }

  changeState(index, _status){
    let aux = this.state.contasareceber;
    aux[index].status = _status;
    this.setState({contasareceber: aux});
}

  format(number){
    return number;
  }

  render() {
    return (
      this.state.loading?
      <View>
          <ActivityIndicator size="large"/>
      </View>
      :
      <FlatList
        style={{}}
        ListHeaderComponent={()=>
          <View style={{marginLeft: 10, marginRight: 10, paddingTop: 20, paddingBottom: 15}}>
                
                <View style={{marginLeft: 20,elevation: 2,}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '500'}}>Cliente: </Text>
                    <Text>{this.props.navigation.getParam('nome')}</Text>
                  </View>
                  <View style={{flex: 0 ,flexDirection: 'row',marginBottom: 15}}>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '500'}}>Endereço: </Text>
                        <Text>{this.props.navigation.getParam('endereco')}</Text>
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '500'}}>Telefone: </Text>
                        <Text>{this.props.navigation.getParam('telefone')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 15, borderBottomWidth: 0.5, borderColor: 'gray'}}>
                  <View style={{flex: 1, alignContent: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Documento</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Vencimento</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Valor</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Recebido</Text>
                  </View>
                </View>
              </View>
        }
        ListFooterComponent={()=>
          <View style={{marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 15, borderTopWidth: 0.5, borderColor: 'gray'}}>
            <View style={{marginLeft: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: '600'}}>Total a Receber: </Text>
                <Text>10000,00</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: '600'}}>Total a Recebido: </Text>
                <Text>0,00</Text>
              </View>
            </View>

            
          </View>
        }
        data={this.state.contasareceber}
        renderItem={({item, index})=>
        <TouchableNativeFeedback >
        <View style={{elevation: 5,paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
          <View style={{flexDirection: 'row', marginLeft: 15}}>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
              <Text style={{}}>{item.documento}</Text>
            </View>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}> 
              <Text style={{}}>{item.dt_vencimento}</Text>
            </View>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
              <Text style={{}}>{item.valor}</Text>
            </View>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
              <AntDesign name={this.state.contasareceber[index].status == 'aberto' ? 'close' : 'check'} 
              size={25} 
              color={this.state.contasareceber[index].status == 'aberto' ? 'red' : 'green'}
              title={this.state.contasareceber[index].status}
              style={{}} onPress={()=>{
                if(this.state.contasareceber[index].status == 'aberto')
                  this.changeState(index,'fechado');
                else
                  this.changeState(index,'aberto'); 
              }}/>
            </View>

          </View>
        </View>

      </TouchableNativeFeedback>
    }
  />
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
    marginRight: 2,
    marginLeft: 2,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 5,
    marginBottom:5,
    //alignContent: 'center',
    //justifyContent: 'center',
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
