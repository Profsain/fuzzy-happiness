import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import React from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProfileHome = ({ navigation }) => {
  // base url
  const baseUrl = process.env.BASE_URL;
  // extract context
  const { setIsLogin, setUserProfile, userProfile, token } = useLogin();

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

  // handle delete account
  const deleteAcc = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/delete-user/${userProfile._id}`);

      if (response.ok) {
        // After deletion, navigate to the login screen
        handleLogout();
      }
    } catch (error) {
      Alert.alert("Delete Error", error)
    }
  }
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call the delete user account endpoint
              await deleteAcc();

              // navigation.navigate("Login"); // Assuming you have navigation setup
            } catch (error) {
              Alert.alert("Delete Error", error.message);
            }
          },
        },
      ]
    );
  };


  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View>
        <BackTopBar headline="Profile" icon2="" icon="" />
      </View>

      {/* option list */}
      <ScrollView className="mt-6">
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

        {/* delete account */}
        <OptionButton
          btnText="Delete Account"
          iconLeft=""
          iconRight={<AntDesign name="delete" size={18} color="red" />}
          btnFunc={handleDeleteAccount}
        />

        <OptionButton
          btnText="Log out"
          iconLeft=""
          iconRight={<AntDesign name="logout" size={18} color="black" />}
          btnFunc={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileHome;
