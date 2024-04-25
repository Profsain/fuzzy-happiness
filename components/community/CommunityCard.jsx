import { View, Text, Image } from "react-native";
import React from "react";
import AvatarStack from "../splitBills/component/AvatarStack";

const CommunityCard = ({ community }) => {
    const { communityName, members, createdAt, createdBy, coverImage } = community;
  return (
    <View className="flex flex-row justify-between content-center mt-4 border py-2 px-4 rounded-lg border-slate-300">
      <View className="flex flex-row">
        <Image
          source={{
            uri:
              coverImage ||
              "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740",
          }}
          className="h-12 w-12 mr-4 rounded-full"
        />
        <View>
                  <Text className="text-xs font-medium mb-1">{ communityName || "Good Name" }</Text>
          <Text className="text-xs text-gray-500">{members || "0"} Members</Text>
          <AvatarStack />
        </View>
      </View>
      <View>
              <Text className="text-xs font-medium mb-1">{ createdAt || "12/09/yyyy"}</Text>
              <Text className="text-xs text-gray-500">{ createdBy || "John"}</Text>
      </View>
    </View>
  );
};

export default CommunityCard;
