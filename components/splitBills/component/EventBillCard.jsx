import { View, Text, Image } from "react-native";
import React from "react";

const EventBillCard = () => {
  return (
    <View className="flex flex-row justify-between content-center mt-4 border py-2 px-4 rounded-lg border-slate-300">
      <View className="flex flex-row">
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740",
          }}
          className="h-12 w-12 mr-4 rounded-full"
        />
        <View>
          <Text className="text-xs font-medium mb-1">House Party</Text>
          <Text className="text-xs text-gray-500">12/05/2024</Text>
        </View>
      </View>
      <View>
        <Text className="text-xs font-medium mb-1">$500.00</Text>
        <Text className="text-xs text-gray-500">Pending</Text>
      </View>
    </View>
  );
};

export default EventBillCard;
