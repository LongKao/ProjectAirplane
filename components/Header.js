import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    //height: 60,
    paddingTop: 43,
    //padding: 15,
    backgroundColor: '#f47c7c',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    textAlign:'center',
    marginBottom:10,
    fontWeight:'bold'
  }
})

export default Header