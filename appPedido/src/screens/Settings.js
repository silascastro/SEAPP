import React, {Component} from 'react';
import {Alert,StyleSheet, Text ,View,
Button, TextInput, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const ToastModule = NativeModules.ToastModule;

const _request ="PEDIDO";

export default class Settings extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      ip: ''
    };
    const { navigation } = this.props;
    //this.aysncData();
    //this.teste();
    
  }
  

  componentDidMount(){
      this.getIp();
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

  setIp(value){
    AsyncStorage.setItem('_ip',"http://"+value+":3000/");
    ToastModule.show('endereço atualizado com sucesso!',3000);
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
                    onChangeText={(value) => this.setState({ip: value})}
                  />
                </View>
              </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>    
            <Button title="confirmar" disabled={this.state.ip!=''?false:true}
            onPress={() => {
                this.setIp(this.state.ip);
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
      flex: 2,
    //textAlign: 'center',
    //borderBottomWidth: 2,
   // borderColor: 'black',
    //textDecorationStyle: "solid",
  },
  cardContent:{
    flex: 0, flexDirection: 'row', paddingTop: 15, 
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
