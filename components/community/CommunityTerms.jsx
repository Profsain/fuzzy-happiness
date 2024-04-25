import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";

const CommunityTerms = ({ navigation }) => {
  // handle go back
  const handleBack = () => {
    navigation.goBack();
  };

  // handle continue to create community
  const handleCreateCommunity = () => {
      // navigation.navigate("");
      navigation.navigate("CommunityPage");
      console.log("create community")
    // todo: create community in backend
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top section */}
      <View>
        <BackTopBar headline="Splinx Terms" func={handleBack} />
      </View>

      {/* terms text */}
      <ScrollView className="mt-3">
        <Text className="font-bold py-4">
          Ballers Corner Admin, you're in Control!
        </Text>

        <Text>
          As you embark on this exciting journey, here's a quick guide to
          kickstart your experience:
        </Text>

        <View className="pt-3">
          <Text className="font-bold">1. New Post Circle</Text>
          <Text className="pl-4">
            Use the "New Post Circle" (a circular frame with a plus icon) to
            share a warm welcome message, introduce yourself, or initiate a
            discussion. Click on the circle to create your first post and set
            the tone for your community.
          </Text>
        </View>
        <View className="py-1">
          <Text className="font-bold">2. Set Community Guildelines</Text>
          <Text className="pl-4">
            Your community already comes equipped with automated guidelines to
            ensure a positive and respectful environment. New members will
            automatically receive these guidelines upon joining.
          </Text>
        </View>
        <View className="py-1">
          <Text className="font-bold">3. Share & Invite</Text>
          <Text className="pl-4">
            To expand your community, use the "Share & Invite" feature. Click on
            "Share," and a pop-up will appear with options to share an invite
            link. Copy the link and share it with friends or fellow enthusiasts
            to grow your community network.
          </Text>
        </View>
        <View className="py-1">
          <Text className="font-bold">4. Explore Advance Setting</Text>
          <Text className="pl-4">
            Dive into advanced settings for enhanced community management.
            Customize moderation levels, privacy settings, and more. Click
            "Settings" to explore.
          </Text>
        </View>

        <Text className="font-bold">
          Ready to Lead Your Community? Let's Make Ballers Corner Unforgettable!
        </Text>

        {/* continue and create community */}
        <View className="my-6">
          <CustomButton
            buttonFunc={handleCreateCommunity}
            label="Agree & Continue"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityTerms;
