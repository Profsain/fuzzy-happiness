import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, CustomInput } from "../../components";
import CodeInput from "react-native-code-input";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { TouchableOpacity, SafeAreaView, View, Alert } from "react-native";
// hooks
import useReceivedData from "../../hooks/useReceivedData";
import { BackTopBar } from "../home";

const VerifyNumber = ({ navigation, route }) => {
  const receivedData = useReceivedData();
  const phoneNumber = receivedData.phone;
  const verificationId = receivedData.verificationId;

  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [tokenValue, setTokenValue] = useState("");
  const [error, setError] = useState("");
  const [mt, setMt] = useState(68); // margin top for resend text
  const [showResend, setShowResend] = useState(false); // show resend text after 1 minutes
  const [timer, setTimer] = useState(60); // 1 minutes [60 seconds]

  // sent timeout for 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => {
        // Check if the timer is greater than 0 before decrementing
        if (timer > 0) {
          return timer - 1;
        } else {
          // If the timer is 0 or negative, show the resend text and clear the interval
          setShowResend(true);
          clearInterval(interval);
          return 0; // Make sure to return 0 to stop further decrements
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const codeInputRef = useRef(null);

  // handle token code change
  const handleTokenValue = (code) => {
    setTokenValue(code);
    // handle error
    if (code.length === 0) {
      setError("Token Code is required");
      setMt(18);
      return;
    } else if (code.length < 6) {
      setError("Token Code must be 6 digits");
      setMt(18);
      return;
    } else {
      setError("");
      setIsValid(true);
      setMt(68);
    }
  };

  // handle confirm token
  const handleConfirmToken = () => {
    //  const credential = firebase.auth.PhoneAuthProvider.credential(
    //    verificationId,
    //    tokenValue
    //  );
    //  firebase
    //    .auth()
    //    .signInWithCredential(credential)
    //    .then((result) => {
    //      // do something with the result
    //      if (result) {
    //        const data = {
    //          phoneNumber: phoneNumber,
    //        };

    //        navigation.replace("PersonalInfoScreen", data);
    //      }
    //    })
    //    .catch((error) => {
    //      // do something with the error
    //      setError(error.message);
    //      console.log("Error", error);
    //    });
    if (verificationId === "123456") {
      Alert.alert("Success", "Phone Number Verified", [{ text: "OK" }]);
      // navigate to personal info screen
      navigation.navigate("PersonalInfoScreen");
    } else {
      setError("Failed to verify phone number. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar
        headline="Verify Number"
        icon2=""
        func={() => navigation.goBack()}
      />

      <View className="mt-14 flex items-center">
        <Text className="mt-6 text-center text-gray-500">
          Enter the 6-digit code sent to {phoneNumber}
        </Text>

        {/* verification code input */}
        <View className="my-8 flex items-center">
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

            {/* resend token after 1 minute */}
            <Box mt={mt}>
              <Text
                pl={16}
                size="sm"
                style={{ color: "#000", textAlign: "center" }}
              >
                Didn't receive the code?{" "}
                {!showResend ? (
                  <Text>Resend in 0:{timer}</Text>
                ) : (
                  <Text
                    size="sm"
                    style={{ color: "#000", textAlign: "center" }}
                    // onPress={handleResendToken}
                  >
                    Resend
                  </Text>
                )}
              </Text>
            </Box>
          </Box>
        </View>

        {/* verify button */}
        <View className="mt-6">
          {isValid ? (
            <CustomButton label="Verify" buttonFunc={handleConfirmToken} />
          ) : (
            <CustomButton label="Verify" backgroundColor={secondaryColor} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyNumber;
