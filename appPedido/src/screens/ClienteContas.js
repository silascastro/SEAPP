import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, View,
   TextInput, 
   ActivityIndicator,  
   FlatList, TouchableNativeFeedback} from 'react-native';


const API = "http://177.42.56.208:3000/";


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
        this.setState({contasareceber: aux});
        this.setState({loading: false});
        
      }).catch((err)=>{
        Alert.alert('Atenção', 'erro ao conectar-se com o servidor!');
      });
  }


  getClientes(){
      fetch(API+'clientes/'+(this.state.input).toUpperCase(), {
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
            <Text>nome</Text>
          </View>
        }
        data={this.state.contasareceber}
        renderItem={({item})=>
            <View style={styles.card}>
                <TouchableNativeFeedback>
                  <View style={styles.cardContent}>
                            <View>

                                <Text>{item.documento}</Text>
                                <Text>{item.valor}</Text>
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
