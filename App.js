import React,{useState,useEffect} from "react";
import {View, StyleSheet,Button,Text,TextInput} from 'react-native';
import Header from "./components/Header";
import Pay from "./components/Pay";
import Receive from "./components/Receive";
import PayRequest from "./components/PayRequest";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({navigation,route}){
  //const { name } = route.params;
  return(
    <View style={styles.container}>
      <Header />
      <Pay />
      <Receive 
        navigation={navigation}
        name/>
    </View>
  );
} 



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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{headerStyle:{backgroundColor:'#F47C7C'}, headerTintColor:'white'}}/>
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