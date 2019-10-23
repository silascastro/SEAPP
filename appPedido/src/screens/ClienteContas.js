import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, View,
   TextInput, 
   Button,
   ActivityIndicator,  
   FlatList, TouchableNativeFeedback,
   NativeModules, 
DeviceEventEmitter,NativeEventEmitter} from 'react-native';
   import AntDesign from 'react-native-vector-icons/AntDesign';

const API = "http://177.16.53.198:3000/";
const LoginModule = NativeModules.LoginModule;
const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);

export default class ClienteContas extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true, 
      contasareceber: [], 
      totalReceber: '',
      totalRecebido: '', 
      saldoPendente: '',
      cod_vendedor: ''
    };
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
    eventEmitter.addListener(
      'userData', (e) =>{
        console.log(e.user);
        this.setState({cod_vendedor: e.user});       
      }
    );
    LoginModule.getUser();
    //LoginModule.logoff();
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
        let _totalReceber = 0;

        for(e in resp){
          aux.push(resp[e]);
          _totalReceber+=Number(resp[e].valor);
        }

        for(let e in aux){
          aux[e].status = "aberto";
        }

        this.setState({totalReceber: _totalReceber});
        this.setState({contasareceber: aux});
        this.setState({loading: false});
        
      }).catch((err)=>{
        Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
      });
  }

  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
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

  sendData(data){
    fetch(API+'recebimentoexterno/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then().then((resp) => {
      console.log(resp);
    }).catch((err)=>{
      Alert.alert('Atenção', 'erro');
      console.log(err);
    });
  }

  fechaConta(data, cod_vendedor){
    //alert('entrou');
    let aux = data;
    console.log(this.state.contasreceber);
    for(let e in aux){
      if(aux[e].status == "fechado"){
        const data = {
          sequencia: aux[e].sequencia,
          cod_vendedor: cod_vendedor,
          cod_cliente: this.props.navigation.getParam('cod_cliente'),
          nome_cliente: this.props.navigation.getParam('nome'),
          numero_documento: aux[e].documento,
          data_vencimento: aux[e].dt_vencimento,
          valor_documento: aux[e].valor,
          valor_recebido: aux[e].valor
        };
        console.log(data);
        this.sendData(data);
        
      }
      //console.log(aux[e]);
    }
    
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
                
                <View style={{marginLeft: 15, borderBottomWidth: 0.5, borderBottomColor: 'gray', paddingBottom: 5}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '500'}}>Cliente: </Text>
                    <Text>{this.props.navigation.getParam('cod_cliente')+'-'}</Text>
                    <Text>{this.props.navigation.getParam('nome')}</Text>
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
          <View style={{marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 15,}}>
            <View style={{marginLeft: 15, flexDirection: 'row',  borderTopWidth: 0.5, borderColor: 'gray'}}>
              <View style={{flex: 2}}>
                <Text style={{fontWeight: '600'}}>Total a Receber: </Text>
                <Text style={{fontWeight: '600'}}>Total a Recebido: </Text>
                <Text style={{fontWeight: '600'}}>Saldo Pendente: </Text>
                
              </View>
              <View style={{flex: 1, alignContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{}}>{this.numberToReal(Number(this.state.totalReceber))}</Text>
                <Text>{this.numberToReal(Number(this.state.totalRecebido))}</Text>
                <Text>{this.numberToReal(Number(this.state.saldoPendente))}</Text>
              </View>
              
            </View>

            <Button disabled={this.state.totalRecebido > 0 ? false: true} title='confirmar'
              onPress={()=> {
                Alert.alert('Atenção', 'confirma a sua ação?',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                  },
                  {
                    text: 'Confimar',
                    onPress: () => {this.fechaConta(this.state.contasareceber, this.state.cod_vendedor);},
                    
                  }
                ]
                )
              }}
            />
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
              <Text style={{}}>{item.dt_vencimento.split('-')[2]+'/'+item.dt_vencimento.split('-')[1]+'/'+item.dt_vencimento.split('-')[0]}</Text>
            </View>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
              <Text style={{}}>{this.numberToReal(Number(item.valor))}</Text>
            </View>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
              <AntDesign name={this.state.contasareceber[index].status == 'aberto' ? 'close' : 'check'} 
              size={25} 
              color={this.state.contasareceber[index].status == 'aberto' ? 'red' : 'green'}
              title={this.state.contasareceber[index].status}
              style={{}} onPress={()=>{
                let n = Number(this.state.totalRecebido);  
                if(this.state.contasareceber[index].status == 'aberto'){
                  
                  n += Number(this.state.contasareceber[index].valor);
                  this.setState({totalRecebido: n});
                  //alert(this.state.totalReceber);
                  let pendente = this.state.totalReceber - n;
                  this.setState({saldoPendente: pendente});
                  this.changeState(index,'fechado');
                }else{
                  n-= Number(this.state.contasareceber[index].valor);
                  this.setState({totalRecebido: n});
                  let pendente = this.state.totalReceber-n;
                  this.setState({saldoPendente: pendente});
                  this.changeState(index,'aberto'); 
                }
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
