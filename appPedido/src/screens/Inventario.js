import React, {Component} from 'react';
import {StyleSheet, View, Button, Text,
  TextInput, PermissionsAndroid, 
  ActivityIndicator, FlatList, TouchableNativeFeedback, 
  Image, NativeModules, Alert, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

const ToastModule = NativeModules.ToastModule;

export default class Inventario extends Component<Props> {
  
  constructor(props){
    super(props);
    this.state = {
      showCamera: false,
      input: '',
      produtos: [],
      produtoSelecionado: '',
      select_qtd: '0',
      user: '',
      pesquisado: false,
      loading: false,
    };
  }
  
  componentDidMount(){
    AsyncStorage.getItem('user',(error,result)=> {
      if(result){
        //API = result;
        this.setState({user: result});
      }
    })
    this.permission();
  }

  async permission(){
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App read write camera Permission',
            message:
            'App needs camera ' +
            'so you can take.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
      );
      if(granted== PermissionsAndroid.RESULTS.GRANTED){
        console.log('permissão de camera concedida');
        
      }else{
        //alert("Permissão negada");
      }
    }catch(err){
      alert(err);
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };  

  onBarCodeRead = (e) => {
    alert(e.data);
    //console.log(e.data);
  }

  getProdutctsByName(value){ 
    fetch(config.url+'produtos/byname/'+(value).toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json())
      .then((resp) => {
      let aux = [];
      if(resp.msg != undefined){        
        this.setState({loading: false});
      }
      else{
        let item = {
          cod_produto: resp.cod_produto,
          cod_cpd: resp.codigo1,
          descricao: resp.descricao, marca: resp.marca,
          preco_venda: resp.preco_venda, qtd: resp.qtd,
          tipo_unid: resp.tipo_unidade,
          qtd_selec: "1",
          foto: '',
          index: 1
        };
        aux.push(item);
        this.getFoto1Produto(aux);
      }
        /*aux.sort(function (a, b) {
    
          return (a.descricao > b.descricao) ? 1 : ((b.descricao > a.descricao) ? -1 : 0);
        
        });*/
        
        
    }).catch((err)=>{
      this.setState({loading: false});
      console.log('erro ao carregar produtos: ',err);
      
      //Alert.alert('Atenção', 'erro');
    });
    //
  }

  getProductsByCode(cod){
    fetch(config.url+'produtos/bycod/'+(cod), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response)=> response.json())
    .then(resp => {
      console.log(resp.length);  
      console.log(resp == []);
      let aux = [];
      //this.setState({fotosProdutos: []});
      //alert(JSON.stringify(resp.cod));
      if(resp.msg != undefined){        
        this.getProdutctsByName(cod);
      }
      else{
        
            let item = {
              cod_produto: resp.cod_produto,
              cod_cpd: resp.codigo1,
              descricao: resp.descricao, marca: resp.marca,
              preco_venda: resp.preco_venda, qtd: resp.qtd,
              tipo_unid: resp.tipo_unidade,
              qtd_selec: "1",
              foto: '',
              index: 1
            };
            aux.push(item);
          
        /*aux.sort(function (a, b) {
    
          return (a.descricao > b.descricao) ? 1 : ((b.descricao > a.descricao) ? -1 : 0);
        
        });*/
  
        this.getFoto1Produto(aux);
      }
    })
    .catch((err)=>{
      this.setState({loading: false});
      console.log('erro ao carregar produtos: ',err);
      
      //Alert.alert('Atenção', 'erro');
    });
  }

  async getFoto1Produto(prod){
    prod.map(async(p) => {
      console.log(p.cod_produto);
      const response = await fetch(config.url+'produtos/foto1/'+p.cod_produto, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        let aux = json.caminho_foto.split('\\');          
        p.foto = config.url+'imagens/'+aux[4]+'/'+aux[5];
        
    });
    this.setState({produtos: prod, select_qtd: '0'});
    setTimeout(()=>this.setState({loading: false}),500);
  //this.setState({loading: false})
  }

  changeFoto(cod_produto, foto, index){
    
    if(foto == 'before'){
      fetch(config.url+'produtos/foto1/'+cod_produto, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
      }).then(resp => resp.json())
      .then((resp)=> {
        let {produtos} = this.state;
        let aux = resp.caminho_foto.split('\\');          
        produtos[index].foto = config.url+'imagens/'+aux[4]+'/'+aux[5];
        produtos[index].index = 1;
        this.setState({produtos});
      }).catch((err)=> {
        console.log(err);
      })

    }
    if(foto == 'next'){
      fetch(config.url+'produtos/foto2/'+cod_produto, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
    }).then(resp => resp.json())
    .then((resp)=> {
      let {produtos} = this.state;
      let aux = resp.caminho_foto.split('\\');          
      produtos[index].foto = config.url+'imagens/'+aux[4]+'/'+aux[5];
      produtos[index].index = 2;
      console.log(produtos);
      this.setState({produtos});
    }).catch((err)=> {
      console.log(err);
    })
      

    }
  //this.setState({produtos: prod});
  //setTimeout(()=>this.setState({loading: false}),500);
  //this.setState({loading: false})
  }

  numberToQTd(numero) {
    var numero = numero.toFixed(3).split('.');
    numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

  updateProduct(cod_produto){
    let date = new Date();

    var _data = {
      data_hora_contagem:	(date.toISOString()).toString(),
      item_ja_contado: 'S',
      estoque_certo: ( Number(this.state.select_qtd) == Number(this.state.produtos[0].qtd) )? 'S' : 'N',
      usuario_da_contagem: this.state.user,
      qtde_digitada_balanco: Number(this.state.select_qtd).toString()
    };
    //alert(JSON.stringify(_data));
    fetch(config.url+'produtos/update/'+(cod_produto), {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_data),
    }).then(resp => resp)
    .then((resp)=> {
      this.setState({produtos: [], input: '', pesquisado: false});
      ToastModule.show("Produto atualizado com sucesso!",3000);
    })
    .catch((err)=> {
      alert(err);
    })
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
            {this.state.showCamera ? 
                <View style={styles.containerReader}>
                  <View style={{ position: 'absolute', top: 5, left: 5, zIndex: 20}}>
                    <TouchableOpacity style={styles.capture} onPress={()=> this.setState({showCamera: false})}>
                      <Text>voltar</Text>
                    </TouchableOpacity>
                  </View>
                  <RNCamera
                      ref={(ref) => {
                        this.camera = ref;
                      }}
                      style={styles.preview}
                      onBarCodeRead={(value)=>{
                        this.setState({input: value.data, showCamera: false,loading: true, 
                          pesquisado: true, produtoSelecionado: ''})
                        this.getProductsByCode(value);
                      }
                      }
                      androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                      }}
                      type={RNCamera.Constants.Type.back}
                      captureAudio={false}
                  />
                  {/*<View style={{ flex: 0, 
                    flexDirection: 'row', 
                    justifyContent: 'space-around' }}>
                    <TouchableOpacity 
                      onPress={this.takePicture.bind(this)} 
                      style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>*/}
                </View> 
            
              :
              <View style={{flex: 1}}>
            <Button title="ler código de barras" color="#3700b3" onPress={()=>this.setState({showCamera: true})}/>
            <View style={styles.input}>
              <TextInput placeholder="Digite o nome do produto ou código de barras" 
                style={{flex: 4}} 
                value={this.state.input}
                onChangeText={(value) => {
                  if(value != ''){
                    this.setState({input: value, loading: true, pesquisado: true, produtoSelecionado: ''});
                    this.getProductsByCode(value);
                  }else{
                    this.setState({input: value});
                  }
                }}
              />
              {this.state.input != '' ?<Icon name='close' size={25} color="black"  
                style={{flex: 1,alignSelf: 'center', textAlign: 'right', paddingRight: 5}}
                onPress={()=> {
                  this.setState({input: ''});
                }}
              />:null}
            </View>
            {this.state.loading? <ActivityIndicator size="large"/>:null}        
            {
              this.state.produtos.length>0 && this.state.loading==false?
                <FlatList
                  style={styles.list}
                  data={this.state.produtos}
                  numColumns={1}
                  extraData={this.state}
                  renderItem={({item, index}) => 
                    <View style={styles.card} >
                        <TouchableNativeFeedback  onPress={()=>{
                            //alert('clicou no '+item.descricao);
                            //this.setState({produtoSelecionado: item});
                          }}>
                          <View style={styles.cardContent}>
                            
                            <View style={{flex: 1,}}>
                                
                                <Image
                                  style={ {
                                    width: "100%",
                                    height: 150,
                                    resizeMode: 'center',
                                  }}
                                source={{uri:  this.state.produtos[index].foto }}
                                />
                                
                                
                              {item.index == 2?
                              <View style={{flex: 1, position: 'absolute', left: 2, top: 50, justifyContent: 'center',}}>
                                  <View style={styles.float}>
                                    <Icon name={'navigate-before'} size={25} color="#ffffff" onPress={()=>{
                                      this.changeFoto(item.cod_produto, 'before', index);
                                    }}/>
                                  </View>
                              </View>
                                :
                              <View style={{flex: 1, position: 'absolute', right: 2, top: 50, justifyContent: 'center'}}>
                                  <View style={styles.float}>
                                    <Icon name={'navigate-next'} size={25} color="#ffffff" onPress={()=>{
                                      this.changeFoto(item.cod_produto,'next',index);
                                    }}/>
                                  </View>
                              </View>
                              }
                            </View>                     
                            

                          </View>

                        </TouchableNativeFeedback>
                    </View>
                }
                  keyExtractor={({id},index)=>index.toString()}
                />:null
              
            }

            {(this.state.produtos.length==0 && this.state.loading==false) && this.state.pesquisado?
              <View style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Produto não encontrado!</Text>
              </View>
              : null
            }  
            {
              this.state.produtos.length>0 && this.state.loading==false && this.state.produtoSelecionado == ''?
              <View style={{flex: 2,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,}}>
                <View style={{flex: 1, justifyContent: 'flex-start',}}>
                  <View style={{alignContent: 'center',alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 0.5}}>
                    <Text style={{fontSize: 18, fontWeight: '800'}}>Produto</Text>
                  </View>
                  <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={styles.title}>Cod.CPD: </Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, flex: 1}}>{this.state.produtos[0].cod_produto}</Text>
                  </View>
                  <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={styles.title}>Cod. Produto: </Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, flex: 1}}>{this.state.produtos[0].cod_cpd}</Text>
                  </View>
                  <View style={{flex: 0, flexDirection: 'row'}}>
                          <Text style={styles.title}>Produto: </Text>
                          <Text style={{  fontWeight: '600', fontSize: 15, flex: 1}}>{this.state.produtos[0].descricao}</Text>
                  </View>
                  <View style={{flex: 0, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={styles.title}>Tipo: </Text>
                            <Text style={{  fontWeight: '600', fontSize: 15, flex: 1}}>{this.state.produtos[0].tipo_unid}</Text>
                    </View>
                    
                    <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={styles.title}>Marca: </Text>
                            <Text style={{  fontWeight: '600', fontSize: 15, flex: 1}}>{this.state.produtos[0].marca }</Text>
                    </View>
                  </View>
                </View>
                <View style={{flex: 1, backgroundColor: '#E0E0E0',justifyContent: 'flex-end'}}>
                  <View style={{flex: 0, flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'}}>  
                      <View style={styles.floatqtd}>
                        <AntDesign name='minus' 
                        size={35} 
                        color="black" 
                        style={{}}
                        onPress={()=>{
                          if(this.state.produtos[0].tipo_unid == "UND" || this.state.produtos[0].tipo_unid == "UN"){
                            let {select_qtd} = this.state;
                            
                            if(Number(select_qtd)>1){
                            
                            //select_qtd = Number(select_qtd)-1;
                            select_qtd = Number((parseFloat((((select_qtd).split(".").join(''))).replace(/,/g,'.')))-1);
                            //alert(qtds[index]);
                            this.setState({
                              select_qtd: select_qtd.toString()
                            });
                            }
                          }else{
                            let {select_qtd} = this.state;
                            //alert(this.state.select_qtd);
                            if((parseFloat((((select_qtd).split(".").join(''))).replace(/,/g,'.')))>1){

                              let aux = parseFloat((((select_qtd).split(".").join('')))
                              .replace(/,/g,'.'))-1;
                              this.setState({
                                select_qtd: this.numberToQTd(aux)
                              });
                              
                            }
                          }
                        }}
                        />
                      </View>
                    </View>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                      
                        {(this.state.produtos[0].tipo_unid == "UND") 
                        || (this.state.produtos[0].tipo_unid == "UN") ? 
                          
                          
                          
                          <TextInput /*value={this.state.produtos[index].qtd_selec} */
                          value={this.state.select_qtd}
                          //editable={true}
                          underlineColorAndroid="red"
                          placeholder="qtd"
                          keyboardType="numeric"
                          style={{flex:1, height: 50, fontSize: 40, textAlign: 'center'}}
                          onChangeText={(value)=>{
                            if(value == '0'){
                              this.setState({
                                select_qtd: '1'
                              })
                            }else{   
                              this.setState({
                                select_qtd: value,
                              });
                          }
                          
                        }}
                        
                        />
                        :
                        <TextInputMask
                            type={'money'}
                            options={{
                              precision: 3,
                              separator: ',',
                              unit: '',
                              delimiter:'' 
                            }}
                            style={{flex:1, height: 50, fontSize: 40, textAlign: 'center'}}
                            keyboardType="number-pad"
                            value={this.state.select_qtd}
                            underlineColorAndroid="blue"
                            onChangeText={text => {                        
                              this.setState({select_qtd: text});
                              //alert(Number((parseFloat(((text).replace(".","")).replace(/,/g,'.')))));
                              //alert(this.numberToReal(Number(parseFloat(((text).replace(".","")).replace(/,/g,'.')))*Number(this.state.produtoSelecionado.preco_venda)));  
                            }
                            }
                          />
                        }
                          
                    
                    </View>
                    <View style={{alignItems: 'center', 
                    justifyContent: 'center',
                    flex: 1}}>
                      <View style={styles.floatqtd}>
                        <AntDesign name='plus' size={35} 
                          color="black" style={{}}
                          onPress={()=>{
                            let {select_qtd} = this.state;
                            let aux;
                            
                            //aux = Number(aux)+1;
                            select_qtd = Number((parseFloat((((select_qtd).split(".").join(''))).replace(/,/g,'.')))+1);
                            if(this.state.produtos[0].tipo_unid == "UND" 
                            || this.state.produtos[0].tipo_unid == "UN"){
                              this.setState({select_qtd: select_qtd.toString()});
                            }else{
                              this.setState({select_qtd: this.numberToQTd(select_qtd)});
                            }
                          }
                          /*this.state.produtos[index].qtd_selec+=1*/}
                        />
                      </View>
                    </View>
                    
                  </View>
                  <Button title="confirmar" onPress={()=>{
                    if(this.state.select_qtd == '0'){
                      Alert.alert('Atenção', 'Quantidade deve ser maior que 0!');
                    }else{
                      this.updateProduct(this.state.produtos[0].cod_produto);
                    }
                  }}/>
                </View>

              </View>
              :
              null
            }
        </View>
            }
      </View>
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
    opacity: 1.65,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flex: 1,
},
float: {
  width: 25,  
  height: 25,   
  borderRadius: 12,            
  backgroundColor: '#30dac5',                                    
  //position: 'absolute', 
  justifyContent: "center",
  alignItems: "center",                                     
  //bottom: 10,                                                    
  //right: 15,
  elevation: 3,
  
},

floatqtd: {
  width: 35,  
  height: 35,   
  borderRadius: 17,            
  backgroundColor: '#30dac5',                                    
  //position: 'absolute', 
  justifyContent: "center",
  alignItems: "center",                                     
  //bottom: 10,                                                    
  //right: 15,
  elevation: 3,
  
},
  card: {
    //paddingLeft: 10,
    marginRight: 2,
    marginLeft: 2,
    //height: 150,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 5,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
    
},
cardContent: {
  //padding: 10,
  flex: 1,
  //flexDirection: 'row'  
},
name : {
  borderBottomColor: 'gray', 
  borderBottomWidth: 0.65,
  paddingLeft: 10,paddingRight:10,
  paddingTop: 5,paddingBottom: 5 
  ,flex: 0, flexDirection: 'row'
},
menu: {
  padding: 10,
},
title: {
  fontWeight: '600', 
  fontSize: 15, 
  color: 'black'
},

/* camera options */
containerReader: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#ffffff',    
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 15,
  paddingHorizontal: 20,
  alignSelf: 'center',
  margin: 20,
},
});
