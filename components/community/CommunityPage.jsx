import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Fab, FabIcon, } from "@gluestack-ui/themed";
import { EditIcon } from "lucide-react-native";
import TopComPageCard from "./TopComPageCard";
import PostCom from "./PostCom";
import {primeryColor} from "../../utils/appstyle";

const CommunityPage = ({navigation}) => {
  // handle open create post 
  const openCreatePost = () => {
    // navigate to create new post screen
    navigation.navigate("CreatePost");
  }
  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      {/* top card */}
      <TopComPageCard />

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
