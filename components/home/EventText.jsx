import { View, Text } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

const EventText = () => {
  return (
    <View className="my-6 flex">
      <View className="mr-4 ">
        <Fontisto name="date" size={24} color="black" />
      </View>
      <Text>EventText</Text>
    </View>
  );
};

export default EventText;
