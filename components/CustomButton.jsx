import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { fonts, primeryColor } from "../utils/appstyle";

const CustomButton = ({
  buttonFunc,
  backgroundColor = primeryColor,
  label = "Click me",
  color = "#fff",
}) => {

  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor,
      borderRadius: 25,
      width: 353,
      height: 46,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      fontFamily: fonts,
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

export default CustomButton;
