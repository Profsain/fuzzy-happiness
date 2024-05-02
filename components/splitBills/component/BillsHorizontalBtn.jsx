import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import { primeryColor } from "../../../utils/appstyle";

const BillsHorizontalBtn = ({
    iconLeft = <AntDesign name="arrowright" size={18} color={primeryColor} />,
    text = "Pay someone",
    func
}) => {
  return (
    <TouchableOpacity
      className="flex flex-row content-center justify-between items-center px-4 py-2 border-t border-gray-300 mt-3"
      onPress={func}
    >
      <View className="flex flex-row content-center items-center">
        <View className="bg-gray-200 p-1 rounded-lg">
          {iconLeft}
        </View>
        <Text className="ml-2 font-medium">{text}</Text>
      </View>
      <AntDesign name="right" size={18} color="black" />
    </TouchableOpacity>
  );
}

export default BillsHorizontalBtn