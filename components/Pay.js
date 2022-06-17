import React, { useState,useEffect } from "react";
import {View, Text, StyleSheet, FlatList, Alert,Button} from 'react-native';
import List from "./List";
import uuid from 'react-native-uuid';
import Additem from "./Additem";
import Data from "../data/DataPay.json"     //for sample data values(look useEffect function)
import AsyncStorage from '@react-native-async-storage/async-storage';

const Debt = () => {

    const [input, setInput] = useState([]);

    const storage_Key = 'payData';          //this is a file name which keeps data about people user owes to


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
                console.log(value)
            }
        } catch(e) {
            console.log(e)
          // error reading value
        }
        console.log('Data retrieved');
    }

    let totalAmount = 0.00;

    for(let item of input)totalAmount+=item.amount;

    const addItem = (text,amount,reason) => {
        if(text==='' || amount===0 || isNaN(amount)==true || reason===''){
            Alert.alert('Oopsie', 'Please enter correct information', [{ text: "okie dokie", onPress: () => console.log("OK Pressed") }],{ cancelable: true });
        }
        else{
            let content = {id: uuid.v4(), amount, text, reason}
            
            //console.log("before setinput "+input);
            input.push(content); //updates input = (input+content)
            //setInput(input);
            console.log("input "+JSON.stringify(input))
            setInput(prevItems => {
                return [...prevItems];
            });
            //console.log("after setinput "+input);
            
            //console.log("before adding setData "+JSON.stringify(input));
            
            setData(input);
 
            //console.log("after adding setData "+JSON.stringify(input));
        }
    }

    const deleteItem = (id) => {
        
        //setInput(input.filter(item => item.id != id));
        let position = input.findIndex(function(object){
            return object.id === id
        })
        // console.log("id " + input.findIndex(function(object){
        //     return object.id === id
        // }));
        input.splice(position,1);   //removes obj at "position" in a save file
       
        setInput(prevItems => {     //removes same obj in the app's ui
            return prevItems.filter(item => item.id != id);
        });

        //console.log("before setinput "+JSON.stringify(input));
        setData(input)
    };

    useEffect(()=>{
        console.log("--------------------")
        //setData(Data);                    //uncomment to set sample data
        getData()
    },[])

    return (
        <View style={styles.Debt}>
            <Text style={styles.text}>Pay</Text>
            <Text style={styles.text}>${totalAmount}</Text>
            <Additem addItem={addItem}/>
            <FlatList 
                data={input} 
                renderItem={({item}) => (
                <List item = {item} 
                deleteItem={deleteItem}/>
            )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  Debt: {
    flex:1,
    padding:10
  },
  text: {
    //color: '#fff',
    fontSize: 23,
    textAlign:'center'
  }
})

export default Debt