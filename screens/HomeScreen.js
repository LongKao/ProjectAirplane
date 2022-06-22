import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,Alert,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import Pay from "../components/Pay";
import Receive from "../components/Receive";

function HomeScreen({navigation,route}){
    //const { name } = route.params;
    return(
      <View style={styles.container}>
        <Header />
        <Pay />
        <Receive 
          navigation={navigation}
          name/>
      </View>
    );
  } 

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
})

export default HomeScreen