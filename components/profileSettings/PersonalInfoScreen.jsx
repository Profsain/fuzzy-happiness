import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import { primeryColor } from "../../utils/appstyle";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import handlePhoto from "../../utils/uploadImage";
import LoadingSpinner from "../LoadingSpinner";

const PersonalInfoScreen = ({ navigation }) => {
  const [newProfileImg, setNewProfileImg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // extract context
  const { userProfile, setUserProfile, token } = useLogin();

  // base url
  const baseUrl = process.env.BASE_URL;

  // handle back button
  const handleBackBtn = () => {
    // navigate to ProfileHome
    navigation.navigate("ProfileHome");
  };

  // handle change profile picture
 const handleChangeProfilePic = async () => {
  try {
    setIsProcessing(true);

    // handle photo
    const newProfileImg = await handlePhoto();
    setNewProfileImg(newProfileImg);

    // update profile image in database
    const updateData = {
      profileImg: newProfileImg,
    };

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

    const data = await response.json();

    if (response.ok) {
      // Update local user profile state
      const updatedProfile = { ...userProfile, profileImg: newProfileImg };
      setUserProfile(updatedProfile);

      setIsProcessing(false);
      Alert.alert("Success", data.message);
    } else {
      setIsProcessing(false);
      Alert.alert("Response Error", data.message);
    }
  } catch (error) {
    Alert.alert("Error during profile picture update", error.message);
    setIsProcessing(false);
    alert(error.message);
  }
};


  // handle change email
  const handleChangeEmail = () => {
    // navigate to ChangeEmail
    console.log("Change Email");
  };

  // handle change number
  const handleChangeNumber = () => {
    // navigate to ChangeNumber
    navigation.navigate("ChangePhoneNumber");
  };

  // handle change password
  const handleChangePassword = () => {
    // navigate to ChangePassword
    navigation.navigate("ChangePassword");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Personal Details" icon2="" func={handleBackBtn} />

      {/* profile image */}
      <View className="my-8">
        <Image
          source={{
            uri:
              userProfile.profileImg ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
          }}
          className="w-24 h-24 rounded-full "
        />

        {/* show loading spinner */}
        {/* change profile picture btn */}
        {isProcessing ? (
          <LoadingSpinner />
        ) : (
          <TouchableOpacity onPress={handleChangeProfilePic}>
            <Text className="text-slate-500 mt-4 font-bold">
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* profile details */}
      <View>
        <OptionButton
          btnText={
            userProfile.firstName
              ? userProfile.firstName + " " + userProfile.lastName
              : "username"
          }
          iconLeft={
            <AntDesign
              name="user"
              size={24}
              color={primeryColor}
              style={{ marginRight: 14 }}
            />
          }
        />
        <OptionButton
          btnFunc={handleChangeEmail}
          btnText={
            userProfile.emailAddress
              ? userProfile.emailAddress.slice(0, 20)
              : " user email "
          }
          iconLeft={
            <Fontisto
              name="email"
              size={24}
              color={primeryColor}
              style={{ marginRight: 14 }}
            />
          }
        />
        <OptionButton
          btnFunc={handleChangeNumber}
          btnText="Change Phone Number"
          iconLeft={
            <FontAwesome
              name="mobile-phone"
              size={24}
              color={primeryColor}
              style={{ marginRight: 14 }}
            />
          }
        />
        <OptionButton
          btnFunc={handleChangePassword}
          btnText="Change Password"
          iconLeft={
            <MaterialIcons
              name="password"
              size={24}
              color={primeryColor}
              style={{ marginRight: 14 }}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
