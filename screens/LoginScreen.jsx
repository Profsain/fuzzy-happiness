import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";

const LoginScreen = ({ navigation }) => {
  // handle login
  const handleLogin = () => {
    navigationToScreen(navigation, "LoginUser");
  };
  // handle signup
  const handleSignUp = () => {
    navigationToScreen(navigation, "SignUpUser");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/loginimage.png")}
        className="w-38 h-35 p-4 object-contain"
      />

      <View style={styles.btnContainer}>
        <CustomButton label="Log in" buttonFunc={handleLogin} />
        <CustomButton
          label="Sign up"
          backgroundColor={secondaryColor}
          color="#000"
          buttonFunc={handleSignUp}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 60,
  },
});

export default LoginScreen;
