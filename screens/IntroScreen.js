import React,{useState,useEffect, useCallback} from "react";
import {View, StyleSheet,Button,Text,Alert,TextInput,KeyboardAvoidingView,TouchableOpacity, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/FontAwesome';

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

    // function twilio(){
    //     const accountSid = AC94f17e5201e4dfc7b2c999c34ef77126;
    //     const authToken = ea0f37ec423c2f871482ce5a05b9e19d;
    //     const client = require('twilio')(accountSid, authToken);

    //     client.messages
    //     .create({
    //         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //         from: '+13349464257',
    //         to: '+13435488536'
    //     })
    //     .then(message => console.log(message.sid));
    // }

    useEffect(()=>{
        console.log("--------------------")

        AsyncStorage.getItem(email_key).then((value)=>{setEmail(value)}); 
        console.log("initiating email from history... "+JSON.stringify(email));
    },[])

    return(
    <View style={{
        flex:1
    }}>
        <Header
            title={"reFun"}    
        />
        <Pressable style={styles.homeBtn}>
            <Icon.Button
                name="home"
                color="#000000"
                backgroundColor="transparent"
                size={30}
                onPress={()=>navigation.navigate('Home')}
                >
            </Icon.Button>
        </Pressable>
        <View style={styles.introView}>
            <View>
            <Text style={{
                paddingHorizontal:'10%',
                alignSelf:'center',
                marginBottom:20}}>Please choose if you would like to proceed to send payment or request payment:</Text>
                <TouchableOpacity
                    style={styles.introBtn}
                    onPress={()=>{navigation.navigate('PayDetails')}}
                >
                    <Text style={styles.textBtn}>Send money</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.introBtn} 
                    //title="Press here to request payment"
                    onPress={()=>{navigation.navigate('ReceiveDetails',{email:email, params:input})}}
                    >
                    <Text style={styles.textBtn}>Request money</Text>
                </TouchableOpacity>
                
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
        paddingVertical: '20%',
        marginHorizontal: '10%',
        borderRadius:100/2,
        flexDirection:'column',
        justifyContent: 'space-between'
    },
    textBtn:{
        color:'#fff',
        fontSize:20,
    },
    homeBtn:{
        backgroundColor:"transparent",
        flexDirection:'row',
        alignItems:'center',
        //paddingLeft:10
    }
})

export default IntroScreen