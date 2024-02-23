import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const EventCard = () => {
  return (
    <View style={styles.constainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/slider5.jpg")}
      />
      <View className="p-2">
        <Text className="text-center text-sm font-semibold">
          Birthday Party
        </Text>
        <Text className="text-center text-xs font-semibold">
          Profsain Birthday
        </Text>
        <Text className="text-center text-xs text-gray-600">Sweet Sensation, 245, Alagomeji Yaba</Text>
        <Text className="text-center text-xs text-gray-600">Friday, March 12th, 2024</Text>
        <Text className="text-center text-xs text-gray-600">12:00 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    constainer: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: 221,
        width: 162,
        backgroundColor: "#f5fcff",
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    });

export default EventCard;
