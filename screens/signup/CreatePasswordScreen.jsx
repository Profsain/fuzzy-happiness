import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, PasswordInput } from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import useReceivedData from "../../hooks/useReceivedData";
// functions
import handlePasswordChange from "../../utils/handlePasswordChange";
import handleConfirmPasswordChange from "../../utils/handleConfirmPassword";
import { Alert } from "react-native";

const CreatePasswordScreen = ({ navigation }) => {
  // received data from previous screen
  const receivedData = useReceivedData();

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

  // handle next btn
  const handleNext = () => {
    // send data to next screen
    const data = {
      ...receivedData,
      password,
    };

    // navigate to EnableNotificationScreen
    navigationToScreen(navigation, "EnableNotificationScreen", data);
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
          handleTextChange={(text) =>
            handlePasswordChange(text, setPassword, setPasswordError)
          }
          error={passwordError}
        />

        <PasswordInput
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Confirm Password"
          inputValue={confirmPassword}
          handleTextChange={(text) =>
            handleConfirmPasswordChange(
              text,
              password,
              setConfirmPassword,
              setConfirmPasswordError,
              setIsAllValid
            )
          }
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
