import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Statusbar} from 'react-native';


export default class Login extends Component {
  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.loginCard}>
          <TextInput placeholder="Digite aqui o seu email"  underlineColorAndroid="#0000ff" />
          <TextInput  underlineColorAndroid='#0000ff' textContentType='password' placeholder="Senha" secureTextEntry={true}/>
          <View style={styles.lembrarSenha}>
            <Text >Lembrar minha senha</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <Button title="login" color="#124d34" />
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
    //backgroundColor: '#F5FCFF',
    backgroundColor: '#3ca597',
  },
  loginCard:{
    //height: 40,
    marginTop: 50,
    marginBottom: 10, 
    marginLeft: 20, 
    marginRight: 20, 
    backgroundColor: '#ffffff'
  },
  lembrarSenha: {
    height: 30
  },
  btn:{
    marginLeft: 20, 
    marginRight: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
