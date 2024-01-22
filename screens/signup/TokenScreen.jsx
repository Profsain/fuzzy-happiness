import React, { useState, useRef } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, CustomInput } from "../../components";
import CodeInput from "react-native-code-input";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { Alert, TouchableOpacity } from "react-native";

const TokenScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("+447821456740");
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [tokenValue, setTokenValue] = useState("");
  const [confirmToken, setConfirmToken] = useState("123456")
  const [error, setError] = useState("");

  const codeInputRef = useRef(null);

  // handle token code change
  const handleTokenValue = (code) => {
    setTokenValue(code);

    // handle error
    if (code.length === 0) {
      setError("Token Code is required");
      return;
    } else if (code.length < 6) {
      setError("Token Code must be 6 digits");
      return;
    } else if (code !== confirmToken) {
      setError("Token Code is incorrect");
      return;
    } else {
      setError("");
      setIsValid(true);
    }
  };

  // handle send token
  const handleConfirmToken = () => {
    // persist phone number in local storage
    // navigate to Add Email Screen
    navigationToScreen(navigation, "AddEmailScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Toke Code" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16}>
          Enter the code we sent to your mobile number {phoneNumber} to verify
          your account.
        </Text>

        <Box width="100%">
          <CodeInput
            ref={codeInputRef}
            codeLength={6}
            // secureTextEntry
            borderType={"underline"}
            space={8}
            size={40}
            activeColor="#BDBDBD"
            inactiveColor="#E5E5E5"
            autoFocus={false}
            inputPosition="center"
            codeInputStyle={{
              fontSize: 18,
              fontWeight: "bold",
              borderWidth: 1.5,
              borderRadius: 5,
              backgroundColor: "#E5E5E5",
            }}
            onFulfill={(code) => handleTokenValue(code)}
          />
          {error && (
            <Text mt={48} pl={16} size="sm" style={{ color: "#ea9977" }}>
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
            <CustomButton label="Get Toke" buttonFunc={handleConfirmToken} />
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

export default TokenScreen;
