import { Alert } from "react-native";
import { API_URL } from "./Config";

export async function fetchPublishableKey(){
    try{
        const response = await fetch(`${API_URL}/config`)
        const {publishableKey} = await response.json()
        console.log("Publishable key fetched")
        return publishableKey
    } catch(e) {
        console.log(e)
        console.warn('Unable to fetch publishable key. Is your server running?')
        Alert.alert('Error','Unable to fetch publishable key. Is your server running?')
    }
}