import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, TextInput, View, 
   Button,
   ActivityIndicator,  
   FlatList, TouchableNativeFeedback,
   NativeModules, 
NativeEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as config from '../../config';
import {TextInputMask} from 'react-native-masked-text';
import { StackActions, NavigationActions} from 'react-navigation';
   import AntDesign from 'react-native-vector-icons/AntDesign';

const API = "http://177.16.53.198:3000/";
const LoginModule = NativeModules.LoginModule;
const eventEmitter = new NativeEventEmitter(NativeModules.LoginModule);
let _cod_vendedor;
let _nome_vendedor;
let _cod_celular;

export default class ClienteContas extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true, 
      contasareceber: [], 
      totalReceber: '',
      totalRecebido: '', 
      saldoPendente: '',
      cod_vendedor: '',
      nome_vendedor: '',
      cod_celular: '',
      moeda: '',
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
    this.getIp();
    this.getContasAReceber(this.props.navigation.getParam('cod_cliente'));
    //this.getContasAReceber(608);
    eventEmitter.addListener(
      'userData', (e) =>{
        console.log(e.user);
        //alert(e.user);
        _cod_vendedor = e.user; 
      }
    );
    LoginModule.getUser();
    //alert(_cod_vendedor);
    this.getVendedor();
    this.setState({
      cod_celular: _cod_celular, 
      nome_vendedor: _nome_vendedor, 
      cod_vendedor: _cod_vendedor
    });

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

  getContasAReceber(id){
    fetch(config.url+"contasreceber/"+id, {
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
          aux[e].valor_parcial = '';
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
      fetch(config.url+'clientes/byname/'+(this.state.input).toUpperCase(), {
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

  getVendedor(){
    fetch(config.url+'funcionarios/byid/'+_cod_vendedor, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response)=> response.json())
      .then((resp) => {
          _nome_vendedor = resp.nome;
          _cod_celular = resp.codigo1;
          
      }).catch((err)=>{
        //this.setState({loading: false});
        
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

    fetch(config.url+'recebimentoexterno/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      
    }).then((response) => response.json()).then((resp) => {
      const {dispatch} = this.props.navigation;
      const resetActionHome = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home', 
          params: {message: 'contas recebidas com sucesso!'} }),
        ],
      });
      this.setState({loading: false});
      dispatch(resetActionHome);
      
      console.log(resp);
    }).catch((err)=>{
      Alert.alert('Atenção', JSON.stringify(err));
      this.setState({loading: false});
      console.log(err);
    });
  }

  fechaConta(data, cod_vendedor, nome_vendedor, cod_celular){
    //alert('entrou');
    //alert('nome: '+_nome_vendedor+'cod_celular'+_cod_celular+'cod_vendedor'+_cod_vendedor);
    this.setState({loading: true});
    let aux = data;
    console.log(nome_vendedor);
    console.log(cod_celular);
    for(let e in aux){
      if(aux[e].status == "fechado"){
        const data = {
          sequencia: aux[e].sequencia,
          cod_vendedor: _cod_vendedor,
          cod_cliente: this.props.navigation.getParam('cod_cliente'),
          nome_vendedor: _nome_vendedor,
          codigo_celular: _cod_celular,
          nome_cliente: this.props.navigation.getParam('nome'),
          numero_documento: aux[e].documento,
          data_vencimento: aux[e].dt_vencimento,
          valor_documento: aux[e].valor,
          valor_recebido: aux[e].valor_parcial!=''? parseFloat((aux[e].valor_parcial).replace(/,/g,'.')):aux[e].valor
        };
        console.log(data);
        //alert(JSON.stringify(data));
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
    <View style={{flex: 1}}>
    <View style={{marginLeft: 10, marginRight: 10, 
      paddingTop: 10,}}>
                
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
                    <Text style={{fontWeight: '600'}}>Valor parcial</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Recebido</Text>
                  </View>
                </View>
      </View>
      
      <FlatList
        style={{}}
        //ListHeaderComponent={()=>}
        //ListFooterComponent={()=>{}}
        data={this.state.contasareceber}
        renderItem={({item, index})=>
        <TouchableNativeFeedback >
        <View style={{elevation: 5,paddingTop: 5, 
         paddingLeft: 10, 
          paddingRight: 10}}>
          <View style={{flexDirection: 'row', marginLeft: 5}}>
            <View style={{flex: 1, alignContent: 'center', 
            alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{}}>{item.documento}</Text>
            </View>
            <View style={{flex: 1, alignContent: 'center', 
            alignItems: 'center', justifyContent: 'center'}}> 
              <Text style={{}}>{item.dt_vencimento.split('-')[2]+'/'+item.dt_vencimento.split('-')[1]+'/'+item.dt_vencimento.split('-')[0]}</Text>
            </View>
            <View style={{flex: 1, 
            alignContent: 'center', 
            alignItems: 'flex-end', justifyContent: 'center'}}>
              <Text style={{}}>{this.state.moeda == "G"? this.numberToReal(Number(item.valor)).split(',')[0] : this.numberToReal(Number(item.valor))}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <View style={{flex: 1, alignContent: 'center', 
              alignItems: 'center'}}>
                <TextInputMask
                  type={'money'}
                  options={{
                    precision: 2,
                    unit: '',
                  }}
                  keyboardType="number-pad"
                  value={this.state.contasareceber[index].valor_parcial}
                  underlineColorAndroid="blue"
                  onChangeText={text => {
                    let {contasareceber} = this.state;
                    //alert(parseFloat((text.replace(".","")).replace(/,/g,'.')));
                    if(parseFloat((text.replace(".","")).replace(/,/g,'.'))>Number(this.state.contasareceber[index].valor)){
                      //this.state.moeda == "G"? this.numberToReal(Number(item.valor)).split(',')[0] : this.numberToReal(Number(item.valor))
                      contasareceber[index].valor_parcial = this.numberToReal(Number(this.state.contasareceber[index].valor));
                    }else{
                  
                    contasareceber[index].valor_parcial = text;
                    }
                    this.setState({
                      contasareceber
                    });
                    //let n = this.state.contasareceber[index].valor_parcial;
                    //parseFloat(n.replace(/,/g,'.'));
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <AntDesign name={this.state.contasareceber[index].status == 'aberto' ? 'close' : 'check'} 
              size={25} 
              color={this.state.contasareceber[index].status == 'aberto' ? 'red' : 'green'}
              title={this.state.contasareceber[index].status}
              style={{}} onPress={()=>{
                let n = Number(this.state.totalRecebido);  
                if(this.state.contasareceber[index].status == 'aberto'){
                  if(this.state.contasareceber[index].valor_parcial!=''){
                    let _valor_parcial = this.state.contasareceber[index].valor_parcial.replace(".","");
                    n+=parseFloat((_valor_parcial).replace(/,/g,'.'));
                  }else{
                    n += Number(this.state.contasareceber[index].valor);
                  }
                    this.setState({totalRecebido: n});
                  //alert(this.state.totalReceber);
                  let pendente = this.state.totalReceber - n;
                  this.setState({saldoPendente: pendente});
                  this.changeState(index,'fechado');
                }else{
                  if(this.state.contasareceber[index].valor_parcial!=''){
                    let _valor_parcial = this.state.contasareceber[index].valor_parcial.replace(".","");
                    n-=parseFloat((_valor_parcial).replace(/,/g,'.'));
                  }else{
                    n-= Number(this.state.contasareceber[index].valor);
                  }
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

  <View style={{marginLeft: 10, marginRight: 10, 
    paddingTop: 10, paddingBottom: 15}}>
    <View style={{marginLeft: 15, flexDirection: 'row', 
     borderTopWidth: 0.5, borderColor: 'gray'}}>
      <View style={{flex: 2}}>
        <Text style={{fontWeight: '600', color: 'black'}}>Total a Receber: </Text>
        <Text style={{fontWeight: '600', color: 'black'}}>Total a Recebido: </Text>
        <Text style={{fontWeight: '600', color: 'black'}}>Saldo Pendente: </Text>
        
      </View>
      <View style={{flex: 1, alignContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{fontWeight: '500', color: 'black'}}>{this.state.moeda == "G"? this.numberToReal(Number(this.state.totalReceber)).split(',')[0]:this.numberToReal(Number(this.state.totalReceber))}</Text>
        <Text style={{fontWeight: '500', color: 'black'}}>{this.state.moeda == "G"? this.numberToReal(Number(this.state.totalRecebido)).split(',')[0]:this.numberToReal(Number(this.state.totalRecebido))}</Text>
        <Text style={{fontWeight: '500', color: 'black'}}>{this.state.moeda == "G"? this.numberToReal(Number(this.state.saldoPendente)).split(',')[0]:this.numberToReal(Number(this.state.saldoPendente))}</Text>
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
            onPress: () => {
              
              this.fechaConta(
                this.state.contasareceber, 
                this.state.cod_vendedor,
                this.state.nome_vendedor,
                this.state.cod_celular
              );
          },
            
          }
        ]
        );
      }}
    />
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
