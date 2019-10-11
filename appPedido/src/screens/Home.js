import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DATA = [
  {title: 'Pedidos', subtitle: 'Crie e gerencie os pedidos', icon: 'local-offer', type: Icon}, {title: 'Clientes', subtitle: 'Analise e gerencie seus clientes', icon: 'people', type: Icon},{title: 'Produtos', subtitle: 'Analise e gerencie seus produtos', icon: 'md-cube' , type: Ionicons},{title: 'Financeiro', subtitle: 'Posição financeira dos clientes', icon: 'finance',type: MaterialCommunityIcons}
];

export default class Home extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  static navigationOptions ={
    title: 'Home',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#247869',
    },
  };

  componentDidMount(){
    //let aux = []
    //this.setState({menu: })
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000);
  }

  render() {
    
    return (
      this.state.loading?
      <ActivityIndicator size="large"/>:
      <View style={styles.container}>
        <FlatList
          style={{}}
          data={DATA}
          renderItem={({item})=>
            <View style={styles.card}>
              <TouchableNativeFeedback >

                <View style={styles.cardContent}>
                  <View style={{flex: 1,alignItems: 'center'}}>
                    <item.type name={item.icon} size={25} color="black"/>
                    
                  </View>
                  <View style={{flex: 6, textDecorationStyle: 'solid', textDecorationColor: 'red'}}>
                    <Text style={{fontWeight: '700', fontSize: 15}}>{item.title}</Text>
                    <Text style={{}}>{item.subtitle}</Text>
                  </View>
                </View>
                
              </TouchableNativeFeedback>
            </View>
          }
        />

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
    textAlign: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    textDecorationStyle: "solid",
  },
  cardContent:{
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
    flexDirection: "row",
    
    //alignSelf: 'center',
   // flex: 0
   
  },
  
});
