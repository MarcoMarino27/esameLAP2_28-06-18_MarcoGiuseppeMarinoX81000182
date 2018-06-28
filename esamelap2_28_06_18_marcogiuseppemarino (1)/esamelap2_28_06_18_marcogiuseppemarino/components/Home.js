import React, { Component } from 'react';
import { Text, View, StyleSheet, Image ,FlatList,TouchableOpacity} from 'react-native';
import Preference from './Preference'
import {Entypo} from '@expo/vector-icons';
export default class Home extends Component {
state = {
  preference : []
}  

  _keyExtractor = (item) => {
    return toString(item.id)
  }
  
  _renderItem =  ({item}) =>(
  <Preference  data = {item} onInfo = {() => this._goToInfo(item)}/>
    )
  _goToInfo = (item) =>{
    this.props.navigation.navigate("Info",{
      currentPreference:item
    });
  }
  
   _add = (item) =>{
  console.log(item)
   let newPreference = [...this.state.preference,item];
   this.setState({preference:newPreference})
   //AsyncStorage.setItem('finaltodolist', JSON.stringify(newToDoList)).then( this.setState({todolist:newToDoList}));
   //const uid = firebase.auth().currentUser.uid
  // firebase.database().ref("/users/"+uid+"/todolist").push(item)
 }

 componentDidMount(){
    fetch('http://www.dmi.unict.it/~calanducci/LAP2/favorities.json')
      .then((response) => response.json())
      .then((responseJson) => {
      this.setState({preference:responseJson.data})
      })
      .catch((error) =>{
        console.error(error);
      });
      this.props.navigation.setParams({onAdd:this._add})
  }

  
  render() {
    console.log(this.state.preference)
    return (
      <View style={styles.container}>
        <FlatList data={this.state.preference} 
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}/>
      </View>
    );
  }
}


Home.navigationOptions = ({navigation}) =>{
    return{
    title: 'Home',
    headerLeft:null,
    headerRight: 
    <TouchableOpacity onPress={() => navigation.navigate("Add",{
      addPref:navigation.state.params.onAdd
    })}>
      <Entypo name="add-to-list" size={32} color="red" /> 
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
