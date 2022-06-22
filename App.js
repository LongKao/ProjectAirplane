import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,TextInput} from 'react-native';
import IntroScreen from "./screens/IntroScreen";
import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{headerStyle:{backgroundColor:'#F47C7C'}, headerTintColor:'white'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
})
 
export default App 