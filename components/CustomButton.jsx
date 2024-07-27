import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { fonts, primeryColor } from "../utils/appstyle";

const CustomButton = ({
  width = 300,
  height = 46,
  buttonFunc,
  backgroundColor = primeryColor,
  label = "Click me",
  color = "#fff",
  mr,
  mt = 25,
  fSize = 18,
  bradius = 25
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor,
      borderRadius: bradius,
      width: width,
      height: height,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      marginBottom: mt,
      marginRight: mr,
    },
    label: {
      fontSize: fSize,
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
