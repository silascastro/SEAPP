import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';


export default class DadosEntrega extends Component<Props> {
  constructor(props){
    super(props);
  }
  

  componentDidMount(){

  }


 
  static navigationOptions = ({navigation}) => {
      const { params = {} } = navigation.state;
      return {
        title: 'Dados Entrega',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#247869',
        },
        headerTitleStyle: {
           fontWeight: 'bold',
           alignSelf: 'center'
        },
        tabBarVisible: true,
      }
  };

  render(){
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
  
});
