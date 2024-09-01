import React from "react";
import { SafeAreaView, View } from "react-native";
import { WebView } from "react-native-webview";
import BackTopBar from "../home/BackTopBar";

const LiveChatSupport = ({ navigation }) => {
  // handle back to prev screen
  const handleBack = () => {
    navigation.goBack();
  };

  const liveChatLink =
    "https://tawk.to/chat/66ba3edf146b7af4a4397639/1i53ob6i5";


  return (
    <SafeAreaView className="flex-1 px-6 pt-16 bg-white">
      <View className="pb-8">
        <BackTopBar headline="Live Chat Support" icon2="" func={handleBack} />
      </View>
      <WebView
        source={{ uri: liveChatLink }}
      />
    </SafeAreaView>
  );
};

export default LiveChatSupport;
