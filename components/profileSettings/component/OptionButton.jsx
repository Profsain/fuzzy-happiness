import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

const OptionButton = () => {
  return (
    <TouchableOpacity>
      <View>
        <AntDesign name="user" size={24} color="black" />
        <Text>OptionButton Text</Text>
      </View>
      <FontAwesome6 name="greater-than" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default OptionButton;
