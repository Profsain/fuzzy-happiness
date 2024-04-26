import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Fab, FabIcon, } from "@gluestack-ui/themed";
import { EditIcon } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import TopComPageCard from "./TopComPageCard";
import PostCom from "./PostCom";
import {primeryColor} from "../../utils/appstyle";

const CommunityPage = () => {
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
        <Fab bg={primeryColor} size="lg">
          {/* EditIcon is imported from 'lucide-react-native' */}
          <FabIcon as={EditIcon} />
        </Fab>
      </View>
    </SafeAreaView>
  );
};

export default CommunityPage;
