import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import AvatarStack from "../splitBills/component/AvatarStack";
import formatDate from "../../utils/formatDate";

const defaultImg =
  "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740";

const CommunityCard = ({ community }) => {
  // extract context users
  const { allUsers } = useLogin();

  const navigation = useNavigation();
  const {
    communityName,
    communityMembers,
    createdAt,
    communityCreator,
    coverImage,
  } = community;

  // find user who created the community
  const creatorUser = allUsers.find((user) => user._id === communityCreator);

  // find the profileImg in allUsers of user who is a member of community
  const membersProfileImg = communityMembers.map((member) => {
  const user = allUsers.find((user) => user._id === member);
  if (!user) return { id: member, url: defaultImg };
  return { id: member, url: user.profileImg };
});


  // handle open community page
  const openCommunityPage = () => {
    // navigate to community page
    navigation.navigate("CommunityPage", { community, creatorUser, membersProfileImg });
  };

  return (
    <TouchableOpacity
      onPress={openCommunityPage}
      className="flex flex-row justify-between content-center mt-4 border py-2 px-4 rounded-lg border-slate-300"
    >
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
          <Text className="text-xs font-medium mb-1">
            {communityName.slice(0, 15) || "Good Name"}
          </Text>
          <Text className="text-xs text-gray-500">
            {communityMembers.length || "0"} Members
          </Text>
          <AvatarStack images={membersProfileImg} />
        </View>
      </View>

      <View className="flex flex-column items-end">
        <Text className="text-xs font-medium mb-1">
          {formatDate(createdAt) || "12/09/2022"}
        </Text>
        <Text className="text-xs text-gray-500">
          Created by: {creatorUser?.firstName || "John"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityCard;
