import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const BackTopBar = ({ headline, func, icon=<AntDesign name="left" size={24} color="black" /> }) => {
  return (
    <View className="flex flex-row justify-between ">
      <TouchableOpacity onPress={() => func(false)}>
        {icon}
      </TouchableOpacity>
      <Text className="text-2xl font-semibold">{headline}</Text>
      <View></View>
    </View>
  );
};

export default BackTopBar;
