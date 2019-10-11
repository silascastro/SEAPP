import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableNativeFeedback, ActivityIndicator, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const LoginModule = NativeModules.LoginModule;

export default class Search extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  static navigationOptions ={
    title: 'Pesquisa',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#247869',
    },
    tabBarVisible: false
  };

  componentDidMount(){
    LoginModule.logoff();
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Search</Text>
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
