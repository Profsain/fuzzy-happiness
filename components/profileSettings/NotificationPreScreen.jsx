import React, { useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import { View, Text, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";
import { Switch } from "@gluestack-ui/themed";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import CustomSwitch from "../CustomSwitch";

const NotificationPreScreen = ({ navigation }) => {
  // extract context
  const { userProfile, token } = useLogin();

  // base url
  const baseUrl = process.env.BASE_URL;

  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // fetch current notification settings and set them to the state
  const { enableSmsNotification, enableNotification, enableEmailNotification } = userProfile;

  // notification state
  const [smsNotification, setSmsNotification] = useState(enableSmsNotification);
  const [pushNotification, setPushNotification] = useState(enableNotification);
  const [emailNotification, setEmailNotification] = useState(enableEmailNotification);

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
          switchText="Email notifications"
          notification={emailNotification}
          setNotification={setEmailNotification}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationPreScreen;
