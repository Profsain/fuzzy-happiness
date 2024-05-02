import React from "react";
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";
import AvatarStack from "../splitBills/component/AvatarStack";
import { Octicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";

const TopComPageCard = ({
  communityName,
  communityDescription,
  communityMembers,
  coverImage,
  createdBy,
  images,
  noOfPosts,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            coverImage ||
            "https://img.freepik.com/free-photo/decorated-banquet-hall-with-served-round-table-with-hydrangea-centerpiece-chiavari-chairs_8353-10059.jpg?t=st=1714005008~exp=1714008608~hmac=808f01105efa63d0d81162d24a9046582dd11564e9c9f209c4e2a6d90ea88cf1&w=826",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{communityName || "Ballers Corner"}</Text>
          <Text style={styles.text2}>
            {communityDescription.slice(0, 120) ||
              "Step into Ballers Corner, where every connection transforms into a vibrant experience. In our community, each interaction is a journey....."}
          </Text>
        </View>
        <View
          className="w-full py-2 px-6 rounded-t-md"
          style={{
            backgroundColor: primeryColor,
            position: "relative",
            bottom: 0,
          }}
        >
          <View className="flex flex-row items-center justify-between mb-2">
            <View className="flex flex-row items-center">
              <AvatarStack hw={25} images={images} />
              <Text className="pl-3 font-semibold">
                {communityMembers.length || 0} Members
              </Text>
            </View>

            {/* share button */}
            <TouchableOpacity className="p-2 rounded-full border border-cyan-50 h-8 w-8">
              <Octicons name="share" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center">
            <Text className="text-sm">
              Created by {createdBy.firstName || "John"}
            </Text>
            <Text className="ml-3 py-1 px-2 bg-white rounded-3xl">
              {noOfPosts} Posts
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Full width
    height: 235, // Height of 235px
    
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingBottom: 10,
  },
  text2: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
  },
});

export default TopComPageCard;
