import { View, SafeAreaView, Alert } from "react-native";
import React from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProfileHome = ({ navigation }) => {
  // extract context
  const { setIsLogin, setUserProfile } = useLogin();

  // handle personal info
  const handlePersonalInfo = () => {
    // navigate to PersonalInfoScreen
    navigation.navigate("PersonalInfoScreen");
  };
  // handle membership
  const handleMembership = () => {
    // navigate to MembershipScreen
    navigation.navigate("MembershipScreen");
  };
  // handle notification
  const handleNotification = () => {
    // navigate to NotificationPreScreen
    navigation.navigate("NotificationPreScreen");
  };
  // handle account
  const handleAccount = () => {
    // navigate to AccountSettings
    navigation.navigate("AccountSettings");
  };
  // handle log out
  const handleLogout = () => {
    // clear login context
    setIsLogin(false);
    setUserProfile({});
    // navigate to login screen
    navigation.navigate("LoginUser");
  };

  // handle faq
  const handleFaq = () => {
    navigation.navigate("FaqScreen");
  };

  // handle live chat
  const handleLiveChat = () => {
    navigation.navigate("LiveChatSupport");
  };

  // handle open notification screen
  const handleReadNotification = () => {
    navigation.navigate("PushNotification");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View>
        <BackTopBar headline="Profile" icon2="" icon="" />
      </View>

      {/* option list */}
      <View className="mt-6">
        <OptionButton
          btnText="Personal Information"
          iconLeft=""
          btnFunc={handlePersonalInfo}
        />
        <OptionButton
          btnText="Membership"
          iconLeft=""
          btnFunc={handleMembership}
        />
        <OptionButton
          btnText="Notifications Preferences"
          iconLeft=""
          btnFunc={handleNotification}
        />
        <OptionButton
          btnText="Account Settings"
          iconLeft=""
          btnFunc={handleAccount}
        />
        <OptionButton
          btnText="My Notifications"
          iconLeft=""
          btnFunc={handleReadNotification}
        />

        <OptionButton
          btnText="FAQ"
          iconLeft=""
          iconRight={
            <AntDesign name="questioncircleo" size={18} color="black" />
          }
          btnFunc={handleFaq}
        />

        <OptionButton
          btnText="Live Chat Support"
          iconLeft=""
          iconRight={
            <AntDesign name="customerservice" size={18} color="black" />
          }
          btnFunc={handleLiveChat}
        />

        <OptionButton
          btnText="Log out"
          iconLeft=""
          iconRight={<AntDesign name="logout" size={18} color="black" />}
          btnFunc={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileHome;
