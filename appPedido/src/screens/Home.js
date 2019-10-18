import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableNativeFeedback,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import CheckBox from '../components/CheckBox';

const DATA = [
  {title: 'Pedidos', subtitle: 'Crie e gerencie os pedidos', icon: 'local-offer', type: Icon}, {title: 'Clientes', subtitle: 'Analise e gerencie seus clientes', icon: 'people', type: Icon},{title: 'Produtos', subtitle: 'Analise e gerencie seus produtos', icon: 'md-cube' , type: Ionicons},
];

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

  componentDidMount(){
    
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
        

        <View style={styles.float}>
          <AntDesign name={'plus'} size={25} color="#ffffff" onPress={()=>{
            this.props.navigation.push('Request');
          }}/>
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
