import React from "react";
import {View, Text, StyleSheet, Share, Alert, Pressable} from 'react-native';

const PayRequest = (props) => {

  const onShare = async () => {

    try {
      const result = await Share.share({
        message:
        'Hey '+props.name+'! Can you send me back $'+props.amount+' for '+props.reason+' to '+props.email,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // const addItem = (text,amount) => {
  //   if(!text){
  //       Alert.alert('Error', 'Please enter an item', {text: 'Ok'})
  //   }
  //   else{
  //       setItems(prevItems => {
  //       return [{id: uuid.v4(), amount, text}, ...prevItems];
  //       });
  //   }
  // }

  return (
    <View>
      <Pressable style={styles.payReq} onPress={onShare}>
          <Text style={styles.text}>Send the request</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  touchEffect:{
    backgroundColor:'#f8f8f8',
    borderColor:'#eee'
  },
  payReq: {
    //flex:1,
    //justifyContent:'flex-end',
    //paddingBottom:30,
    alignItems:'center',
    backgroundColor:'#73b5d3',
    paddingVertical: 12,
    marginHorizontal: 100,
    borderRadius:100/2,
    //elevation: 3,
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  text: {
    //color:'#fff',
    fontSize:20,
  }
})

export default PayRequest