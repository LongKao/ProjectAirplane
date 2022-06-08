import React,{ useState } from "react";
import {View, Text, StyleSheet, Button, Alert, SafeAreaView, Pressable,TextInput, TouchableOpacity} from 'react-native';

const Additem = ({title, addItem}) => {
    
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const onChangeName = textValue => setText(textValue);
    const onChangeAmount = textValue =>setAmount(textValue);

    return (
        <View style={styles.additemView}>
            <TextInput 
                placeholder="Name..." 
                style={styles.input}
                onChangeText={onChangeName}
            />
            <TextInput
                placeholder="Amount..."
                onChangeText={onChangeAmount}
            />
            <TouchableOpacity 
                style={styles.btn} 
                onPress={() => addItem(text,parseInt(amount))}
                //onPress={console.log(text)}
                >
                <Text style={styles.btnText}>Add item</Text>
            </TouchableOpacity>
        </View>
    );
}
  
const styles = StyleSheet.create({
    additemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default Additem