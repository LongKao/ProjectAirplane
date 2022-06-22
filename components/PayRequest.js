import React, { useState,useEffect } from "react";
import {View, Text, StyleSheet, Share, Alert, TouchableOpacity, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

const PayRequest = (props) => {

  const [input, setInput] = useState([]);
 

  const storage_Key = 'receiveData';          //this is a file name which keeps data about people user owes to
  

  //----------------------------------------
  //2 functions below are used for reading and writing a data file
  const setData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      AsyncStorage.setItem(storage_Key, jsonValue)
    } catch (e) {
      console.log(e)
      // saving error
    }
    console.log('Data stored');
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(storage_Key);
      if (value !== null) {
        setInput(JSON.parse(value));
        //console.log("value "+value)
      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
    console.log('Data retrieved');
  }

  // this function checks if the input is valid. If successfull saves message that will be shared and executes addItem function.
  const onShare = async () => {
    try {
      if(props.name==='' || props.amount===0 || isNaN(props.amount)==true || props.reason===''){
        Alert.alert('Uh oh', 'Please enter correct information', [{ text: "okie dokie", onPress: () => console.log("OK Pressed") }],{ cancelable: true });
      }
      else{
        const result = await Share.share({
          message:
          'Hey '+props.name+'! Can you send me back $'+props.amount+' for '+props.reason+' to '+props.email,
        });
        addItem(props.name,props.amount,props.reason)
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.log(e)
    }
  };
  
  //takes the input and updates local "input" variable and data file
  const addItem = (text,amount,reason) => {
      amount = parseFloat(parseFloat(amount).toFixed(2))
      let content = {id: uuid.v4(), amount, text, reason}
        
      input.push(content); //updates input = (input+content)

      //console.log("input "+JSON.stringify(input))
      setInput(prevItems => {
          return [...prevItems];
      });
      setData(input);
  }
  
  useEffect(()=>{
    console.log("--------------------")
    //setData(Data);                    //uncomment to set sample data(for testing delete)
    getData()
  },[])

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.payReq} onPress={()=>{onShare()}}>
          <Text style={styles.text}>Send the request</Text>
          <Icon name="paper-plane" color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    
  },
  touchEffect:{
    backgroundColor:'#f8f8f8',
    borderColor:'#eee'
  },
  payReq: {
    //flex:1,
    //justifyContent:'flex-end',
    //paddingBottom:30,
    alignItems:'center',
    backgroundColor:'#F47C7C',
    paddingVertical: 12,
    paddingHorizontal:'10%',
    borderRadius:100/2,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  text: {
    color:'#fff',
    fontSize:20,
    paddingHorizontal:10
  }
})

export default PayRequest