import {TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ buttonFunc, backgroundColor = "#f9784b", label="Click me", color="#fff" }) => {
    const styles = StyleSheet.create({
      button: {
        backgroundColor: backgroundColor,
        borderRadius: 25,
        width: 353,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5,
      },
      label: {
        fontSize: 18,
        fontFamily: "Poppins_400Regular",
        fontWeight: "500",
        lineHeight: 26,
        textAlign: "center",
        color: color,
      },
    });

  return (
    <TouchableOpacity style={styles.button} onPress={buttonFunc}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};


export default CustomButton