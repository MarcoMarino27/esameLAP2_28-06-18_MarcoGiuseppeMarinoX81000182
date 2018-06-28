import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
export default class Preference extends Component {

  render() {



    return (
      <TouchableOpacity onPress={this.props.onInfo}>
      <View style={styles.container}>
      <Image style={{height:200,width:400}}source={{uri:this.props.data.img}}/>
      <Text style={styles.text}>{this.props.data.name}</Text>
      <Text>{this.props.data.address}</Text>
      <View style={{flexDirection:"row"}}>
      {this.props.data.tags.map(tag => <Text>#{tag} </Text>)}
      </View>
      </View>
      </TouchableOpacity>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 4,
    borderWidth:3,
    borderColor:"#FFE1B0",
    backgroundColor:"#FFE1DC"
  },
  text:{
    color: '#FF1F35',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
