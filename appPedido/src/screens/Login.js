import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, StatusBar, Switch, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {rememberPass: false, language: ''};
  }

  render() {
    return (
      
      <View style={styles.container}>
      <StatusBar backgroundColor="#194c40" barStyle="light-content" />
        <View style={styles.loginCard}>
          <View style={styles.user}>
            <View style={{justifyContent: 'center', }}>
              <Icon name="person" size={25} color="black" style={{alignSelf: 'baseline'}}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Picker
                selectedValue={this.state.language}
                mode="dialog"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </View>
          <View>
            <View style={styles.password}>
              <View style={{justifyContent: 'center', }}>
                <Icon name="lock" size={25} color="black" style={{alignSelf: 'baseline'}}/>
              </View>
              <View style={{justifyContent: 'center', flex: 1 }}>
                <TextInput  /*underlineColorAndroid='#0000ff'*/ textContentType='password' placeholder="Senha" secureTextEntry={true}/>
              </View>
            </View>
          </View>
          
          <View style={styles.lembrarSenha}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text >Lembrar minha senha</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Switch value={this.state.rememberPass} onValueChange={()=>{
                this.setState({rememberPass: !this.state.rememberPass});
              }}/>
            </View>
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
    backgroundColor: '#3ca597',
  },
  loginCard:{
    //height: 40,
    elevation: 5,
    marginTop: 50,
    marginBottom: 10, 
    marginLeft: 20, 
    marginRight: 20, 
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  user: {
    flex: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  password: {
    flex: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  lembrarSenha: {
    height: 40,
    flex: 0,
    flexDirection: 'row'
  },
  btn:{
    marginLeft: 20, 
    marginRight: 20,
    elevation: 5
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
