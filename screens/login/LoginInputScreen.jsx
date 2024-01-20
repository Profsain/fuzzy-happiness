import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Alert, Image, TouchableOpacity } from "react-native";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  PasswordInput,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";

const LoginInputScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [isAllValid, setIsAllValid] = useState(false); // to check if all inputs are valid
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /\S+@\S+\.\S+/;
    // validate email
    if (text.length === 0) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  // handle password
  const handlePasswordChange = (text) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // validate password
    if (text.length === 0) {
      setPasswordError("Password is required");
    } else if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (!passwordRegex.test(text)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSocialLogin = () => {
    Alert.alert("Social Login");
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Welcome Back!" />

      {/* form section */}
      <VStack space="xl" mt={25}>
        <CustomInput
          placeholder="Enter your email"
          type="email"
          inputValue={email}
          handleTextChange={handleEmailChange}
          error={emailError}
        />
        <PasswordInput
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Enter your password"
          inputValue={password}
          handleTextChange={handlePasswordChange}
          error={passwordError}
        />

        {/* forgot password */}
        <TouchableOpacity
          onPress={() => navigationToScreen(navigation, "ForgotPasswordScreen")}
        >
          <Text
            size="sm"
            style={{ color: "#000", textAlign: "right", marginTop: 6 }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* horizontal line */}
        <Box
          mt={20}
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box borderBottomWidth={1.4} borderBottomColor="#000" width="30%" />
          <Text mb={5} size="sm" style={{ color: "#000", textAlign: "center" }}>
            Or Login with
          </Text>
          <Box borderBottomWidth={1.4} borderBottomColor="#000" width="30%" />
        </Box>

        {/* social login */}
        <Box
          mt={38}
          width="100%"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <TouchableOpacity onPress={handleSocialLogin}>
            <Image size="sm" source={require("../../assets/facebook.png")} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSocialLogin}>
            <Image size="sm" source={require("../../assets/google.png")} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSocialLogin}>
            <Image size="sm" source={require("../../assets/apple.png")} />
          </TouchableOpacity>
        </Box>

        {/* login button */}
        <Box mt={60}>
          {!isAllValid ? (
            <CustomButton
              label="Log in"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Log in" />
          )}
        </Box>

        {/* signup text at the bottom*/}
        <Box mt={40}>
          <TouchableOpacity
            onPress={() => navigationToScreen(navigation, "SignUpUser")}
          >
            <Text size="sm" style={{ color: "#000", textAlign: "center" }}>
              Don't have an account?{"   "}
              <Text size="sm">Sign up</Text>
            </Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </Box>
  );
};

export default LoginInputScreen;
