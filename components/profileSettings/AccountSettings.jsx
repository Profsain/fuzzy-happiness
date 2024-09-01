import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert, Switch } from "react-native";
import * as Location from "expo-location";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import { useLogin } from "../../context/LoginProvider";
import handleSocialShare from "../../utils/socialSharefunc";
import { primeryColor, secondaryColor } from "../../utils/appstyle";

const AccountSettings = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile } = useLogin();

  // State for managing location access
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  // handle open screen
  const handleOpenScreen = (screenName) => {
    // navigate to screen
    navigation.navigate(screenName);
  };

  // handle share user profile
  const handleShareUserProfile = () => {
    // Prepare profile data
    const { firstName, lastName, phoneNumber } = userProfile;
    const profileLink = `${baseUrl}/user/profile/${userProfile._id}`;

    // Call to action message
    const message = `Check out ${firstName} ${lastName}'s profile on our Splinx app! Contact them at ${phoneNumber} or view their profile here: ${profileLink}.\n\nJoin our app and connect with amazing people like ${firstName}!`;

    // Use handleSocialShare to share the profile
    handleSocialShare(message);
  };

  // handle turn user location on/off
  const toggleLocation = async () => {
    if (!isLocationEnabled) {
      // Turn on location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setIsLocationEnabled(true);
      Alert.alert("Location enabled");
    } else {
      // Turn off location
      setIsLocationEnabled(false);
      Alert.alert("Location disabled");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Settings & Privacy" icon2="" func={handleBackBtn} />

      <View className="mt-14 flex">
        <OptionButton
          btnText="Restricted Accounts"
          iconLeft=""
          btnFunc={() => handleOpenScreen("RestrictedAccount")}
        />
        <OptionButton
          btnText="Share Profile"
          iconLeft=""
          btnFunc={handleShareUserProfile}
        />
        <View className="flex flex-row justify-between items-center border px-4 rounded-xl border-slate-200 my-3">
          <Text>Location</Text>
          <Switch
            value={isLocationEnabled}
            onValueChange={toggleLocation}
            trackColor={{ false: "#767577", true: secondaryColor }}
            thumbColor={isLocationEnabled ? primeryColor : "#f4f3f4"}
          />
        </View>
        <OptionButton
          btnText="Report a Problem"
          iconLeft=""
          btnFunc={() => handleOpenScreen("ReportProblem")}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;
