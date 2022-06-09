import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet,FlatList, TextInput, Pressable,Alert} from 'react-native';
import List from "./List";
import uuid from 'react-native-uuid';
import Additem from "./Additem";
import Data from "../data/DataReceive.json"     //for sample data values
import AsyncStorage from '@react-native-async-storage/async-storage';

const Receive = ({navigation}) => {
    
    const [input, setInput] = useState([]);

    const storage_Key = 'receiveData'; 

    let totalAmount = 0;
    //const { name } = route.params.name;
    // const [items, setItems] = useState([
    //     {id: uuid.v4(),amount:15, text:'Frank Roosvelt'},
    //     {id: uuid.v4(),amount:30, text:'Paul'}
    // ]);    

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

    for(let item of input)totalAmount+=item.amount;
    
    // const addItem = (text,amount) => {
    //     if(!text){
    //         Alert.alert('Error', 'Please enter an item', {text: 'Ok'})
    //     }
    //     else{
    //         setItems(prevItems => {
    //             return [{id: uuid.v4(), amount, text}, ...prevItems];
    //         });
    //     }
    // }

    const deleteItem = (id) => {
        // setItems(prevItems => {
        //     return prevItems.filter(item => item.id != id);
        // });
        let position = input.findIndex(function(object){
            return object.id === id
        })
        console.log("id " + input.findIndex(function(object){
            return object.id === id
        }));
        input.splice(position,1);   //removes obj at "position" in a save file
       
        setInput(prevItems => {     //removes same obj in the app's ui
            return prevItems.filter(item => item.id != id);
        });

        console.log("before setinput "+JSON.stringify(input));
        setData(input)
    }

    const [email, setEmail] = useState('');
    const onChangeEmail = textValue => setEmail(textValue);

    useEffect(()=>{
        console.log("--------------------")
        //setData(Data);                    //uncomment to set sample data
        //getData()
        //console.log("input: "+JSON.stringify(data))
        const toggle = setInterval(() => {
            getData()
        }, 100);
        return () => clearInterval(toggle);
    },[])

    return (
        <View style={styles.Receive}>
            <Text style={styles.text}>Receive</Text>
            <Text style={styles.text}>${totalAmount}</Text>
            {/* <Additem addItem={addItem} */}
            <Text>Name</Text>
            <FlatList 
                data={input} 
                renderItem={({item}) => (
                <List item = {item} 
                deleteItem={deleteItem}/>
            )}
            />
            <TextInput
                placeholder='Enter your email...'
                onChangeText={onChangeEmail}
            />
            <Pressable style={styles.payReq} onPress={() => {
                if(email === ''){
                    Alert.alert('Darn', 'You forgot to enter your email', [{ text: "okie dokie", onPress: () => console.log("OK Pressed") }],{ cancelable: true });
                }else{
                    navigation.navigate('Details',{email:email, params:input})}
                }
                }>
                <Text style={styles.textbtn}>Request payment</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  Receive: {
    flex:1
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
  textbtn: {
    //color:'#fff',
    fontSize:20,
  },
  text: {
    //color: '#fff',
    fontSize: 23,
    textAlign:'center'
  }
})

export default Receive