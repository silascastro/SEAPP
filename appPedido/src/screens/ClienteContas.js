import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, View,
   TextInput, 
   Button,
   ActivityIndicator,  
   FlatList, TouchableNativeFeedback} from 'react-native';


   const API = "http://192.168.0.7:3000/";


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
        style={styles.list}
        ListHeaderComponent={()=>
          <View style={{flexDirection: 'row', marginBottom: 3}}>
            <Text style={{fontWeight: '800',color: 'black'}}>Cliente: </Text>
            <Text>{this.props.navigation.getParam('nome')}</Text>
          </View>
        }
        data={this.state.contasareceber}
        renderItem={({item, index})=>
            <View style={styles.card}>
                <TouchableNativeFeedback>
                <View style={styles.cardContent}>
                      <View style={{flex: 0, flexDirection: 'row'}}>
                            <View style={{flex: 2,}}>
                                <View style={{flex: 0, flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Documento: </Text>
                                    <Text>{item.documento}</Text>
                                </View>
                                <View style={{flex: 0, flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Valor: </Text>
                                    <Text style={{color: 'green'}}>R${item.valor}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 20,flex: 1, alignContent: 'center'}}>
                                <View style={{width: 80}}>
                                    <Button  
                                    color={this.state.contasareceber[index].status == 'aberto'? 'green': 'red'} 
                                    title={this.state.contasareceber[index].status}  
                                    onPress={()=>{
                                        if(this.state.contasareceber[index].status == 'aberto')
                                        this.changeState(index,'fechado');
                                        else
                                        this.changeState(index,'aberto'); 
                                        
                                    }}/>
                                </View>
                            </View>
                        </View>
                  </View>
                </TouchableNativeFeedback>
            </View>
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
