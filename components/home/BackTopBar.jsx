import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const BackTopBar = ({ headline, func, func2, icon=<AntDesign name="left" size={24} color="black" />, icon2 }) => {
  return (
    <View className="flex flex-row justify-between ">
      <TouchableOpacity onPress={func}>
        {icon}
      </TouchableOpacity>
      <Text className="text-2xl font-semibold">{headline}</Text>
      <View>
         <TouchableOpacity onPress={func2}>
        {icon2}
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackTopBar;
