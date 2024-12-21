import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { Button } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { fonts, primeryColor } from "../../utils/appstyle";

const CarouselCard = ({
  imageSource = require("../../assets/images/slide1.jpg"),
  title = "Discover Nearby",
  address = "",
  description = "Uncover nearby gems! Find events, groups and connections just around the corner. Start exploring now!",
  btnFunc,
  cta,
}) => {
  return (
    <ImageBackground
      source={
        typeof imageSource === "string"
          ? { uri: imageSource } // Use URL if imageSource is a string
          : imageSource // Otherwise, use local source
      }
      style={styles.imageBackground}
    >
      <View className="w-full p-4 " style={styles.container}>
        <Text className="font-extrabold mb-2 text-lg italic text-white">
          {title}
        </Text>
        <Text className="text-white">{description}</Text>
        <Text className="text-slate-200 text-xs pt-1">{address}</Text>

        <Button
          mt={8}
          width={70}
          height={30}
          borderRadius={30}
          backgroundColor={primeryColor}
          onPress={btnFunc}
        >
          {cta ? (
            <Text className="text-xs text-white">{cta}</Text>
          ) : (
            <AntDesign name="arrowright" size={24} color="white" />
          )}
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 172,
    borderRadius: 20,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "letf",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  title: {
    fontFamily: fonts.extrabold,
    marginBottom: 2,
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
  },
  description: {
    color: "white",
  },
});

export default CarouselCard;
