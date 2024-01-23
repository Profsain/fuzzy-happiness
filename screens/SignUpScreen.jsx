import React, { useState, useRef } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings } from "../components";
import PhoneInput from "react-native-phone-number-input";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";
import { Alert, TouchableOpacity } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");

  const phoneInput = useRef(null);

  // handle phone number change
  const handleChangeValue = (text) => {
    setPhoneValue(text);

    if (text.length === 0) {
      setError("Phone Number is required");
      return;
    } else if (text.length < 10) {
      setError("Phone Number must be 10 digits");
      return;
    } else {
      setError("");
      setIsValid(true);
    }
  };

  // handle send token
  const handleGetToken = () => {
    // persist phone number in local storage
    // send token to phone number
    const checkValid = phoneInput.current?.isValidNumber(phoneValue);

    if (!checkValid) {
      setError("Invalid Phone Number");
      return;
    } else {
      setError("");
      setIsValid(true);
    }

    // Alert.alert("Formatted Number", formattedValue);
    // sent token to formattedValue
    // navigate to TokenScreen
    navigationToScreen(navigation, "TokenScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Phone Number" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16}>Enter your mobile number to get a token.</Text>

        <Box width="100%">
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
            // autoFocus
          />
          {error && (
            <Text size="sm" style={{ color: "#ea9977" }}>
              {error}
            </Text>
          )}
        </Box>

        {/* next button */}
        <Box mt={160}>
          {!isValid ? (
            <CustomButton
              label="Get Token"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Get Token" buttonFunc={handleGetToken} />
          )}
        </Box>

        {/* remember password? Login */}
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
