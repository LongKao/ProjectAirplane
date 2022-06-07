import React, { useState,useEffect } from "react";
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import List from "./List";
import uuid from 'react-native-uuid';
import Additem from "./Additem";
import Data from "../data/DataPay.json"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Debt = () => {
    const [input, setInput] = useState('');
    const initData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('payData', jsonValue)
        } catch (e) {
        // saving error
        }
        console.log('Data stored');
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('payData');

            if (value !== null) {
            setInput(value);
            }
        } catch(e) {
          // error reading value
        }
        console.log('Data retrieved');
    }
    
    useEffect(()=>{
        console.log("--------------------")
        //console.log('test')
        initData(Data);
        getData();
        console.log('data result '+ input)
    })

    //console.log(Data)
    let totalAmount = 0;
    const [items, setItems] = useState([
        {id: uuid.v4(),amount:20, text:'John Doe'},
        {id: uuid.v4(),amount:50, text:'Will Hohenzollern'}
    ]);

    for(let item of Data)totalAmount+=item.amount;

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };


    const addItem = (text,amount) => {
        if(!text){
            Alert.alert('Error', 'Please enter an item', {text: 'Ok'})
        }
        else{
            setItems(prevItems => {
            return [{id: uuid.v4(), amount, text}, ...prevItems];
            });
        }
    }

    return (
        <View style={styles.Debt}>
            <Text style={styles.text}>Pay</Text>
            <Text style={styles.text}>${totalAmount}</Text>
            <Additem addItem={addItem}/>
            <FlatList 
                data={JSON.parse(input)} 
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
    flex:1
  },
  text: {
    //color: '#fff',
    fontSize: 23,
    textAlign:'center'
  }
})

export default Debt