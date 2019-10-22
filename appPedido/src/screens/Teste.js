import React, {Component} from 'react';
import {
  Alert,StyleSheet, 
  Text, View,
   TextInput, 
   ActivityIndicator,
   Button,
   SectionList,
   FlatList, TouchableNativeFeedback} from 'react-native';
   import AntDesign from 'react-native-vector-icons/AntDesign'


const API = "http://189.58.85.181:3000/";


export default class Teste extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {loading: true, clientes: [], pesquisado: false, input: '', 
        contasareceber: [
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},
            {documento: '8081',sequencia: '90/5234', tipo:'NP',valor: 1000, dt_vencimento: '09/10/1997', status: ''},

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
            data={this.state.contasareceber}
            horizontal={false}
            style={{}}
            numColumns={1}
            
            ListHeaderComponent={()=>
              <View style={{marginLeft: 10, marginRight: 10, paddingTop: 20, paddingBottom: 15}}>
                
                <View style={{marginLeft: 20,elevation: 2,}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '500'}}>Cliente: </Text>
                    <Text>Fulano de tal da Silva</Text>
                  </View>
                  <View style={{flex: 0 ,flexDirection: 'row',marginBottom: 15}}>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '500'}}>Endereço: </Text>
                        <Text>Rua 1, casa 02</Text>
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '500'}}>Telefone: </Text>
                        <Text>92991969528</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 15, borderBottomWidth: 0.5, borderColor: 'gray'}}>
                  <View style={{flex: 1, alignContent: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Documento</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Vencimento</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Valor</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: '600'}}>Recebido</Text>
                  </View>
                </View>
              </View>
            }
            ListFooterComponent={()=>
              <View style={{marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 15, borderTopWidth: 0.5, borderColor: 'gray'}}>
                <View style={{marginLeft: 20}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '600'}}>Total a Receber: </Text>
                    <Text>10000,00</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '600'}}>Total a Recebido: </Text>
                    <Text>0,00</Text>
                  </View>
                </View>

                
              </View>
            }
            //ItemSeparatorComponent={()=><View style={{backgroundColor: 'black', height: 0.5}}></View>}
            renderItem={({item, index}) => 
              <TouchableNativeFeedback >
                <View style={{elevation: 5,paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
                  <View style={{flexDirection: 'row', marginLeft: 15}}>
                    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
                      <Text style={{}}>{item.documento}</Text>
                    </View>
                    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}> 
                      <Text style={{}}>{item.dt_vencimento}</Text>
                    </View>
                    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
                      <Text style={{}}>{item.valor}</Text>
                    </View>
                    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
                      <AntDesign name={this.state.contasareceber[index].status == 'aberto' ? 'close' : 'check'} 
                      size={25} 
                      color={this.state.contasareceber[index].status == 'aberto' ? 'red' : 'green'}
                      title={this.state.contasareceber[index].status}
                      style={{}} onPress={()=>{
                        if(this.state.contasareceber[index].status == 'aberto')
                          this.changeState(index,'fechado');
                        else
                          this.changeState(index,'aberto'); 
                      }}/>
                    </View>

                  </View>
                </View>

              </TouchableNativeFeedback>
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
