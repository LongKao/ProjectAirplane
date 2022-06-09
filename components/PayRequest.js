import React, { useState,useEffect } from "react";
import {View, Text, StyleSheet, Share, Alert, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
const PayRequest = (props) => {

  const [input, setInput] = useState([]);
 

  const storage_Key = 'receiveData';          //this is a file name which keeps data about people user owes to
  

  //----------------------------------------2 functions below are used for reading and writing a data file
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
        console.log("value "+value)
      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
    console.log('Data retrieved');
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        'Hey '+props.name+'! Can you send me back $'+props.amount+' for '+props.reason+' to '+props.email,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(result.activityType)
        } else {
          // shared
          console.log("Send the request pressed")
          // console.log("props.data "+input);
          // let amountt = props.amount;
          // let namee = props.name;
          // console.log("amount and name: "+amountt+" "+namee)
          // let content = {id: uuid.v4(), amountt, namee}
            
          //   //console.log("before setinput "+input);
          //   input.push(content); //updates input = (input+content)
          //   //setInput(input);
          //   console.log("input "+JSON.stringify(input))
          //   setInput(prevItems => {
          //       return [...prevItems];
          //   });
          //   //console.log("after setinput "+input);
            
          //   console.log("before adding setData "+JSON.stringify(input));
            
          //   setData(input);
 
          //   console.log("after adding setData "+JSON.stringify(input));
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismissed!");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  const addItem = (text,amount) => {
    console.log("text "+text)
    if(text==='' || amount===0){
        Alert.alert('Error', 'Please enter an item', {text: 'Ok'})
    }
    else{
        amount = parseInt(amount)
        let content = {id: uuid.v4(), amount, text}
        
        input.push(content); //updates input = (input+content)
        //setInput(input);
        console.log("input "+JSON.stringify(input))
        setInput(prevItems => {
            return [...prevItems];
        });
        //console.log("after setinput "+input);
        
        console.log("before adding setData "+JSON.stringify(input));
        
        setData(input);
        
        console.log("after adding setData "+JSON.stringify(input));
    }
  }
  
  useEffect(()=>{
    console.log("--------------------")
    //setData(Data);                    //uncomment to set sample data
    getData()
  },[])

  return (
    <View>
      <Pressable style={styles.payReq} onPress={()=>{onShare(); addItem(props.name,props.amount)}}>
          <Text style={styles.text}>Send the request</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  touchEffect:{
    backgroundColor:'#f8f8f8',
    borderColor:'#eee'
  },
  payReq: {
    //flex:1,
    //justifyContent:'flex-end',
    //paddingBottom:30,
    alignItems:'center',
    backgroundColor:'#73b5d3',
    paddingVertical: 12,
    marginHorizontal: 100,
    borderRadius:100/2,
    //elevation: 3,
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  text: {
    //color:'#fff',
    fontSize:20,
  }
})

export default PayRequest