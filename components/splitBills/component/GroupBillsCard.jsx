import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { primeryColor } from "../../../utils/appstyle";
import AvatarStack from "./AvatarStack";

const GroupBillsCard = ({func}) => {
  return (
    <TouchableOpacity onPress={func}>
      <View className="h-24 w-24 bg-gray-100 rounded-2xl flex  ml-3">
        <Text
          style={styles.title}
          className="font-semibold text-center p-1 rounded-t-lg w-24"
        >
          Restaurant
        </Text>
        <View className="p-1">
          <Text style={styles.text}>Total bill</Text>
          <Text style={styles.text}>$ 0.00</Text>

          <AvatarStack />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupBillsCard;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    backgroundColor: primeryColor,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
