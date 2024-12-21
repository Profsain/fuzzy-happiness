import React, { useState, useRef } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../components";
// import PhoneInput from "react-native-phone-number-input";
import { registerIndieID } from "native-notify";
import sendPushNotification from "../utils/sendPushNotification";
import { setItem } from "../utils/asyncStorage";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";
import { TouchableOpacity, Alert } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneInput = useRef(null);

  // native notify token
  const notifyToken = process.env.NATIVE_NOTIFY_TOKEN;

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

  const sendVerificationCode = async (phoneNumber) => {
    setLoading(true);

    // generate 6 digit random number as otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    // store otp to local storage
    await setItem("otp", otp);

    // data
    const data = {
      phone: formattedValue,
    };

    try {
      await registerIndieID(`${phoneNumber}`, 22245, notifyToken);

      // send otp to phone
      sendPushNotification(
        phoneNumber,
        "Splinx Planet",
        `Your OTP is ${otp}. Use this code to verify your phone number. Thank you.`
      );

      navigationToScreen(navigation, "TokenScreen", data);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }
  };

  const handleGetToken = () => {
    // Ensure formattedValue starts with '+' and is in E.164 format
    if (formattedValue.startsWith("+")) {
      sendVerificationCode(formattedValue);
    } else {
      Alert.alert("Error", "Invalid phone number format.");
    }
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Phone Number" />

      <VStack space="xl" mt={15}>
        <Text fontSize={16}>Enter your mobile number to get a token.</Text>

        {/* <Box width="100%">
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneValue}
            defaultCode="NG"
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
        </Box> */}

        <Box mt={160}>
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
        </Box>

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
