import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HorizontalTitle = ({
  title = "Upcoming Events",
  action = "View all",
  icon = <Ionicons name="arrow-forward" size={20}color="black" />,
  func,
}) => {
  return (
    <View className="mb-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-lg font-semibold">{title}</Text>
        <TouchableOpacity onPress={func} className="flex flex-row justify-between items-center">
          <Text>{action}</Text>
          {icon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HorizontalTitle;
