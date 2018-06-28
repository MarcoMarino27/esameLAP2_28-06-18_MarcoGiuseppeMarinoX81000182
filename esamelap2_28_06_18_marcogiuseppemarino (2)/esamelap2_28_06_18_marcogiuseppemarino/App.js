import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';
import Home from "./components/Home"
import Info from "./components/Info"
import Add from "./components/Add"

const App = StackNavigator({
Home:{
  screen:Home
},
Info:{
  screen:Info
},
Add:{
  screen:Add
}
},
{
    initialRouteName: 'Home',
    mode:"modal"
}

)

export default App
