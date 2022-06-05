import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Project Airplane</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop:30,
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign:'center'
  }
})

export default Header