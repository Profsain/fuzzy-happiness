import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase";
// import { getAuth, PhoneAuthProvider } from "@firebase/auth";
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

  // send token to phone number
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);

  // function to be called when requesting for token
  // const sendVerification = async () => {
  //   try {
  //     const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //     const verificationId = await phoneProvider.verifyPhoneNumber(
  //       formattedValue,
  //       recaptchaVerifier.current
  //     );
  //     setVerificationId(verificationId);
  //     Alert.alert("Verification code has been sent to your phone.");
  //   } catch (err) {
  //     Alert.alert("Error", err.message);
  //   }
  // };
  // const sendVerification = async () => {
  //   try {
  //     const auth = getAuth(firebase); // Get Firebase Auth instance
  //     const phoneProvider = new PhoneAuthProvider(auth); // Initialize PhoneAuthProvider with auth
  //     const verificationId = await phoneProvider.verifyPhoneNumber(
  //       formattedValue,
  //       recaptchaVerifier.current
  //     );
  //     setVerificationId(verificationId);
  //     Alert.alert("Verification code has been sent to your phone.");
  //   } catch (err) {
  //     Alert.alert("Error", err.message);
  //   }
  // };

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };


  // handle send token
  const handleGetToken = () => {
    // call sendVerification function
    sendVerification();

    // send data to next screen
    const data = {
      phone: formattedValue,
      verificationId: verificationId,
    };

    // send token to phone number
    const checkValid = phoneInput.current?.isValidNumber(phoneValue);

    if (verificationId) {
      // navigationToScreen(navigation, "TokenScreen", data);

      Alert.alert("Token has been sent to your phone.");
      console.log(verificationId);
    }

    console.log("Error", verificationId);
    // // sent token to formattedValue
    // navigate to TokenScreen
    // navigationToScreen(navigation, "TokenScreen", data);
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
            firebaseConfig={firebase.app().options}
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
