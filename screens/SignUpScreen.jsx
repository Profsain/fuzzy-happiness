import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../components";
import PhoneInput from "react-native-phone-number-input";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";
import { View, TouchableOpacity } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  // loading spinner
  const [loading, setLoading] = useState(false);

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

  // send token to phone number
  const recaptchaVerifier = useRef(null);

  const sendVerificationCode = async (phoneNumber) => {
    // set loading to true
    setLoading(true);
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationToken = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );

      if (verificationToken) {
        // navigate to token screen
        const data = {
          phone: formattedValue,
          verificationId: verificationToken,
        };

        navigationToScreen(navigation, "TokenScreen", data);

        // set loading to false
        setLoading(false);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  
  const handleGetToken = () => {
    // call sendVerificationCode function
    sendVerificationCode(formattedValue);
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

          {/* recaptcha component */}
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
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
            <Box>
              {!loading ? (
                <CustomButton label="Get Token" buttonFunc={handleGetToken} />
              ) : (
                <LoadingSpinner />
              )}
            </Box>
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
