import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native';

const List = ({item, deleteItem}) => {
  return (
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listItemView}>
            <Text>{item.text}</Text>
            <Text>${item.amount}</Text>
            <Text style={styles.deletebtn} onPress={() => deleteItem(item.id)}>delete</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem:{
        padding:15,
        backgroundColor:'#f8f8f8',
        borderWidth:1,
        borderColor:'#eee'
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    deletebtn:{
    }
});

export default List