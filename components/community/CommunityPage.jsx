import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";

import React, { useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { Fab, FabIcon } from "@gluestack-ui/themed";
import { EditIcon } from "lucide-react-native";
import TopComPageCard from "./TopComPageCard";
import PostCom from "./PostCom";
import { primeryColor } from "../../utils/appstyle";

const CommunityPage = ({ navigation, route }) => {
  // extract from useLogin context
  const { communityData } = useLogin();
  console.log("community object", communityData);

  // extract community object from route params
  const { community, creatorUser, membersProfileImg } = route.params;
  const { communityName, communityDescription, communityMembers, coverImage, posts } =
    community;
  console.log("community context", community);

  // handle device back button
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("CommunityList");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // handle open create post
  const openCreatePost = () => {
    // navigate to create new post screen
    navigation.navigate("CreatePost");
  };

  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      {/* top card */}
      <TopComPageCard
        communityName={communityName}
        communityDescription={communityDescription}
        communityMembers={communityMembers}
        coverImage={coverImage}
        createdBy={creatorUser}
        images={membersProfileImg}
        noOfPosts={posts.length}
      />

      {/* posts */}
      <ScrollView>
        <PostCom />
        <PostCom />
        <PostCom />
      </ScrollView>

      {/* fab button */}
      <View>
        <Fab bg={primeryColor} size="lg" onPress={openCreatePost}>
          {/* EditIcon is imported from 'lucide-react-native' */}
          <FabIcon as={EditIcon} />
        </Fab>
      </View>
    </SafeAreaView>
  );
};

export default CommunityPage;
