import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import { primeryColor } from "../../utils/appstyle";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const PersonalInfoScreen = ({ navigation }) => {

  // handle back button
  const handleBackBtn = () => {
    // navigate to ProfileHome
    navigation.navigate("ProfileHome");
  }
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Personal Details" icon2="" func={handleBackBtn} />

      {/* profile image */}
      <View className="my-8">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
          }}
          className="w-24 h-24 rounded-full "
        />
        <TouchableOpacity>
          <Text className="text-slate-500 mt-4 font-bold">
            Change Profile Picture
          </Text>
        </TouchableOpacity>
      </View>

      {/* profile details */}
      <View>
        <OptionButton
          btnText="Pascal 001"
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
          btnText="Change Email"
          iconLeft={
            <Fontisto 
              name="email" 
              size={24} 
              color={primeryColor}
              style={{ marginRight: 14 }} />
          }
        />
        <OptionButton
          btnText="Change Number"
          iconLeft={
            <FontAwesome name="mobile-phone" size={24}  color={primeryColor}
              style={{ marginRight: 14 }} />
          }
        />
        <OptionButton
          btnText="Change Password"
          iconLeft={
            <MaterialIcons name="password" size={24} color={primeryColor}
              style={{ marginRight: 14 }} />
            
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
