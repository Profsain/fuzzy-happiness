import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Box, Text, VStack} from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  PasswordInput,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";

const EnterNewPasswordScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [isAllValid, setIsAllValid] = useState(false); // to check if all inputs are valid
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const code = "123456";
  const handleCodeChange = (text) => {
    setVerificationCode(text);
    if (text.length === 0) {
      setCodeError("6 digit code is required");
    } else if (text !== code) {
      setCodeError("Please enter a valid verification code");
    } else {
      setCodeError("");
    }
  };

  // handle password
  const handlePasswordChange = (text) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // validate password
    if (text.length === 0) {
      setPasswordError("Password is required");
    } else if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (!passwordRegex.test(text)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter and one number"
      );
    } else {
      setPasswordError("");
      setIsAllValid(true);
    }
  };

  // handle password change
  const handlePasswordUpdate = () => {
    // verify code
    // if code is valid, update password
    // navigate to LoginUser
    navigation.replace("LoginUser");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Enter New Password?" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <CustomInput
          placeholder="Enter 6 digit verification code"
          type="text"
          inputValue={verificationCode}
          handleTextChange={handleCodeChange}
          error={codeError}
        />

        <PasswordInput
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Enter New Password"
          inputValue={password}
          handleTextChange={handlePasswordChange}
          error={passwordError}
        />

        {/* next button */}
        <Box mt={160}>
          {!isAllValid ? (
            <CustomButton
              label="Change Password"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton
              label="Change Password"
              buttonFunc={handlePasswordUpdate}
            />
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

export default EnterNewPasswordScreen;
