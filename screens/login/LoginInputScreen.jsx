import React, { useState } from "react";
// native notification
import { registerIndieID } from "native-notify";
import axios from "axios";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Alert, Image, TouchableOpacity } from "react-native";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  PasswordInput,
  LoadingSpinner,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

const LoginInputScreen = () => {

  // navigation
  const navigation = useNavigation();

  // native notify token
  const notifyToken = process.env.NATIVE_NOTIFY_TOKEN;

  // End of Native Notify Code

  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { setUserProfile, userProfile, isLogin, setIsLogin, setToken } =
    useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [isAllValid, setIsAllValid] = useState(false); // to check if all inputs are valid
  const [loading, setLoading] = useState(false); // to check if the login button is loading
  const [loginMsg, setLoginMsg] = useState(""); // to display login message
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text.trim().toLowerCase());
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
    setPassword(text.trim());
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // validate password
    if (text.length === 0) {
      setPasswordError("Password is required");
    } else if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
      setIsAllValid(true);
    }
  };

  // handle social login
  const handleSocialLogin = () => {
    Alert.alert("Social Login");
  };

  // handle user Login
  const handleLogin = async () => {
    // set loading to true
    setLoading(true);

    // login info
    const userInfo = {
      emailAddress: email,
      password,
    };

    // login logic
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        // Login successful
        setLoading(false);
        setLoginMsg("");
        const data = await response.json();
        // store user data in context, navigate to the next home screen.
        setUserProfile(data.userProfile);
        setIsLogin(true);
        setToken(data.token);

        // set user id and call handleRegisterIndieID
        // set user id
        const userId = data.userProfile._id;

        await registerIndieID(`${userId}`, 22245, notifyToken);
        // sendPushNotification(userId, "Splinx Planet", "Welcome back! You have successfully logged in.");
        // End of Native Notify Code

        //navigate to TabNavigation Screen
        navigation.navigate("TabNavigation");
      } else {
        // Login failed
        setLoading(false);
        const errorData = await response.json();
        console.log("Login failed:", errorData.message);
        setLoginMsg(
          "Login failed: User not found or password is incorrect. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      setLoginMsg("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <Box width="100%" justifyContent="center" p={24}>
      <CustomHeadings title="Welcome Back!" />

      <Box>
        <Text size="sm" style={{ color: "red", textAlign: "left" }}>
          {loginMsg}
        </Text>
      </Box>

      {/* form section */}
      <VStack space="xl" mt={25}>
        <CustomInput
          placeholder="Enter your email"
          type="email"
          inputValue={email}
          handleTextChange={handleEmailChange}
          error={emailError}
          keyboardType={"email-address"}
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
            <Box>
              {!loading ? (
                <CustomButton label="Log in" buttonFunc={handleLogin} />
              ) : (
                <LoadingSpinner />
              )}
            </Box>
          )}
        </Box>

        {/* signup text at the bottom*/}
        <Box mt={20} mb={20}>
          <TouchableOpacity
            onPress={() => navigationToScreen(navigation, "SignUpScreen")}
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
