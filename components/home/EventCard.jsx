import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import formatDate from "../../navigation/utils/dateConverter";

const EventCard = ({
  img = "https://img.freepik.com/free-vector/party-crowd-silhouettes-dancing-nightclub_1048-11557.jpg?t=st=1708730579~exp=1708734179~hmac=2a9d298a9c66d5a34961be7cec78ad87a11a02d4ec56cceb25245649a4cfab97&w=900",
  category = "Birthday Party",
  title,
  location,
  date,
  time,
  func,
}) => {
  return (
    <TouchableOpacity onPress={func} style={styles.container}>
      <Image style={styles.image} source={{ uri: img }} />
      <View className="p-2">
        <Text className="text-center text-sm font-semibold">
          {category.substring(0, 20)}
        </Text>
        <Text className="text-center text-xs font-semibold">
          {title.substring(0, 40) + "..." || "Pascal's Birthday"}
        </Text>
        <Text className="text-center text-xs text-gray-600">
          {location.substring(0, 30) || "Lekki, Lagos"}
        </Text>
        <Text className="text-center text-xs text-gray-600">
          {formatDate(date) || "12th June, 2024"}
        </Text>
        <Text className="text-center text-xs text-gray-600">
          {time || "10:00 am"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: 221,
    width: 162,
    backgroundColor: "#f5fcff",
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default EventCard;
