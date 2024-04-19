import { View, Text, SafeAreaView } from "react-native";
import React, {useState} from "react";
import { BackTopBar } from "../home";

const ChatScreen = ({ navigation, route }) => {
  // get passed user data
  const user = route.params?.user || null;

  console.log("user in room", user);
  // handle back to prev screen when device back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // component state

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Chat Room" func={handleBackPress} />

        {/* chat screen */}
        <View className="flex-1">
          <Text>Chat screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
};


export default ChatScreen