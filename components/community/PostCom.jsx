import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {useLogin} from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MemberProfieTop from "./MemberProfieTop";
import timeAgo from "../../utils/timeAgo";

const PostCom = ({ post }) => {
  // extract from useLogin context
  const { allUsers } = useLogin();
 
  const navigation = useNavigation();

  // handle open comment screen
  const openComment = () => {
    // navigate to comment screen
    navigation.navigate("AddComment");
  };

  // find user who created the post from allUsers
  const user = allUsers.find((user) => user._id === post.postCreator);
  const postedAgo = timeAgo(post.createdAt);
  console.log("postedAgo", postedAgo)
  console.log("user", user)

  return (
    <View className="px-6 py-4 border-b-2 border-gray-300">
      {/* publisher profile section */}
      <MemberProfieTop postedAgo={ postedAgo} postCreator={user} />

      {/* post content */}
      <View className="mt-4">
        <Text>
          {post.postText || "Life Sequence: A Journey Through Time and Experience Life is a remarkable sequence of events, an intricate tapestry woven with threads of moments, emotions, and growth."}
        </Text>
        {/* post image */}
        {post.postImage && (
          <Image
            source={{ uri: post.postImage }}
            className="h-52 w-full rounded-lg mt-4"
          />
        )}
        
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
