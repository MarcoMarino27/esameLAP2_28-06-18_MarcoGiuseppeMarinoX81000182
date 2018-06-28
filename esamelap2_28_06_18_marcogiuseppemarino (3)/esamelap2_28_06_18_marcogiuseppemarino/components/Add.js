import React, { Component } from 'react';
import { Text, View, StyleSheet, Image,ScrollView,Alert,TouchableOpacity} from 'react-native';
import { Card,FormLabel, FormInput ,Slider,Button} from "react-native-elements"; 
import {Permissions,ImagePicker,ImageManipulator} from 'expo'
import Tags from "react-native-tags";
export default class Add extends Component {
  state = {
    img:null,
    name:"",
    address:"",
    tags:[]
  }
  
  componentWillMount(){
    this.props.navigation.setParams({ onSave: this._save });
    this.tag=""
  }
  
    _save = async () => {
  let add = this.props.navigation.state.params.addPref
  if(add){
     console.log("add")
     let item = {
     name:this.state.name,
     address:this.state.address,
     tags:this.state.tags,
     img:this.state.img
     }
    console.log(item)
    add(item);
    this.props.navigation.goBack();
    return
  }
  }
  
  
  _pickAnImage= async ()=>{
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (result.status !== "granted") {
        alert("you need to authorized the app");
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log(result);
      // Resize the image
      const manipResult = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 400 } }],
        { format: "png" }
      );
      console.log(manipResult);
      this.setState({ img: manipResult.uri });
    }
  }
  
  _alertPicker = () =>{
    Alert.alert(
  'CameraRoll',
  'Vuoi prendere una foto dalla galleria?',
  [
    {text: 'SI', onPress: () => this._pickAnImage(),style:'goBack'},
    {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  ],
  { cancelable: false }
)
  }
  
_tagsg=()=>{
  if(this.tag!=""){
  let newTags=[...this.state.tags,this.tag]
  this.setState({tags:newTags})
  console.log(this.state.tags);
  }
}  
  
  render() {
    return (
<ScrollView>
      <View style={styles.container}>
      <View style={{height:300,width:400 , backgroundColor:"transparent"}}>
      <TouchableOpacity onPress = {()=>this._alertPicker()}>
      <Image resizeMode={"cover"} style={{height:300,width:null}}source={ this.state.img ? {uri:this.state.img} : require ("../assets/placeholder.jpg")}/>
      </TouchableOpacity>
      </View>
      <Card>
      <FormLabel >Nome</FormLabel>
      <FormInput   label="Nome*"
            placeholder="inserisci il nome del luogo"
            onChangeText={text => this.setState({ name: text })}/>
      <FormLabel >Indirizzo</FormLabel>
      <FormInput   label="Indirizzo*"
            placeholder="inserisci l'indirizzo"
            onChangeText={text => this.setState({ address: text })}
            />
      </Card>
     <Card>
      <FormLabel >Tag</FormLabel>
      <FormInput   label="Nome*"
            placeholder="#"
            onChangeText={text => {this.tag=text}}/>
             <Button  
             raised
          title="ADD"
          onPress={this._tagsg}></Button>
      </Card>
     
      </View>
      </ScrollView>
    );
  }
}


     /* <View style={{height:300 , backgroundColor:"transparent"}}>
      <TouchableOpacity onPress = {()=>this._alertPicker()}>
      <Image resizeMode={"cover"} style={{height:300,width:null}}source={ this.state.image ? {uri:this.state.image} : require ("../assets/placeholder.jpg")}/>
      </TouchableOpacity>
      </View>
      <Card>
      <FormLabel >Nome</FormLabel>
      <FormInput   label="Nome*"
            placeholder="inserisci il nome del luogo"
            onChangeText={text => this.setState({ name: text })}/>
      <FormLabel >Indirizzo</FormLabel>
      <FormInput   label="Indirizzo*"
            placeholder="inserisci l'indirizzo"
            onChangeText={text => this.setState({ indirizzo: text })}
            />
      </Card>*/
   
  Add.navigationOptions = ({navigation}) =>{
    return{
    title: 'Add or Edit',
    headerLeft:null,
    headerRight: 
    <TouchableOpacity onPress={()=>navigation.state.params.onSave()}>
     <Text>SAVE</Text>
    </TouchableOpacity>,

  }
} 
   
   
      
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  logo: {
    backgroundColor: "#056ecf",
    height: 128,
    width: 128,
  }
});
