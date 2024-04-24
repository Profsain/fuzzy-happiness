import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatScreen from "../components/chatroom/ChatScreen";
import ChatList from "../components/chatroom/ChatList";
import UserFriendsScreen from "../components/chatroom/UserFriendsScreen";

const Stack = createNativeStackNavigator();

const ChatComScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="UserFriendsScreen"
        component={UserFriendsScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default ChatComScreen;
