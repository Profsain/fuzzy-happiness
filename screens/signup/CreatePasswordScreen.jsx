import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, PasswordInput } from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";

const CreatePasswordScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [isAllValid, setIsAllValid] = useState(false); // to check if all inputs are valid
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
    }
  };

  // handle confirm password
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    // validate confirm password
    if (text.length === 0) {
      setConfirmPasswordError("Confirm password is required");
    } else if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
      setIsAllValid(true);
    }
  };

  // handle next btn
  const handleNext = () => {
    // persist data in local storage
    const data = {
      password,
      confirmPassword,
    };
    // navigate to LoginUser
    navigationToScreen(navigation, "EnableNotificationScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Create Password" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16}>
          Your password must be at least 6 characters long.
        </Text>
        <PasswordInput
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Enter Password"
          inputValue={password}
          handleTextChange={handlePasswordChange}
          error={passwordError}
        />

        <PasswordInput
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Confirm Password"
          inputValue={confirmPassword}
          handleTextChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
        />

        {/* next button */}
        <Box mt={160}>
          {!isAllValid ? (
            <CustomButton
              label="Next"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Next" buttonFunc={handleNext} />
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default CreatePasswordScreen;
