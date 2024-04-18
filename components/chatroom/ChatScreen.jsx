import { View, Text, SafeAreaView } from "react-native";
import React, {useState} from "react";
import { BackTopBar } from "../home";

const ChatScreen = () => {
  // handle back to prev screen when device back button press

  // component state

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Chat" />
      </SafeAreaView>
    </>
  );
};


export default ChatScreen