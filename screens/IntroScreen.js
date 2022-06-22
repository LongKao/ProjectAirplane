import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,Alert,TextInput,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";

function IntroScreen({navigation}){

    const [input, setInput] = useState([]);

    const email_key = 'email_key';

    const [email, setEmail] = useState('');
    const onChangeEmail = textValue => {
        setEmail(textValue);
        //console.log(textValue)
        AsyncStorage.setItem(email_key,textValue)
        AsyncStorage.getItem(email_key).then((value)=>{console.log(value)}); 
    }

    useEffect(()=>{
        console.log("--------------------")

        AsyncStorage.getItem(email_key).then((value)=>{setEmail(value)}); 
        console.log("initiating email from history... "+JSON.stringify(email));
    },[])

    return(
    <View style={{
        flex:1
    }}>
        <Header/>
        <Text style={styles.introText}>Welcome to reFun!</Text>
        <View style={styles.introView}>
            <View>
            <Text style={{
                paddingHorizontal:'10%',
                alignSelf:'center',
                marginBottom:20}}>Please choose if you would like to proceed to summary or request payment:</Text>
                <TouchableOpacity
                    style={styles.introBtn}
                    onPress={()=>navigation.navigate('Home')}
                >
                    <Text style={styles.textBtn}>Summary</Text>
                </TouchableOpacity>
            </View>
            <Text style={{alignSelf:'center', fontSize:20}}>or</Text>
            <View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                <TouchableOpacity style={styles.introBtn} 
                    //title="Press here to request payment"
                    onPress={()=>{
                        if(email === null || email === ''){
                            Alert.alert('Darn', 'You forgot to enter your email', [{ text: "okie dokie", onPress: () => console.log("OK Pressed") }],{ cancelable: true });
                        }else{
                            navigation.navigate('Details',{email:email, params:input})}
                        }}
                >
                    <Text style={styles.textBtn}>Request payment</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.emailInput}
                    placeholder='Enter your email...'
                    value={email}
                    onChangeText={onChangeEmail}
                />
                </KeyboardAvoidingView>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    introView: {
        //setting flex:1 will make it disappear, so don't do it
        flex:1,
        justifyContent:'space-evenly'
    },
    emailInput:{
        alignSelf:'center',
        fontSize:20,
        paddingTop:10
    },
    introText:{
        fontFamily:'',
        fontStyle:'italic',
        //fontWeight:'bold',
        fontSize:30,
        paddingHorizontal:10,
        alignSelf:'center',
        paddingTop:30
    },
    introBtn:{
        marginBottom:10,
        alignItems:'center',
        backgroundColor:'#F47C7C',
        paddingVertical: '5%',
        marginHorizontal: '10%',
        borderRadius:100/2,
        flexDirection:'column',
        justifyContent: 'space-between'
    },
    textBtn:{
        color:'#fff',
        fontSize:20,
    }
})

export default IntroScreen