import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';


export default class Inventario extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
    };

  }
  

  componentDidMount(){
    
  }

  
 
  static navigationOptions = ({navigation}) => {
      const { params = {} } = navigation.state;
      return {
        title: 'Inventário',
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
           <Text>Inventário</Text>
      </View>
    );                                                                                                                                    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
});
