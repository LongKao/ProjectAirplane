import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,Alert,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import ReceiveRequest from "../components/ReceiveRequest";

function ReceiveDetailsScreen({navigation,route}) {

    const email_key = 'email_key';

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState('');
    const [email, setEmail] = useState('');
     
    const onChangeName = textValue => setName(textValue);
    const onChangeAmount = textValue => setAmount(textValue);
    const onChangeReason = textValue => setReason(textValue);
    const onChangeEmail = textValue => {
      setEmail(textValue);
      //console.log(textValue)
      AsyncStorage.setItem(email_key,textValue)
      AsyncStorage.getItem(email_key).then((value)=>{console.log(value)}); 
    }
    //const { email } = route.params;
    //const { data } = route.params;

    useEffect(()=>{
      console.log("--------------------")

      AsyncStorage.getItem(email_key).then((value)=>{setEmail(value)}); 
      console.log("initiating email from history... "+JSON.stringify(email));
    },[])
  
    return (
      <View style={{flex:1, alignItems:'center',justifyContent: 'space-around'}}>
        {/* <Button
          title="Go back"
          onPress={() => navigation.navigate('Home')}
        /> */}
        <TextInput
          style={{
            fontSize:80
          }}
          keyboardType="numeric"
          placeholder="$0"
          onChangeText={onChangeAmount}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignSelf:'stretch'}}>
          <TextInput
            style={{fontSize:20}}
            placeholder="Enter a name..."
            onChangeText={onChangeName}
          />
          <TextInput
            style={{fontSize:20}}
            placeholder="Enter a reason..."
            onChangeText={onChangeReason}
          />
        </View>
        <TextInput
                    style={styles.emailInput}
                    placeholder='Enter your email...'
                    value={email}
                    onChangeText={onChangeEmail}
                />
        <ReceiveRequest 
          navigation={navigation}
          name={name}     
          amount={amount}
          reason={reason}
          email={email}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  emailInput:{
    alignSelf:'center',
    fontSize:20,
    paddingBottom:10
  },
})

export default ReceiveDetailsScreen