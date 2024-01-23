import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";

const AddEmailScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /\S+@\S+\.\S+/;
    // validate email
    if (text.length === 0) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
      setIsValid(true);
    }
  };

  const handleNext = () => {
    // persist email in local storage
    // send token to email
    // Alert.alert("Email", email);
    // navigate to EmailVerificationCode screen
    navigationToScreen(navigation, "EmailVerificationCode");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Add Your Email" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16}>
          Add the email address you'd like to use for your account. Receive
          important updates and notifications through this email.
        </Text>
        <CustomInput
          placeholder="Email Address"
          type="email"
          inputValue={email}
          handleTextChange={handleEmailChange}
          error={emailError}
        />

        {/* next button */}
        <Box mt={130}>
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

export default AddEmailScreen;
