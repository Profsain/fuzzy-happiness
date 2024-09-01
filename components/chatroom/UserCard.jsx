import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import truncateText from "../../utils/truncateText";

const UserCard = ({
  profileImage,
  userName,
  lastMessage,
  messageCount,
  lastMessageTime,
  func,
}) => {
  return (
    <TouchableOpacity onPress={func}>
      <View className="flex flex-row items-start justify-between py-2 px-4 mb-3 border border-gray-200 rounded-xl">
        <View className="flex flex-row items-center">
          <Image
            className="w-12 h-12 rounded-full"
            source={{
              uri:
                profileImage ||
                "https://img.freepik.com/free-photo/cheerful-african-guy-with-narrow-dark-eyes-fluffy-hair-dressed-elegant-white-shirt_273609-14082.jpg?t=st=1712129088~exp=1712132688~hmac=229241758bf19bbe437fddc423774fede5320a636cbeb9cb61a15b0f7cbfffc1&w=826",
            }}
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold">{userName || "User"}</Text>
            <Text className="text-sm text-gray-500">
              {truncateText(lastMessage, 20) || "Hello, how are you?"}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-sm text-gray-500">
            {lastMessageTime || ""}
          </Text>
          {/* chat count */}
          <View className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center ml-2">
            <Text className="text-white text-xs">{messageCount || "0"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
