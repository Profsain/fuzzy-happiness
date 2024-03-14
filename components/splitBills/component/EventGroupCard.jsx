import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AvatarStack from "./AvatarStack";
import { primeryColor } from "../../../utils/appstyle";

const EventGroupCard = ({ eventName = "Karaoke", func }) => {
    return (
      <TouchableOpacity onPress={func}>
        <View className="bg-gray-100 rounded-lg mb-4">
          <View
            className="flex flex-row content-center justify-between items-center py-2 px-4 rounded-t-lg"
            style={{ backgroundColor: primeryColor }}
          >
            <Text className="text-white font-medium text-base">
              {eventName}
            </Text>
            <Text className="text-white font-normal text-xs">14/11/2024</Text>
          </View>

          <View className="p-5">
            <View className="flex flex-row content-center items-center ">
              <Text className="font-normal pr-12">Bill Total</Text>
              <Text className="font-semibold text-base">$2100</Text>
            </View>
            <View className="flex flex-row content-center items-center ">
              <Text className="font-normal pr-8">Amount Due</Text>
              <Text className="font-semibold text-base">$300</Text>
            </View>
            <View className="flex flex-row content-center items-center mt-3">
              <Text className="font-normal pr-8">Location</Text>
              <Text className="font-xm">Plot 37, Kingsway Yaba</Text>
            </View>

            <View className="flex flex-row justify-end mt-4">
              <AvatarStack hw={28} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
};

export default EventGroupCard;
