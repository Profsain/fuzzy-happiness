import { View, Text, Image } from 'react-native'
import React from 'react'

const MemberProfieTop = ({postedAgo, postCreator}) => {
  return (
    <View className="flex flex-row items-center">
      {/* image avatar */}
      <Image
        source={{
          uri: postCreator.profileImg || "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740",
        }}
        className="h-12 w-12 mr-4 rounded-full"
      />
      <View>
        <Text className="text-xs font-medium mb-1">@{postCreator.firstName.toLowerCase() || "user" }</Text>
        <Text className="text-xs text-gray-500">{ postedAgo || "Just Now"}</Text>
      </View>
    </View>
  );
}

export default MemberProfieTop