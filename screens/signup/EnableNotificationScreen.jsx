import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings } from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { Image, Alert, StyleSheet } from "react-native";
import useReceivedData from "../../hooks/useReceivedData";

const EnableNotificationScreen = ({ navigation }) => {
  // received data from previous screen
  const receivedData = useReceivedData();

  const handlePushNotification = () => {
    // send data to next screen
    const data = {
      ...receivedData,
      enableNotification: true,
    };
  
    // navigate to UserProfileScreen screen
    navigationToScreen(navigation, "UserProfileScreen", data);
  };

  const handleNotNow = () => {
    // send data to next screen
    const data = {
      ...receivedData,
      enableNotification: false,
    };

    // navigate to UserProfileScreen screen
    navigationToScreen(navigation, "UserProfileScreen", data);
  };

  return (
    <Box width="100%" justifyContent="center" p={24} pt={28}>
      <CustomHeadings title="Stay Connected" />

      {/* form section */}
      <VStack space="xl" mt={5}>
        <Text fontSize={14}>
          Receive instant in app notification updates on split bills, upcoming events, and
          community alerts. Stay connected with your groups and never miss a
          moment.
        </Text>

        <Image source={require("../../assets/stayconnected1.png")} />

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
