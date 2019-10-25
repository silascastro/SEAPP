import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, 
TouchableNativeFeedback,StatusBar, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {title: 'Pedidos', subtitle: 'Crie e gerencie os pedidos', icon: 'local-offer', type: Icon}, 
  {title: 'Clientes', subtitle: 'Analise e gerencie seus clientes', icon: 'people', type: Icon}
];

const ToastModule = NativeModules.ToastModule;

export default class Home extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  static navigationOptions = ({navigation}) => ({
      title: 'Home',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#247869',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center'
        },
        tabBarVisible: true,
        headerRight: /*<View style={{margin: 10}}>
              <Icon name={'search'} size={25} color="#ffffff" onPress={()=>navigation.navigate('Search')}/>
            </View>*/null
  });

  formatCurrency(value){
    var tmp = value+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if(tmp.length > 6){
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return tmp;
  }


  componentDidMount(){
   let e = this.props.navigation.getParam('message')
   if(e!=null)
    ToastModule.show(e,3000);
   
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#194c40" barStyle="light-content" />
        <FlatList
          style={{}}
          data={DATA}
          renderItem={({item})=>
            <View style={styles.card} >
              <TouchableNativeFeedback onPress={()=>{
                if(item.title == "Clientes"){
                  this.props.navigation.push('Cliente');
                }
                if(item.title == "Pedidos"){
                  this.props.navigation.push('Pedido');
                }
              }}>

                <View style={styles.cardContent}>
                  <View style={{flex: 1,alignItems: 'center'}}>
                    <item.type name={item.icon} size={25} color="black"/> 
                  </View>
                  <View style={{flex: 6, textDecorationStyle: 'solid', textDecorationColor: 'red'}}>
                    <Text style={{fontWeight: '700', fontSize: 15}}>{item.title}</Text>
                    
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
