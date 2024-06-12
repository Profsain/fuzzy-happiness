import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../../components";
import PhoneInput from "react-native-phone-number-input";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { View, TouchableOpacity } from "react-native";
import { BackTopBar } from "../../components/home";

const ChangePhoneNumber = ({ navigation }) => {
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
    // try {
    //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
    //   const verificationToken = await phoneProvider.verifyPhoneNumber(
    //     phoneNumber,
    //     recaptchaVerifier.current
    //   );

    //   if (verificationToken) {
    //     const data = {
    //       phone: formattedValue,
    //       verificationId: verificationToken,
    //     };
    //     navigationToScreen(navigation, "VerifyNumber", data);
    //   }
    // } catch (error) {
    //   console.error("Error", error.message);
    //   setError("Failed to send verification code. Please try again.");
    // } finally {
    //   setLoading(false);
    // }

    // temp work through
    navigationToScreen(navigation, "VerifyNumber", {
      phone: formattedValue,
      verificationId: "123456",
    });
  };

  const handleGetToken = () => {
    if (isValid) {
      sendVerificationCode(formattedValue);
    }
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <View className="my-8">
        <BackTopBar
          func={() => navigation.goBack()}
          headline="Change Phone Number"
        />
      </View>

      <VStack space="xl" mt={15}>
        <Text fontSize={16}>Enter new mobile number to get a OTP.</Text>

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
              label="Get OTP Code"
              backgroundColor={secondaryColor}
              color="#000"
              buttonFunc={null}
            />
          ) : (
            <Box>
              {!loading ? (
                <CustomButton
                  label="Get OTP Code"
                  buttonFunc={handleGetToken}
                />
              ) : (
                <LoadingSpinner />
              )}
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ChangePhoneNumber;
