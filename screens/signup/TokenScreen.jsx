import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { getItem, removeItem } from "../../utils/asyncStorage";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings } from "../../components";
import CodeInput from "react-native-code-input";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { TouchableOpacity } from "react-native";
// hooks
import useReceivedData from "../../hooks/useReceivedData";

const TokenScreen = () => {
  // data from signUp screen
  const receivedData = useReceivedData();
  const phoneNumber = receivedData.phone;

  // navigation
  const navigation = useNavigation();

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
  const handleConfirmToken = async () => {
    try {
      // get otp from local storage
      const otp = await getItem("otp");

      if (otp == tokenValue) {
        const data = {
          phoneNumber: phoneNumber,
        };

        navigation.replace("AddEmailScreen", data);

        // remove otp
        await removeItem("otp");
      }
    } catch (error) {
      setError("Invalid Token Code");
    }
  };

  // handle token resend
  const handleResendToken = () => {
    // navigate back to SignUpScreen
     navigationToScreen(navigation, "SignUpScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Token Code" />

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

          {/* resend token after 1 minute */}
          <Box mt={mt}>
            <Text
              pl={16}
              size="sm"
              style={{ color: "#000", textAlign: "left" }}
            >
              Didn't receive the code?{" "}
              {!showResend ? (
                <Text>Resend in 0:{timer}</Text>
              ) : (
                <Text
                  size="sm"
                  style={{ color: "#000", textAlign: "center" }}
                  onPress={handleResendToken}
                >
                  Resend
                </Text>
              )}
            </Text>
          </Box>
        </Box>

        {/* next button */}
        <Box mt={110}>
          {!isValid ? (
            <CustomButton
              label="Next"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Next" buttonFunc={handleConfirmToken} />
          )}
        </Box>

        {/* remember password? Login */}
        <Box mt={70}>
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
