import React, { useState } from "react";
import {View, Text, StyleSheet,FlatList, TextInput,Button, Pressable,Share} from 'react-native';
import List from "./List";
import uuid from 'react-native-uuid';
import Additem from "./Additem";

const OweMe = ({navigation}) => {
    let totalAmount = 0;
    
    const [items, setItems] = useState([
        {id: uuid.v4(),amount:15, text:'Frank Roosvelt'},
        {id: uuid.v4(),amount:30, text:'Paul'}
    ]);    

    for(let item of items)totalAmount+=item.amount;

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }

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

    const [email, setEmail] = useState('');
    const onChangeEmail = textValue => setEmail(textValue);

    return (
        <View style={styles.OweMe}>
            <Text style={styles.text}>Receive</Text>
            <Text style={styles.text}>${totalAmount}</Text>
            {/* <Additem addItem={addItem} */}
            <FlatList 
                data={items} 
                renderItem={({item}) => (
                <List item = {item} 
                deleteItem={deleteItem}/>
            )}
            />
            <TextInput
                placeholder='Enter your email...'
                onChangeText={onChangeEmail}
            />
            <Pressable style={styles.payReq} onPress={() => navigation.navigate('Details',{email:email})}>
                <Text style={styles.textbtn}>Request payment</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  OweMe: {
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

export default OweMe