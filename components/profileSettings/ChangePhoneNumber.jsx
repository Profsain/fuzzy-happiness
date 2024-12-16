import React, { useState, useRef } from "react";
// import "firebase/compat/auth";
import axios from "axios";
import { useLogin } from "../../context/LoginProvider";
import { setItem } from "../../utils/asyncStorage";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../../components";
// import PhoneInput from "react-native-phone-number-input";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { View, TouchableOpacity, Alert } from "react-native";
import { BackTopBar } from "../../components/home";
import sendPushNotification from "../../utils/sendPushNotification";

const ChangePhoneNumber = ({ navigation }) => {
  // extract context
  const { userProfile, token } = useLogin();

  // base url
  const baseUrl = process.env.BASE_URL;

  const [isValid, setIsValid] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneInput = useRef(null);

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

    // send otp to email
    // use html template for email
    const message = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #f9784b;">OTP Verification Code</h1>

    <p>Dear ${userProfile.firstName},</p>
    <p>You requested to change your phone number.</p>
    <p>Your OTP is <span style="font-weight: bold; color: #000;">${otp}</span></p>
    <p>Use this code to verify your phone number. Thank you.</p>
    <p style="color: #666; font-size: 12px;">If you did not request this change, please contact our support team immediately.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #666;">Best regards,<br>SplinX Planet</p>
  </div>
`;

    const emailAddress = userProfile.emailAddress;

    const data = {
      email: emailAddress,
      subject: "SplinX Planet OTP",
      html: message,
    };

    
    try {
      const response = await fetch(`${baseUrl}/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // send otp to phone
        sendPushNotification(userProfile._id, "Splinx Planet", `Your OTP is ${otp}. Use this code to verify your phone number. Thank you.`);
        
        setLoading(false);
        navigationToScreen(navigation, "VerifyNumber", {
          phoneNumber,
        });
      } else {
        setLoading(false);
        Alert.alert("error", result.message);
      }
    } catch (error) {
      Alert.alert("error", error);
    }
  };

  const handleGetToken = () => {
    if (isValid) {
      sendVerificationCode(formattedValue);
    }
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <View className="my-8">
        <BackTopBar
          func={() => navigation.goBack()}
          headline="Change Phone Number"
        />
      </View>

      <VStack space="xl" mt={15}>
        <Text fontSize={16}>Enter new mobile number to get a OTP.</Text>

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
              label="Get OTP Code"
              backgroundColor={secondaryColor}
              color="#000"
              buttonFunc={null}
            />
          ) : (
            <Box>
              {!loading ? (
                <CustomButton
                  label="Get OTP Code"
                  buttonFunc={handleGetToken}
                />
              ) : (
                <LoadingSpinner />
              )}
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ChangePhoneNumber;
