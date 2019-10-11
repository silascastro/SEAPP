import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default class Config extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Configurações',
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
    
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Configurações</Text>
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
