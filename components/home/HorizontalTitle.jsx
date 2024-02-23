import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HorizontalTitle = ({
  title = "Upcoming Events",
  action = "View all",
  func,
}) => {
  return (
    <TouchableOpacity onPress={func} className="mb-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-lg font-semibold">{title}</Text>
        <View className="flex flex-row justify-between items-center">
          <Text>{action}</Text>
          <Ionicons name="arrow-forward" size={20} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalTitle;
