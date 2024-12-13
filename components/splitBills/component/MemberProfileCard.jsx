import { View, Text, Image } from "react-native";
import React from "react";
import {primeryColor} from "../../../utils/appstyle";

const MemberProfileCard = ({
  imgUrl,
  name = "Unknown",
  amount = "0.00",
  currency = "$",
  status = "Pending",
}) => {
  return (
    <View className="flex flex-col items-center justify-center border border-slate-200 rounded-xl p-3">
      <Image
        source={{
          uri:
            imgUrl ||
            "https://img.freepik.com/free-photo/casual-young-african-man-smiling-isolated-white_93675-128895.jpg?t=st=1710454651~exp=1710458251~hmac=e4609fd0d10e712c7316f39a85ff61d98f62a803d3993a1d8f9b4bb5bf14bf20&w=740",
        }}
        className="h-16 w-16 mr-4 mb-2 rounded-full object-cover"
      />
      <Text className="font-medium pb-1">{name}</Text>
      <Text className="font-medium pb-1">
        {currency}
        {amount}
      </Text>
      <Text className="text-xs" style={{ color: primeryColor }}>
        {status}
      </Text>
    </View>
  );
};

export default MemberProfileCard;
