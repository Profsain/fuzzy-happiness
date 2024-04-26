import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MemberProfieTop from "./MemberProfieTop";

const PostCom = () => {
  const navigation = useNavigation();
  // handle open comment screen
  const openComment = () => {
    // navigate to comment screen
    navigation.navigate("AddComment");
  };

  return (
    <View className="px-6 py-4 border-b-2 border-gray-300">
      {/* publisher profile section */}
      <MemberProfieTop />

      {/* post content */}
      <View className="mt-4">
        <Text>
          Life Sequence: A Journey Through Time and Experience Life is a
          remarkable sequence of events, an intricate tapestry woven with
          threads of moments, emotions, and growth.
        </Text>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740",
          }}
          className="h-52 w-full rounded-lg mt-4"
        />

        {/* post actions */}
        <View className="flex flex-row justify-between mt-4">
          <View className="flex flex-row items-center">
            <AntDesign name="hearto" size={14} color="black" />
            <Text className="pl-1 font-medium text-xs">2.5k Likes</Text>
          </View>

          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={openComment}
          >
            <EvilIcons name="comment" size={18} color="black" />
            <Text className="pl-1 font-medium text-xs">200 Comments</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center">
            <FontAwesome5 name="share-square" size={12} color="black" />
            <Text className="pl-1 font-medium text-xs">Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCom;
