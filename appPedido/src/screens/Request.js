import React, {Component} from 'react';
import {DrawerLayoutAndroid,Platform, StyleSheet, Text ,View,Button, FlatList, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class Request extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true};
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

  componentDidMount(){

  }

  render(){
    return (
      <View style={styles.container}>
          <TouchableNativeFeedback  onPress={()=>{}}>
              <View style={styles.cardContent}>
                <View style={{ flex: 1}}>
                  <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>Cliente</Text>
                  <Text>Selecione um cliente</Text>
                </View>
                <View>
                  <Button title="Procurar"/>
                </View>
              </View>
          </TouchableNativeFeedback>
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
