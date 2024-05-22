import React, { useState, useEffect, useRef } from "react";
import { Text, SafeAreaView, View } from "react-native";
import CodeInput from "react-native-code-input";
import { secondaryColor } from "../../utils/appstyle";
import { Box } from "@gluestack-ui/themed";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";

const VerifyNumber = ({ navigation, route }) => {
  // extract phone number from param
  const { newPhoneNumber } = route.params;

  const [tokenValue, setTokenValue] = useState("");
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [mt, setMt] = useState(68); // margin top for resend text
  const [showResend, setShowResend] = useState(false); // show resend text after 1 minutes
  const [timer, setTimer] = useState(60); // 1 minutes [60 seconds]
  const [error, setError] = useState("");

  const handleBackBtn = () => {
    navigation.goBack();
  };

  const codeInputRef = useRef(null);

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

  // handle verify code
  const handleVerifyCode = () => {
    if (isValid) {
      // navigate to home screen
      navigation.navigate("PersonalInfoScreen");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Verify Number" icon2="" func={handleBackBtn} />

      <View className="mt-14 flex items-center">
        <Text className="font-bold text-lg">Enter Verification Code</Text>

        {/* verification code input */}
        <View>
          <Text className="mt-6 text-center text-gray-500">
            Enter the 4-digit code sent to {newPhoneNumber}
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
            <CustomButton
              label="Verify"
              buttonFunc={handleVerifyCode}
            />
          ) : (
            <CustomButton label="Verify" backgroundColor={secondaryColor} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyNumber;
