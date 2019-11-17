import React, {Component} from 'react';
import {Alert,StyleSheet, Text ,View,FlatList,
Button, TextInput, NativeModules, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const ToastModule = NativeModules.ToastModule;

const _request ="PEDIDO";
const _ipcollections = 'ipcollections';

export default class Settings extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      ip: '',
      descricao: '',
      ipcollections: [],
    };
    const { navigation } = this.props;
    //this.aysncData();
    //this.teste();
    
  }
  

  componentDidMount(){
      //AsyncStorage.removeItem(_ipcollections);
      this.getIp();
      this.getIpCollections();
  }

  getIp(){
    AsyncStorage.getItem('_ip',(error,result)=> {
        if(result){
            let aux = result.split('//')[1];
            let final = aux.split(':')[0];
            this.setState({ip: final});
        }
    });
  }

  setIp(value, descricao){
    this.setIpCollections({descricao: descricao, ip: value});
    AsyncStorage.setItem('_ip',"http://"+value+":3000/");
    ToastModule.show('endereço atualizado com sucesso!',3000);
  }

  getIpCollections(){
    AsyncStorage.getItem(_ipcollections,(error,result)=>{
      if(result){
        let array = JSON.parse(result);
        for(let e in array){
          let aux = (array[e].ip).split('//')[1];
          let final = aux.split(':')[0];
          array[e].ip = final;
          
          if(final == this.state.ip){
            this.setState({descricao: array[e].descricao});
          }
        }
        this.setState({ipcollections: array});
      }
    });
  }

  removeFromIpCollections(index){
    AsyncStorage.getItem(_ipcollections, (error,result)=>{
      if(result){
        let aux = JSON.parse(result);
        aux.splice(index,1);
        AsyncStorage.setItem(_ipcollections,JSON.stringify(aux));
      }
    });
  }

  setIpCollections(data){
    data.ip = "http://"+data.ip+":3000/"
    AsyncStorage.getItem(_ipcollections, (error,result)=>{
      if(result){
        let aux = JSON.parse(result);
        aux.push(data);
        aux.sort();
        AsyncStorage.setItem(_ipcollections,JSON.stringify(aux));
      }else{
        let aux = [];
        aux.push(data);
        AsyncStorage.setItem(_ipcollections,JSON.stringify(aux));
      }
    });
  }

  selectIp(item, index){
    //alert(JSON.stringify(item));
    //let  aux = JSON.parse(item);
    this.setState({ip: item.ip, descricao: item.descricao});
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
        headerRight: null
  });

  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <View style={styles.card} onPress={()=>{}}>
              <View style={styles.cardContent}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ flex: 1, justifyContent: 'center'}}>
                      <Text style={{fontWeight: '600', 
                      color: 'black', fontSize: 15}}>
                          Endereço IP
                      </Text>                                  
                  </View>
                  <View style={{flex: 2}}>
                    <TextInput placeholder="Digite o ip" 
                      value={this.state.ip}
                      keyboardType="phone-pad"
                      onChangeText={(value) => 
                      this.setState({ip: value})}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ flex: 1, justifyContent: 'center'}}>
                      <Text style={{fontWeight: '600', 
                      color: 'black', fontSize: 15}}>
                          Nome da rede
                      </Text>                                  
                  </View>
                  <View style={{flex: 2}}>
                    <TextInput placeholder="digite o nome da rede" 
                      value={this.state.descricao}
                      keyboardType="default"
                      onChangeText={(value) => 
                      this.setState({descricao: value})}
                    />
                  </View>
                </View>
              </View>

          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, fontWeight: '800', fontSize: 18}}>Relação de Ips</Text>
            <FlatList
            style={{flex: 1,}}
            data={this.state.ipcollections}
            renderItem={({item, index})=>
              <View style={styles.card} >
                <TouchableNativeFeedback onPress={()=> this.selectIp(item, index)}>
                  <View style={{marginLeft: 20, marginRight: 20, paddingTop:10, 
                    paddingBottom: 10, borderBottomColor: 'gray', borderBottomWidth: 0.4}}
                    >
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '600', flex: 1}}>{item.ip}-{item.descricao}</Text>
                        <Icon name='close' size={25} color="red"  
                        style={{alignSelf:'flex-end'}}
                          onPress={()=> {
                            console.log('excluir');
                            let {ipcollections} =this.state;
                            ipcollections.splice(index,1);
                            this.setState({ipcollections});
                            this.removeFromIpCollections(index);
                          }}
                        />
                      </View>
                  </View>
                </TouchableNativeFeedback>
                
              </View>
            }
          />
          
          <View style={{flex: 1, justifyContent: 'flex-end', }}>    
            <Button title="confirmar" disabled={this.state.ip!=''?false:true}
            onPress={() => {
                this.setIp(this.state.ip, this.state.descricao);
            }}
            />
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
    backgroundColor: '#ffffff',
  },
  card: {
      //flex: 1,
    //textAlign: 'center',
    //borderBottomWidth: 2,
   // borderColor: 'black',
    //textDecorationStyle: "solid",
    
  },
  cardContent:{
    flex: 0, paddingTop: 15, 
    paddingBottom:15, borderBottomColor: 'gray', borderBottomWidth: 0.65,
    paddingLeft: 10,paddingRight: 10
  },
  cardContentOneRow: {
    paddingLeft: 10,paddingRight: 10,
    paddingTop: 15, paddingBottom:15,borderBottomColor: 'gray', borderBottomWidth: 0.65,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    //height: 50,
},
rowBack: {
  alignItems: 'center',
  backgroundColor: 'red',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 15,
  borderWidth: 0.6,
  borderColor: '#eeeeee'
},
  float: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#30dac5',
    marginTop: 2,                                   
   // position: 'absolute', 
    justifyContent: "center",
    alignItems: "center",                                     
    //bottom: 10,                                                    
    //right: 15,
    elevation: 3
  }
  
});
