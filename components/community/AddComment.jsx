import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AvatarStack from "../splitBills/component/AvatarStack";
import { Octicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import PostCom from "./PostCom";
import UserCommentCom from "./UserCommentCom";

const AddComment = () => {
  return (
    <SafeAreaView className="flex-1 pt-14 pb-8 bg-white">
      {/* top section */}
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/free-photo/decorated-banquet-hall-with-served-round-table-with-hydrangea-centerpiece-chiavari-chairs_8353-10059.jpg?t=st=1714005008~exp=1714008608~hmac=808f01105efa63d0d81162d24a9046582dd11564e9c9f209c4e2a6d90ea88cf1&w=826",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Ballers Corner</Text>
          </View>
          <View
            className="w-full py-2 px-6 rounded-t-md border-b-2 border-gray-300 bg-white"
            style={{
              position: "relative",
              bottom: 0,
            }}
          >
            <View className="flex items-center justify-between mb-2 py-4">
              <View className="w-20 h-2 bg-slate-200 rounded-2xl mb-4"></View>
              <Text className="font-semibold text-lg">Comments</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* post preview */}
      <ScrollView className="flex-1 bg-white">
        <View className="px-6 py-2 border-b-2 border-gray-300 bg-white ">
          <PostCom />
        </View>
        {/* comments section */}
        <UserCommentCom />
      </ScrollView>
    </SafeAreaView>
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

export default AddComment;
