import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { secondaryColor } from "../utils/appstyle";
import navigationToScreen from "../utils/navigationUtil";
import { Box } from "@gluestack-ui/themed";

const LoginScreen = ({ navigation }) => {
  // handle login
  const handleLogin = async () => {
    navigationToScreen(navigation, "LoginUser");
    // set isExplorer to false in async storage
    await AsyncStorage.setItem("isExplorer", "false");
  };
  // handle sign up
  const handleSignUp = async () => {
    navigationToScreen(navigation, "SignUpScreen");
    // set isExplorer to false in async storage
    await AsyncStorage.setItem("isExplorer", "false");
  };

  // handle explore
  const handleExplore = async () => {
    // set isExplorer to true in async storage
    await AsyncStorage.setItem("isExplorer", "true");
    navigationToScreen(navigation, "TabNavigation");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box mt={84}>
        <Image
          source={require("../assets/loginscreen1.png")}
          className="w-38 h-35 p-4 object-contain"
        />
      </Box>

      <View style={styles.btnContainer}>
        <CustomButton label="Log in" buttonFunc={handleLogin} mt={38} />
        <CustomButton
          label="Sign up"
          backgroundColor={secondaryColor}
          color="#000"
          buttonFunc={handleSignUp}
        />
        {/* just explore */}
        <Box mt={6}>
          <CustomButton
            backgroundColor="lightgray"
            color={secondaryColor}
            label="Just explore"
            buttonFunc={handleExplore}
          />
        </Box>
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
