import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const List = ({item, deleteItem}) => {
  return (
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listItemView}>
            <Text style={{width:100}}>{item.text}</Text>
            <Text style={{width:100}}>${item.amount}</Text>
            <Text style={{width:100}}>{item.reason}</Text>
            <Icon.Button
                name="close"
                color="red"
                backgroundColor="#f8f8f8"
                
                onPress={() => deleteItem(item.id)}
            ></Icon.Button>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem:{
        padding:10,
        backgroundColor:'#f8f8f8',
        borderWidth:1,
        borderColor:'#eee'
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    }
});

export default List