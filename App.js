import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,TextInput} from 'react-native';
import IntroScreen from "./screens/IntroScreen";
import ReceiveDetailsScreen from "./screens/ReceiveDetailsScreen";
import PayDetailsScreen from "./screens/PayDetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentScreen from "./screens/PaymentScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ReceiveDetails" component={ReceiveDetailsScreen} options={{headerStyle:{backgroundColor:'#F47C7C'}, headerTintColor:'white'}}/>
        <Stack.Screen name="PayDetails" component={PayDetailsScreen} options={{headerStyle:{backgroundColor:'#F47C7C'}, headerTintColor:'white'}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown:false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
})
 
export default App 