import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Refun</Text>
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
    marginBottom:10
  }
})

export default Header