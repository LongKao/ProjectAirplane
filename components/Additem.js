//this component is used in "Pay" component. 
//Includes input forms for name, amount and reason and add button

import React,{ useState } from "react";
import {View, Text, StyleSheet, Button, Alert, SafeAreaView, Pressable,TextInput, TouchableOpacity} from 'react-native';

const Additem = ({title, addItem}) => {
    
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState('');

    const onChangeName = textValue => setText(textValue);
    const onChangeAmount = textValue => setAmount(textValue);
    const onChangeReason = textValue => setReason(textValue); 
    let nameRef = React.createRef();
    let amountRef = React.createRef();
    let reasonRef = React.createRef();
    return (
        <View style={styles.additemView}>
            <TextInput 
                autoComplete="name"
                ref={nameRef}
                placeholder="Name..." 
                style={styles.input}
                onChangeText={onChangeName}
            />
            <TextInput
                ref={amountRef}
                keyboardType="numeric"
                placeholder="Amount..."
                style={styles.input}
                onChangeText={onChangeAmount}
            />
            <TextInput
                ref={reasonRef}
                placeholder="Reason..."
                style={styles.input}
                onChangeText={onChangeReason}
            />
            <TouchableOpacity 
                style={styles.btn} 
                onPress={() => {
                    addItem(text,parseFloat(parseFloat(amount).toFixed(2)),reason);
                    setText('');
                    setAmount(0);
                    setReason('');
                    nameRef.current.clear();
                    amountRef.current.clear();
                    reasonRef.current.clear();
                    console.log(text)
                }}
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
    },
    input:{
        width:"25%"
    }
})

export default Additem