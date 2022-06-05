import React, { useState } from "react";
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import List from "./List";
import uuid from 'react-native-uuid';
import Additem from "./Additem";

const Debt = () => {
    let totalAmount = 0;
    const [items, setItems] = useState([
        {id: uuid.v4(),amount:20, text:'John Doe'},
        {id: uuid.v4(),amount:50, text:'Will Hohenzollern'}
    ]);

    for(let item of items)totalAmount+=item.amount;

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
                data={items} 
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