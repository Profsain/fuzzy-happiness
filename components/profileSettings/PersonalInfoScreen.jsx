import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import { primeryColor } from "../../utils/appstyle";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import handlePhoto from "../../utils/uploadImage";

const PersonalInfoScreen = ({ navigation }) => {
  const [newProfileImg, setNewProfileImg] = useState("");

  // extract context
  const { userProfile, setUserProfile } = useLogin();

  // handle back button
  const handleBackBtn = () => {
    // navigate to ProfileHome
    navigation.navigate("ProfileHome");
  }

  // handle change profile picture
  const handleChangeProfilePic = async () => {
    console.log("Change Profile Picture");
    const newProfileImg = await handlePhoto();
    setNewProfileImg(newProfileImg);

    // update profile image
    const updatedProfile = { ...userProfile, profileImg: newProfileImg };
    setUserProfile(updatedProfile);
    // update profile image in database
    const response = await fetch(
      "https://api.example.com/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      }
    );
    const data = await response.json();
    console.log(data);


  }

  // handle change email
  const handleChangeEmail = () => {
    // navigate to ChangeEmail
    console.log("Change Email");
  }

  // handle change number
  const handleChangeNumber = () => {
    // navigate to ChangeNumber
    navigation.navigate("ChangePhoneNumber");
  }

  // handle change password
  const handleChangePassword = () => {
    // navigate to ChangePassword
    navigation.navigate("ChangePassword");
  }


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
        <TouchableOpacity onPress={handleChangeProfilePic}>
          <Text className="text-slate-500 mt-4 font-bold">
            Change Profile Picture
          </Text>
        </TouchableOpacity>
      </View>

      {/* profile details */}
      <View>
        <OptionButton
          btnText={userProfile.firstName ?  userProfile.firstName + " " + userProfile.lastName : "username"}
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
          btnText={userProfile.emailAddress ?  userProfile.emailAddress.slice(0, 20) : " user email "}
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
