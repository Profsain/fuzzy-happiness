import React, { useState, useEffect, useRef } from "react";
import { Box, Text, VStack, set } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, CustomInput } from "../../components";
import CodeInput from "react-native-code-input";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { Alert, TouchableOpacity } from "react-native";

const EmailVerificationCode = ({ navigation }) => {
  const [email, setEmail] = useState("pascaldestiny03@gmail.com");
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [tokenValue, setTokenValue] = useState("");
  const [confirmToken, setConfirmToken] = useState("123456");
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
      setError("Verification code is required");
      setMt(18);
      return;
    } else if (code.length < 6) {
      setError("Code must be 6 digits");
      setMt(18);
      return;
    } else if (code !== confirmToken) {
      setError("Code is incorrect");
      setMt(18);
      return;
    } else {
      setError("");
      setIsValid(true);
      setMt(68);
    }
  };

  // handle next button
  const handleNext = () => {
    // persist phone number in local storage
    // navigate to Add Email Screen
    navigationToScreen(navigation, "AddAddressScreen");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Enter code" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16}>
          We sent a verification code to your email {email}
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
                  onPress={() => Alert.alert("Resend code")}
                >
                  Resend
                </Text>
              )}
            </Text>
          </Box>
        </Box>

        {/* next button */}
        <Box mt={160}>
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
      </VStack>
    </Box>
  );
};

export default EmailVerificationCode;
