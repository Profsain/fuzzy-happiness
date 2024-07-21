import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../components";
import PhoneInput from "react-native-phone-number-input";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";
import { TouchableOpacity, Alert } from "react-native";
import { firebaseConfig } from "../config";

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignUpScreen = ({ navigation }) => {
  const [isValid, setIsValid] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneInput = useRef(null);
  const recaptchaVerifier = useRef(null);

  const handleChangeValue = (text) => {
    setPhoneValue(text);

    if (text.length === 0) {
      setError("Phone Number is required");
      setIsValid(false);
    } else if (text.length < 10) {
      setError("Phone Number must be 10 digits");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  };

  const sendVerificationCode = async (phoneNumber) => {
    setLoading(true);
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationToken = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );

      Alert.alert("Verification code has been sent to your phone.");

      if (verificationToken) {
        const data = {
          phone: formattedValue,
          verificationId: verificationToken,
        };

        navigationToScreen(navigation, "TokenScreen", data);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }
  };

  const handleGetToken = () => {
    sendVerificationCode(formattedValue);
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Phone Number" />

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
          />
          {error && (
            <Text size="sm" style={{ color: "#ea9977" }}>
              {error}
            </Text>
          )}

          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
        </Box>

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
