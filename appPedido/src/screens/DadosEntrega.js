import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput, Text, } from 'react-native';


export default class DadosEntrega extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      nome:'',
      telefone: '',
      celular: '',
      rua: '',
      no: '',
      bairro: '',
      cidade: '',
      cep: '',
      uf: ''
    };
  }
  

  componentDidMount(){
    this.setState({rua: this.props.navigation.getParam('endereco'), 
    no: this.props.navigation.getParam('numero'),
    nome: this.props.navigation.getParam('nome'),
    telefone: this.props.navigation.getParam('telefone'),
    celular: this.props.navigation.getParam('celular'),
    bairro: this.props.navigation.getParam('bairro'),
    cep: this.props.navigation.getParam('cep'),
    cidade: this.props.navigation.getParam('cidade'),
    uf: this.props.navigation.getParam('uf'),
    });
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
          <View style={{flex: 1}}>
            <TextInput style={{}} value={this.state.nome} 
              underlineColorAndroid='#0000ff' 
              accessibilityLabel="nome"
              onChangeText={(value)=>this.setState({nome: value})} 
              placeholder="Nome"
            />
            <View style={{flex: 0, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TextInput style={{}} value={this.state.telefone} 
                  underlineColorAndroid='#0000ff' 
                  accessibilityLabel="telefone"
                  onChangeText={(value)=>this.setState({telefone: value})} 
                  placeholder="Telefone"
                />
              </View>
              <View style={{flex: 1}}>
                <TextInput style={{}} value={this.state.celular} 
                  underlineColorAndroid='#0000ff' 
                  accessibilityLabel="celular"
                  onChangeText={(value)=>this.setState({celular: value})} 
                  placeholder="Celular"
                />
              </View>
            </View>

            <TextInput style={{}} value={this.state.rua} 
              underlineColorAndroid='#0000ff' 
              accessibilityLabel="Rua"
              onChangeText={(value)=>this.setState({rua: value})} 
              placeholder="Rua"
            />
            <View style={{flex: 0, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TextInput style={{}} value={this.state.no} 
                  underlineColorAndroid='#0000ff' 
                  accessibilityLabel="numero"
                  onChangeText={(value)=>this.setState({no: value})} 
                  placeholder="N°"
                />
              </View>
              <View style={{flex: 1}}>
                <TextInput style={{}} value={this.state.bairro} 
                  underlineColorAndroid='#0000ff' 
                  accessibilityLabel="bairro"
                  onChangeText={(value)=>this.setState({bairro: value})} 
                  placeholder="Bairro"
                />
              </View>
            </View>

            <View style={{flex: 0, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TextInput style={{}} value={this.state.cidade} 
                  underlineColorAndroid='#0000ff' 
                  accessibilityLabel="cidade"
                  onChangeText={(value)=>this.setState({cidade: value})} 
                  placeholder="Cidade"
                />
              </View>
              <View style={{flex: 1}}>
                <TextInput style={{}} value={this.state.uf} 
                  underlineColorAndroid='#0000ff' 
                  accessibilityLabel="uf"
                  onChangeText={(value)=>this.setState({uf: value})} 
                  placeholder="UF"
                />
              </View>
            </View>
            <TextInput style={{}} value={this.state.cep} 
              underlineColorAndroid='#0000ff' 
              accessibilityLabel="cep"
              onChangeText={(value)=>this.setState({cep: value})} 
              placeholder="cep"
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}> 
            <Button title="fechar" color="#3700b3" onPress={()=>{
              this.props.navigation.navigate('Request', {endereco: this.state.rua, 
              numero: this.state.no,
              nome:  this.state.nome,           
              telefone: this.state.telefone,
              celular: this.state.celular,
              bairro: this.state.bairro,
              cep:  this.state.cep, 
              cidade: this.state.cidade,
              uf:  this.state.uf})
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
    padding: 5,
    backgroundColor: '#ffffff',
  },
  
});
