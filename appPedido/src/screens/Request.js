import React, {Component} from 'react';
import {DrawerLayoutAndroid,Platform, StyleSheet, Text, View,Button, FlatList, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';


const DATA = [
  {title: 'Pedidos', subtitle: 'Crie e gerencie os pedidos', icon: 'local-offer', type: Icon}, {title: 'Clientes', subtitle: 'Analise e gerencie seus clientes', icon: 'people', type: Icon},{title: 'Produtos', subtitle: 'Analise e gerencie seus produtos', icon: 'md-cube' , type: Ionicons},{title: 'Financeiro', subtitle: 'Posição financeira dos clientes', icon: 'finance',type: MaterialCommunityIcons}
];

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

    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => navigationView}
        drawerLockMode="locked-closed"
       
      >
        
      <View style={{flex: 1, alignItems: 'center'}}>
        <Button title="teste" onPress={()=>{this.refs['DRAWER'].openDrawer();}}/>
      </View>
    </DrawerLayoutAndroid>
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
