import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, View,
   TextInput, 
   ActivityIndicator,
   Button,
   FlatList, TouchableNativeFeedback} from 'react-native';


const API = "http://189.58.85.181:3000/";


export default class Teste extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true, clientes: [], pesquisado: false, input: '', 
        contasareceber: [
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''}
        ],

    };
  }

  componentDidMount(){
    //this.getContasAReceber(this.props.navigation.getParam('cod_cliente'));
    //this.getContasAReceber(608);
    this.setStatus();
  }

  setStatus(){
      let aux = this.state.contasareceber;
      for(let e in aux){
          aux[e].status = "aberto";
      }
      this.setState({contasareceber: aux});
  }

  changeState(index, _status){
      let aux = this.state.contasareceber;
      aux[index].status = _status;
      this.setState({contasareceber: aux});
  }

  format(number){
    return number;
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        ListHeaderComponent={()=>
          <View style={{flexDirection: 'row', marginBottom: 3}}>
            <Text style={{fontWeight: '800',color: 'black'}}>Cliente: </Text>
            <Text>nome: Fulano de tal da Silva</Text>
          </View>
        }
        data={this.state.contasareceber}
        renderItem={({item, index})=>
            <View style={styles.card}>
                <TouchableNativeFeedback>
                  <View style={styles.cardContent}>
                      <View style={{flex: 0, flexDirection: 'row'}}>
                            <View style={{flex: 2,}}>
                                <View style={{flex: 0, flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Documento: </Text>
                                    <Text>{item.documento}</Text>
                                </View>
                                <View style={{flex: 0, flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '600', fontSize: 13, color: 'black'}}>Valor: </Text>
                                    <Text style={{color: 'green'}}>R${item.valor}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 20,flex: 1, alignContent: 'center'}}>
                                <View style={{width: 80}}>
                                    <Button  
                                    color={this.state.contasareceber[index].status == 'aberto'? 'green': 'red'} 
                                    title={this.state.contasareceber[index].status}  
                                    onPress={()=>{
                                        if(this.state.contasareceber[index].status == 'aberto')
                                        this.changeState(index,'fechado');
                                        else
                                        this.changeState(index,'aberto'); 
                                        
                                    }}/>
                                </View>
                            </View>
                        </View>
                  </View>

                </TouchableNativeFeedback>
            </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  input: {
    height: 50,
    elevation: 2,
    margin: 10,
    borderWidth: 0.2,
    flex: 0,
    flexDirection: 'row',
  },
  list:{
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  card: {
    marginRight: 2,
    marginLeft: 2,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 5,
    marginBottom:5,
    //alignContent: 'center',
    //justifyContent: 'center',
},
cardContent: {
  //padding: 10,
  flex: 1,
  //flexDirection: 'row'  
},
menu: {
  padding: 10,
},
title: {
  fontWeight: '600', 
  fontSize: 15, 
  color: 'black'
},
  
});
