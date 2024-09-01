import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CommunityList, CommunityPage, CommunityTerms, CreateCommunity, CreatePost, QuickNote, AddComment } from "../components/community";

const CommunityScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityList"
        component={CommunityList}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="CommunityPage"
        component={CommunityPage}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AddComment"
        component={AddComment}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="CommunityTerms"
        component={CommunityTerms}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="CreateCommunity"
        component={CreateCommunity}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="QuickNote"
        component={QuickNote}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default CommunityScreen;
