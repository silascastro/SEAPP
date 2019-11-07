import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableNativeFeedback, ActivityIndicator, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-gesture-handler';
const LoginModule = NativeModules.LoginModule;

export default class Search extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true, searchValue:''
    };
  }

  static navigationOptions = ({navigation})=>{
    const { params } = navigation.state;
    return {
    //title: 'Pesquisa',
    headerTitle: <TextInput placeholder="Pesquise alguma coisa" placeholderTextColor="#ffffff"  style={{color: 'white'}} value={(navigation.getParam('inputValue'))} onChangeText={(value)=>{params.changeInput(value);}}/>,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#247869',
      
    },
    tabBarVisible: false,
    headerRight: (navigation.getParam('inputValue')!=''? <View style={{margin: 10}}>
    <Icon name={'close'} size={25} color="#ffffff" onPress={()=>params.changeInput('')}/>
  </View>: null),
    };
  };

  componentDidMount(){
    this.props.navigation.setParams({
      inputValue: this.searchValue,
      changeInput: this._changeInput
    });
  }


  _changeInput = (value) => {
    this.setState({
      searchValue: value,
    });
    this.props.navigation.setParams({
      inputValue: value,
    });

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
