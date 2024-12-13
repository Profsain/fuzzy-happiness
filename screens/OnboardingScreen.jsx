import {StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Onboarding from "react-native-onboarding-swiper";
import CustomButton from "../components/CustomButton";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const DotComponent = ({ selected }) => {
    return (
      <View
        className={`w-3 h-3 mx-1 flex items-center justify-center rounded-full ${
          selected ? "border border-orange-500" : ""
        }`}
      >
        <View
          className={`w-2 h-2 ${
            selected ? "bg-orange-500" : "bg-orange-100"
          } rounded-full`}
        ></View>
      </View>
    );
  };

  const Next = ({ isLight, ...props }) => (
    <TouchableOpacity
      className="bg-orange-200 mr-3 w-10 h-10 flex items-center justify-center rounded-full"
      {...props}
    >
      <View>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
  
  const handleGetStarted = () => { 
    navigation.replace("LoginScreen");
  };

  return (
    <Onboarding
      onSkip={() => navigation.replace("LoginScreen")}
      onDone={() => navigation.replace("LoginScreen")}
      showDone={false}
      DotComponent={DotComponent}
      NextButtonComponent={Next}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/splitbill.png")}
              className="w-38 h-35 object-contain"
            />
          ),
          title: "Bill - Splitting",
          subtitle:
            "Share expenses with friends effortlessly, divide payments and become a part of vibrant communities.",
        },

        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/socialnetwork1.png")}
              className="w-38 h-35 object-contain"
            />
          ),
          title: "Social Networking",
          subtitle:
            "Connect with other users, create and share events without financial complexities.",
        },

        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/membership1.png")}
              className="w-38 h-35 object-contain"
            />
          ),
          title: "Membership",
          subtitle: (
            <View className="p-4">
              <Text style={ styles.text }>
                Upgrade your subscription options to unlock all of our premium
                features for a better app experience.
              </Text>
              <CustomButton label="Get Started" buttonFunc={handleGetStarted}/>
            </View>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "sans-serif",
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
    color: "#333",
    paddingBottom: 20,
  },
});

export default OnboardingScreen;
