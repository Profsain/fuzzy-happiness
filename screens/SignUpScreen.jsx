import React, { useState, useRef } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../components";
import PhoneInput from "react-native-phone-number-input";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";
import { TouchableOpacity, Alert, View } from "react-native";

import { sendSmsVerification } from "../utils/twillioApi";

const SignUpScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneInput = useRef(null);

  // textflow api key
  const textflowKey = process.env.TEXTFLOW_API_KEY;
  const textflowUrl = "https://textflow.me/api/send-code";

  // handle back button
  const handleBackBtn = () => {
    navigationToScreen(navigation, "LoginScreen");
  };

  // const handleSubmit = async () => {
  //   setError("");
  //   setLoading(true);

  //   try {
  //     // send otp to phone
  //     sendPushNotification(
  //       formattedValue,
  //       "Splinx Planet",
  //       `Your OTP is ${otp}. Use this code to verify your phone number. Thank you.`
  //     );

  //     // navigate to OTP screen
  //     navigationToScreen(navigation, "OTPScreen", { phoneNumber: formattedValue });
  //   } catch (error) {
  //     setError("Failed to send OTP. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handlePhoneChange = (phoneNumber) => {
  //   setFormattedValue(phoneNumber);
  //   handleChangeValue(phoneNumber);
  // };

  const handleChangeValue = (text) => {
    setPhoneValue(text);

    if (text.length === 0) {
      setError("Phone Number is required");
      setIsValid(false);
    } else if (text.length < 10) {
      setError("Phone Number must be 10 digits");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  };

  const sendVerificationCode = async () => {
    setLoading(true);
    // data
    const data = {
      phoneNumber: formattedValue,
    };

    // check if user with this phone number already exists
    try {
      const response = await fetch(`${process.env.BASE_URL}/auth/check-phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const checkData = await response.json();

      if (checkData.exists) {
        setError(checkData.message);
        setLoading(false);
        return;
      }
      // send verification code

      sendSmsVerification(formattedValue).then((sent) => {

        if (sent.success) {
          // navigate to OTP screen
          navigationToScreen(navigation, "TokenScreen", data);
          setLoading(false);
        
        } else {
          Alert.alert("Error", sent.error);
          setLoading(false);
        }
      });

    } catch (error) {
      console.log(error);
      Alert.alert("Network Error", "Please check your internet connection and try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }

  };

  const handleGetToken = () => {
    // Ensure formattedValue starts with '+' and is in E.164 format
    if (formattedValue.startsWith("+")) {
      sendVerificationCode();
    } else {
      Alert.alert("Error", "Invalid phone number format.");
    }
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Phone Number" />

      <VStack space="xl" mt={15}>
        <Text fontSize={16}>Enter your mobile number to get a token.</Text>

        <Box width="100%">
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneValue}
            defaultCode="GB"
            layout="first"
            onChangeText={handleChangeValue}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
          />
          {error && (
            <Text size="sm" style={{ color: "#ea9977" }}>
              {error}
            </Text>
          )}
        </Box>

        <View className="flex items-center justify-center mt-24 w-full">
          {!isValid ? (
            <CustomButton
              label="Get Token"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <Box>
              {!loading ? (
                <CustomButton label="Get Token" buttonFunc={handleGetToken} />
              ) : (
                <LoadingSpinner />
              )}
            </Box>
          )}
        </View>

        <Box mt={160}>
          <TouchableOpacity
            onPress={() => navigationToScreen(navigation, "LoginUser")}
          >
            <Text
              size="sm"
              style={{ color: "#000", textAlign: "center", marginTop: 6 }}
            >
              Already have an account?{" "}
              <Text
                size="sm"
                style={{ color: "#000", textAlign: "center", marginTop: 6 }}
                onPress={() => navigationToScreen(navigation, "LoginUser")}
              >
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </Box>
  );
};

export default SignUpScreen;
