import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const PostCom = () => {
  return (
    <View className="px-6 py-4 border-b-2 border-gray-300">
      {/* profile section */}
      <View className="flex flex-row items-center">
        {/* image avatar */}
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740",
          }}
          className="h-12 w-12 mr-4 rounded-full"
        />
        <View>
          <Text className="text-xs font-medium mb-1">@temmy23</Text>
          <Text className="text-xs text-gray-500">13 hours ago</Text>
        </View>
      </View>

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
            <AntDesign name="hearto" size={18} color="black" />
            <Text className="pl-1 font-medium">2.5k Likes</Text>
          </View>
          <View className="flex flex-row items-center">
            <EvilIcons name="comment" size={24} color="black" />
            <Text className="pl-1 font-medium">Comments</Text>
          </View>
          <View className="flex flex-row items-center">
            <FontAwesome5 name="share-square" size={24} color="black" />
            <Text className="pl-1 font-medium">Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCom;
