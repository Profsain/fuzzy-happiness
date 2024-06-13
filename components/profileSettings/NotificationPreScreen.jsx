import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";
import { Switch } from "@gluestack-ui/themed";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import CustomSwitch from "../CustomSwitch";

const NotificationPreScreen = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // fetch current notification settings and set them to the state

  // notification state
  const [smsNotification, setSmsNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar
        headline="Choose Notification Type"
        icon2=""
        func={handleBackBtn}
      />

      <View className="mt-14 flex">
        <CustomSwitch
          switchText="SMS notifications"
          notification={smsNotification}
          setNotification={setSmsNotification}
        />

        <CustomSwitch
          switchText="Push notifications"
          notification={pushNotification}
          setNotification={setPushNotification}
        />

        <CustomSwitch
          switchText="Emain notifications"
          notification={emailNotification}
          setNotification={setEmailNotification}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationPreScreen;
