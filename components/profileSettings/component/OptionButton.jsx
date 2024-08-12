import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { primeryColor } from "../../../utils/appstyle";

const OptionButton = ({
  btnFunc,
  btnText,
  iconLeft = <AntDesign name="user" size={24} color={primeryColor} />,
  iconRight = <FontAwesome6 name="greater-than" size={16} color="black" />,
}) => {
  return (
    <TouchableOpacity
      onPress={btnFunc}
      className="flex flex-row justify-between items-center border px-4 py-3 rounded-xl border-slate-200 my-3"
    >
      <View className="flex flex-row justify-between items-center">
        {iconLeft}
        <Text className="">{btnText || "Add Button Text"}</Text>
      </View>
      {iconRight}
    </TouchableOpacity>
  );
};

export default OptionButton;
