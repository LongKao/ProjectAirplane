import React,{useState,useEffect} from "react";
import {View, StyleSheet,KeyboardAvoidingView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import Pay from "../components/Pay";
import Receive from "../components/Receive";

function HomeScreen({navigation,route}){
    //const { name } = route.params;
    return(
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <Header 
          title={"Summary"}
        />
        <Pay 
          navigation={navigation}
        />
        <Receive 
          navigation={navigation}
          name/>
      </KeyboardAvoidingView>
    );
  } 

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
})

export default HomeScreen