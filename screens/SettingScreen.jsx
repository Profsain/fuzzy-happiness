import { Image, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  ProfileHome,
  AccountSettings,
  AllNotificationScreen,
  Location,
  MembershipScreen,
  NotificationPreScreen,
  PersonalInfoScreen,
  ReportProblem,
  RestrictedAccount,
  ShareProfile,
} from "../components/profileSettings";

const SettingScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AllNotificationScreen"
        component={AllNotificationScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="MembershipScreen"
        component={MembershipScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="NotificationPreScreen"
        component={NotificationPreScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="RestrictedAccount"
        component={RestrictedAccount}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="ShareProfile"
        component={ShareProfile}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default SettingScreen;
