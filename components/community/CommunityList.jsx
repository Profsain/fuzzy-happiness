import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { BackTopBar } from "../home";

const CommunityList = () => {
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
          {/* top section */}
          <View>
              <BackTopBar />
          </View>
      <Text>CommunityList</Text>
    </SafeAreaView>
  );
};

export default CommunityList;
