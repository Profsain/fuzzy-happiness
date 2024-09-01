import { View, Text, Image } from 'react-native'
import React from 'react'

const MemberProfileCard = ({
  imgUrl,
  name="Yinka",
  amount="$300",
  status="Pending",
}) => {
  return (
    <View className="flex items-center">
      <Image
        source={{
          uri:
            imgUrl ||
            "https://img.freepik.com/free-photo/casual-young-african-man-smiling-isolated-white_93675-128895.jpg?t=st=1710454651~exp=1710458251~hmac=e4609fd0d10e712c7316f39a85ff61d98f62a803d3993a1d8f9b4bb5bf14bf20&w=740",
        }}
        className="h-20 w-20 mr-4 mb-2 rounded-full"
      />
      <Text className="font-medium pb-1">{name}</Text>
      <Text className="font-medium pb-1">{amount}</Text>
      <Text className="text-xs text-slate-500">{status}</Text>
    </View>
  );
};

export default MemberProfileCard