import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getItem, removeItem } from "../../utils/asyncStorage";
import { Alert, TouchableOpacity, ScrollView } from "react-native";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  PasswordInput,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import useReceivedData from "../../hooks/useReceivedData";
import LoadingSpinner from "../../components/LoadingSpinner";

const EnterNewPasswordScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [otpCode, setOtpCode] = useState("");
  const [isAllValid, setIsAllValid] = useState(false); // to check if all inputs are valid
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // get otp code
  useEffect(() => {
    const getOtpCode = async () => {
      const otp = await getItem("otp");
      setOtpCode(otp);
    };
    getOtpCode();
  }, []);
  // alert(otpCode);

  const handleCodeChange = (text) => {
    setVerificationCode(text);
    if (text.length === 0) {
      setCodeError("6 digit code is required");
    } else if (text != otpCode) {
      setCodeError("Please enter a valid verification code");
    } else {
      setCodeError("");
    }
  };

  // handle password
  const handlePasswordChange = (text) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

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

  // handle confirm password
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
      setIsAllValid(true);
    }
  };

  // extract received data
  const receivedData = useReceivedData();
  const baseUrl = process.env.BASE_URL;

  // handle password change
  const handlePasswordUpdate = async () => {
    setLoading(true);
    const emailAddress = receivedData.emailAddress;
    // verify code
    if (verificationCode != otpCode) {
      setCodeError("Please enter a valid verification code");
      return;
    }

    try {
      const data = {
        newPassword: password,
        emailAddress: emailAddress,
      };

      const response = await fetch(`${baseUrl}/user/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        setCodeError(result.message);
        return;
      }

      setLoading(false);
      // remove otp
      await removeItem("otp");

      Alert.alert("Success", "Password changed successfully. Please login");
      // navigate to LoginUser
      navigation.replace("LoginUser");
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
      setLoading(false);
    }
  };

  return (
    <ScrollView>
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

          <PasswordInput
            showPassword={showPassword}
            handleState={handleState}
            placeholder="Confirm New Password"
            inputValue={confirmPassword}
            handleTextChange={handleConfirmPasswordChange}
            error={confirmPasswordError}
          />

          {/* next button */}
          <Box mt={160}>
            {loading ? (
              <LoadingSpinner />
            ) : !isAllValid ? (
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
    </ScrollView>
  );
};

export default EnterNewPasswordScreen;
