import React, { useEffect } from "react";
import { Linking } from "react-native";
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
  ChangePhoneNumber,
  VerifyNumber,
  ChangePassword,
  ChooseNotificationType,
  AllUsersList,
  SubscriptionScreen,
  PaymentScreen,
  PaymentSuccessScreen,
  LiveChatSupport,
  FaqScreen,
} from "../components/profileSettings";

const SettingScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url.includes("payment-success")) {
        navigation.navigate("PaymentSuccessScreen");
      }
    };

    Linking.addEventListener("url", handleDeepLink);

    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

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
      <Stack.Screen
        name="ChangePhoneNumber"
        component={ChangePhoneNumber}
        options={{ headerShown: false }}
        navigation={navigation}
      />

      <Stack.Screen
        name="VerifyNumber"
        component={VerifyNumber}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="ChooseNotificationType"
        component={ChooseNotificationType}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AllUsersList"
        component={AllUsersList}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="LiveChatSupport"
        component={LiveChatSupport}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default SettingScreen;
