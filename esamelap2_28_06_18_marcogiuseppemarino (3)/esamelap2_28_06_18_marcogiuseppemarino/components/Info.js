import React, { Component } from 'react';
import { Text, View, StyleSheet, Image,ScrollView } from 'react-native';
import {Location,Permissions,MapView} from 'expo'
export default class Info extends Component {
  state={
     location: {
      latitude: 37.509433,
      longitude: 15.083707
    },
  }
  
  componentWillMount(){
    this.item = this.props.navigation.state.params.currentPreference;
    this._locateItem(this.item.address)
  }
  
  _locateItem = async (address) =>{
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert("You need to enable the GPS and authorize it");
        return;
      }
     if (address) {
      try {
        var results = await Location.geocodeAsync(address);
      this.setState({ location: results[0]});
      } catch (e) {
        console.log(e)
      }
    } 
  }
  
  
  
  
  
  
  render() {
    console.log(this.item)
    console.log(this.state.location)
    return (
   <ScrollView>
     <View style={styles.container}>
     <View style={styles.container}>
      <Image style={{height:200,width:400}}source={{uri:this.item.img}}/>
      <Text style={styles.text}>{this.item.name}</Text>
      <Text>{this.item.address}</Text>
      <View style={{flexDirection:"row"}}>
      {this.item.tags.map(tag => <Text>#{tag} </Text>)}
      </View>
      {this.item.tel ? <Text>{this.item.tel}</Text> : null}
      {this.item.url ? <Text>{this.item.url}</Text> : null}
      {this.item.info ? <Text>{this.item.info}</Text> : null}
      </View>
      <View>
            <MapView
            style={{ height: 200,width:400 , marginTop: 0 }}
            region={{
              ...this.state.location,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
          <MapView.Marker coordinate={this.state.location} />
          </MapView>
          </View>    
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
