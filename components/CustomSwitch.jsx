import React, { useState } from "react";
import { useLogin } from "../context/LoginProvider";
import { View, Text, Alert } from "react-native";
import { Switch } from "@gluestack-ui/themed";
import { primeryColor, secondaryColor } from "../utils/appstyle";

const CustomSwitch = ({ switchText, notification, setNotification }) => {
  // extract context
  const { userProfile, setUserProfile, token } = useLogin();

  // base url
  const baseUrl = process.env.BASE_URL;

  // handle notification update
  const sendUpdate = async (notificationName, notificationValue) => {
    const updateData = {
      [notificationName]: notificationValue,
    };

    Alert.alert("Notification", JSON.stringify(updateData));

    try {
      const response = await fetch(
        `${baseUrl}/user/update-user/${userProfile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Update local user profile state
        const updatedProfile = {
          ...userProfile,
          [notificationName]: notificationValue,
        };
        setUserProfile(updatedProfile);
        Alert.alert("Success", "Notification preference saved");
      } else {
        Alert.alert("Error 1", result.error || result.message);
      }
    } catch (error) {
      Alert.alert("Error catch", error.message);
    }
  };

  const handleNotification = async () => {
    const newNotificationValue = !notification;
    setNotification(newNotificationValue);

    let notificationName = "";
    if (switchText === "SMS notifications") {
      notificationName = "enableSmsNotification";
    } else if (switchText === "Push notifications") {
      notificationName = "enableNotification";
    } else if (switchText === "Email notifications") {
      notificationName = "enableEmailNotification";
    }

    await sendUpdate(notificationName, newNotificationValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{switchText || "Notifications"}</Text>
      {/* toggle switch button */}
      <Switch
        size="lg"
        value={notification}
        onValueChange={handleNotification}
        trackColor={{ false: "#767577", true: secondaryColor }}
        thumbColor={notification ? primeryColor : "#f4f3f4"}
      />
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
};

export default CustomSwitch;
