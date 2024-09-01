import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { primeryColor } from "../../../utils/appstyle";
import AvatarStack from "./AvatarStack";
import shortenValue from "../../../utils/shortenValue";

const GroupBillsCard = ({ func, eventName, eventCost, currency }) => {
  return (
    <TouchableOpacity onPress={func}>
      <View className="h-24 w-24 bg-gray-100 rounded-2xl flex  ml-2">
        <Text
          style={styles.title}
          className="font-semibold text-center p-1 rounded-t-lg w-24"
        >
          {eventName?.slice(0, 10) || "Event Name"}
        </Text>
        <View className="p-1">
          <View  >
            <Text style={styles.text}>Total bills:</Text>
            <Text style={styles.text}>
              {currency || "$"}
              {shortenValue(eventCost?.toFixed(2)) || "0.00"}
            </Text>
          </View>
          {/* <AvatarStack hw={12} /> */}
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
