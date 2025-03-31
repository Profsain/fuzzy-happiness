import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, set, Text, VStack } from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, LoadingSpinner } from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { TouchableOpacity, Alert, StyleSheet, Platform, View } from "react-native";
// hooks
import useReceivedData from "../../hooks/useReceivedData";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { checkVerification } from "../../utils/twillioApi";

const TokenScreen = () => {
  // data from signUp screen
  const receivedData = useReceivedData();
  const phoneNumber = receivedData.phoneNumber;

  // navigation
  const navigation = useNavigation();

  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [tokenValue, setTokenValue] = useState("");
  const [error, setError] = useState("");
  const [mt, setMt] = useState(68); // margin top for resend text
  const [showResend, setShowResend] = useState(false); // show resend text after 1 minutes
  const [processing, setProcessing] = useState(false); // processing state
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
    // set token value
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
    setProcessing(true);
    // verify that the token is valid
    checkVerification(phoneNumber, tokenValue).then((success) =>{
      if (success) {
        // navigate to add email screen
        navigation.replace("AddEmailScreen", { phoneNumber: phoneNumber });
        setProcessing(false);
      } else {
        setError(" Incorrect token. Please try again.");
        setProcessing(false);
        setIsValid(true);
      }

    })
    // try {
    //   const otp = await getItem("otp");

    //   if (otp == tokenValue) {
    //     // const data = {
    //     //   phoneNumber: phoneNumber,
    //     // };

    //     // Alert.alert("Token", JSON.stringify(data));
    //     navigation.replace("AddEmailScreen", { phoneNumber: phoneNumber });

    //     // remove otp
    //     await removeItem("otp");
    //     setProcessing(false);
    //   } else {
    //     setError("Invalid Token Code");
    //     setProcessing(false);
    //   }
    // } catch (error) {
    //   setError("Invalid Token Code");
    //   setProcessing(false);
    // }

  };

  // handle token resend
  const handleResendToken = () => {
    // navigate back to SignUpScreen
    navigationToScreen(navigation, "SignUpScreen");
  };

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const CELL_COUNT = 6;

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Token Code" />

      {/* form section */}
      <VStack space="xl" mt={15}>
        <Text fontSize={16}>
          Enter the code we sent to your mobile number {phoneNumber} to verify
          your account.
        </Text>

        {

          <CodeField
            ref={ref}
            {...props}
            value={tokenValue}
            onChangeText={handleTokenValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: "sms-otp",
              default: "one-time-code",
            })}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        }
       

        {/* resend token after 1 minute */}
        <View>
          {error && (
            <Text style={{ color: "#ea9977", fontSize: 12, marginVertical: 18, textAlign: "center" }}>
              {error}
            </Text>
          )}

          <Text pl={16} size="sm" style={{ color: "#000", textAlign: "center", marginTop: 10 }}>
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
        </View>

        {/* next button */}
          <View>
            {processing && <LoadingSpinner />}
          </View>
        <View className="flex flex-row justify-center mt-8">
          {!isValid ? (
            <CustomButton
              label="Next"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Next" buttonFunc={handleConfirmToken} />
          )}
        </View>

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

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default TokenScreen;
