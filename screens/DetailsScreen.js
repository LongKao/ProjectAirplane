import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,Alert,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import PayRequest from "../components/PayRequest";

function DetailsScreen({navigation,route}) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState('');
  
    const onChangeName = textValue => setName(textValue);
    const onChangeAmount = textValue => setAmount(textValue);
    const onChangeReason = textValue => setReason(textValue);
  
    const { email } = route.params;
    //const { data } = route.params;
  
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
        <PayRequest 
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
  
})

export default DetailsScreen