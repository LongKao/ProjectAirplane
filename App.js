import React,{useState} from "react";
import {View, StyleSheet,Button,Text,TextInput} from 'react-native';
import Header from "./components/Header";
import Debt from "./components/Debt";
import OweMe from "./components/OweMe";
import PayRequest from "./components/PayRequest";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Header />
      <Debt />
      <OweMe navigation={navigation}/>
    </View>
  );
} 



function DetailsScreen({route}) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  const onChangeName = textValue => setName(textValue);
  const onChangeAmount = textValue => setAmount(textValue);
  const onChangeReason = textValue => setReason(textValue);

  const { email } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Enter a name..."
        onChangeText={onChangeName}
      />
      <TextInput
        placeholder="Enter amount..."
        onChangeText={onChangeAmount}
      />
      <TextInput
        placeholder="Enter a reason..."
        onChangeText={onChangeReason}
      />
      <PayRequest
        name={name}     
        amount={amount}
        reason={reason}
        email={email}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
})
 
export default App 