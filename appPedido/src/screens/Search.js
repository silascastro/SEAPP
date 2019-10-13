import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableNativeFeedback, ActivityIndicator, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-gesture-handler';
const LoginModule = NativeModules.LoginModule;

class LogoTitle extends React.Component {
  render() {
    return (
      <TextInput placeholder="Pesquise alguma coisa" placeholderTextColor="#ffffff" style={{color: 'white'}}/>
    );
  }
}

export default class Search extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  static navigationOptions ={
    //title: 'Pesquisa',
    headerTitle: <LogoTitle/>,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#247869',
      
    },
    tabBarVisible: false,
    headerRight: <View style={{margin: 10}}>
        <Icon name={'close'} size={25} color="#ffffff" onPress={()=>navigation.navigate('Home')}/>
      </View>
  };

  componentDidMount(){
    LoginModule.logoff();
  }

  render() {
    
    return (
      <View style={styles.container}>
        
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
