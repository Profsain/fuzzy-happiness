import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomHeadings,
} from "../../components";

import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { Image, Alert, StyleSheet } from "react-native";

const EnableNotificationScreen = ({ navigation }) => {
  const handlePushNotification = () => {
    // persist data in local storage
    Alert.alert("Push Notification Enabled");

    // navigate to UserProfileScreen screen
    navigationToScreen(navigation, "UserProfileScreen");
  };

  const handleNotNow = () => {

    // navigate to UserProfileScreen screen
    navigationToScreen(navigation, "UserProfileScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24} pt={28}>
      <CustomHeadings title="Stay Connected" />

      {/* form section */}
      <VStack space="xl" mt={5}>
        <Text fontSize={14}>
          Receive instant updates on split notifications, upcoming events, and
          community alerts. Stay connected with your groups and never miss a
          moment.
        </Text>

          <Image source={require("../../assets/stayconnected1.png")}/>

        {/* action button */}
        <Box mt={40}>
          <CustomButton
            label="Enable push notifications"
            buttonFunc={handlePushNotification}
          />
          <CustomButton
            label="Not now"
            backgroundColor={secondaryColor}
            color="#000"
            buttonFunc={handleNotNow}
          />
        </Box>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default EnableNotificationScreen;
