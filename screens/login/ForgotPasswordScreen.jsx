import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Alert, ScrollView } from "react-native";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  // PasswordInput,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { TouchableOpacity } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import { setItem } from "../../utils/asyncStorage";

const ForgotPasswordScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [emailPhone, setEmailPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.BASE_URL;

  const handleEmailChange = (text) => {
    setEmailPhone(text);
    if (text.length === 0) {
      setEmailError("Email or Phone Number is required");
    } else {
      setEmailError("");
      setIsValid(true);
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/user/verify-email/${emailPhone}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const result = await response.json();

      if (response.ok) {
        // send verification code to email
        sendVerificationCode(emailPhone);
      } else {
        setEmailError(result.message);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const sendVerificationCode = async (emailAddress) => {
    // generate 6 digit random number as otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    // store otp to local storage
    await setItem("otp", otp);

    // send otp to email
    // use html template for email
    const message = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #f9784b;">Reset Password Code</h1>

    <p>Dear User,</p>
    <p>Your OTP is <span style="font-weight: bold; color: #000;">${otp}</span></p>
    <p>Use this code to verify email. Thank you.</p>
    <p style="color: #666; font-size: 12px;">If you did not request this change, please contact our support team immediately.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #666;">Best regards,<br>SplinX Planet</p>
  </div>
`;

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
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setLoading(false);
        navigationToScreen(navigation, "EnterNewPasswordScreen", {
          emailAddress,
        });
      } else {
        setLoading(false);
        Alert.alert("error", result.message);
      }
    } catch (error) {
      Alert.alert("error", error);
    }
  };

  const handleNext = () => {
    // find user by email or phone number

    handleEmailVerification();
    // if user exists, send 6 digit code to email  or phone number
    // navigate to EnterNewPasswordScreen
    // if user does not exist, show error message
    // navigationToScreen(navigation, "EnterNewPasswordScreen");
  };

  return (
    <ScrollView>
      <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Forgot Password?" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16} textAlign="center" mb={28}>
          Enter your registered email address that you use with your account to
          continue.
        </Text>
        <CustomInput
          placeholder="Your Email Address"
          type="text"
          inputValue={emailPhone}
          handleTextChange={handleEmailChange}
          error={emailError}
        />

        {/* next button */}

        <Box mt={160}>
          {loading ? (
            <LoadingSpinner />
          ) : !isValid ? (
            <CustomButton
              label="Next"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Next" buttonFunc={handleNext} />
          )}
        </Box>

        {/* remember password? Login */}
        <Box mt={120}>
          <TouchableOpacity
            onPress={() => navigationToScreen(navigation, "LoginUser")}
          >
            <Text
              size="sm"
              style={{ color: "#000", textAlign: "center"}}
            >
              Remember Password?{" "}
              <Text
                onPress={() => navigationToScreen(navigation, "LoginUser")}
              >
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </Box>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
