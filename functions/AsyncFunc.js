//doesnt work
//to be deleted

import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


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

const getData = async (storage_Key,input,setInput) => {
    try {
        const value = await AsyncStorage.getItem(storage_Key);
        if (value !== null) {
            setInput(JSON.parse(value));
            console.log("worked!")
        }
    } catch(e) {
        console.log(e)
          // error reading value
    }
        //console.log('Data retrieved');
}


export default {setData,getData}