import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  BackHandler,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { useLogin } from "../../context/LoginProvider";
import { Fab, FabIcon } from "@gluestack-ui/themed";
import { EditIcon } from "lucide-react-native";
import TopComPageCard from "./TopComPageCard";
import PostCom from "./PostCom";
import { primeryColor } from "../../utils/appstyle";
import LoadingSpinner from "../LoadingSpinner";

const CommunityPage = ({ navigation, route }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { communityData, token } = useLogin();

  // extract community object from route params
  const { community, creatorUser, membersProfileImg } = route.params;
  const {
    communityName,
    communityDescription,
    communityMembers,
    coverImage,
    posts,
    _id,
  } = community;

  // fetch all posts of community
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/post/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // Sort posts by createdAt field
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommunityPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Fetch all posts when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAllPosts();
    }, [])
  );

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
    navigation.navigate("CreatePost", { communityId: _id });
  };

  // render post component
  const renderPost = ({ item }) => {
    return <PostCom post={item} />;
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
        noOfPosts={communityPosts.length}
      />

      {/* posts */}
      {loading && <LoadingSpinner />}

      {/* if post is empty */}
      {communityPosts.length === 0 && !loading && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No posts available</Text>
        </View>
      )}

      {/* use FlatList to render Posts */}
      <FlatList
        data={communityPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id.toString()}
        vertical={true}
      />

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
