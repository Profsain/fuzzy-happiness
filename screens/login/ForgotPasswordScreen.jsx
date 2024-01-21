import React, { useState } from "react";
import { Box, Text, VStack, set } from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  // PasswordInput,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { Alert, TouchableOpacity } from "react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [emailPhone, setEmailPhone] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (text) => {
    setEmailPhone(text);
    if (text.length === 0) {
      setEmailError("Email or Phone Number is required");
    } else {
      setEmailError("");
      setIsValid(true);
    }
  };

  const handleNext = () => {
    // find user by email or phone number
    // if user exists, send 6 digit code to email  or phone number
    // navigate to EnterNewPasswordScreen
    // if user does not exist, show error message
    navigationToScreen(navigation, "EnterNewPasswordScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Forgot Password?" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16} textAlign="center">
          Enter your email address or phone number that you use with your
          account to continue.
        </Text>
        <CustomInput
          placeholder="Email or Phone Number"
          type="text"
          inputValue={emailPhone}
          handleTextChange={handleEmailChange}
          error={emailError}
        />

        {/* next button */}
        <Box mt={160}>
          {!isValid ? (
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
        <Box mt={140}>
          <TouchableOpacity
            onPress={() => navigationToScreen(navigation, "LoginUser")}
          >
            <Text
              size="sm"
              style={{ color: "#000", textAlign: "center", marginTop: 6 }}
            >
              Remember Password?{" "}
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

export default ForgotPasswordScreen;
