import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,TextInput, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StripeProvider,CardField,useConfirmPayment } from "@stripe/stripe-react-native";
// import { fetchPublishableKey } from "../helper";
// import { API_URL } from "../Config";

//TODO its recommended to load publishableKey from  a server rather than hard code it

function PaymentScreen({navigation,route}) {
    const [publishableKey, setPublishableKey] = useState('')
    const [name, setName] = useState('')
    const {confirmPayment, loading} = useConfirmPayment()

    const handlePayPress = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency:'cad'
            })
        })
        const {clientsecret} = await response.json()

        const {} = await confirmPayment(clientsecret, {
            type: 'Card',
            billingDetails: {name}
        })

        if(error){
            Alert.alert(`Error code: ${error.code}`, error.message)
        }else if(paymentIntent){
            Alert.alert('Success', `Payment successful: ${paymentIntent.id}`)
        }
    }

    useEffect(()=>{
        async function init(){
            const publishableKey = await fetchPublishableKey()
            if(publishableKey){
                setPublishableKey(publishableKey)
            }
        }
    })
    return (
        <StripeProvider publishableKey={publishableKey}>
            <TextInput
                autoCapitalize="none"
                placeholder="Name"
                keyboardType="name-phone-pad"
                onChange={(value) => setName(value.nativeEvent.text)}
                style={styles.input}
            />
            <CardField
                postalCodeEnabled={false}
                placeholders={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                    //marginTop: 100
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
                />
                <Button title="Pay" onPress={handlePayPress}/>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
  input:{
    marginTop:100
  }
})

export default PaymentScreen