import React, { useEffect, useState } from "react";
// local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useNavigation} from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { OnboardingScreen, LoginScreen, SignUpScreen } from "../screens";
import { ForgotPasswordScreen, LoginUser } from "../screens/login";
import EnterNewPasswordScreen from "../screens/login/EnterNewPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("onboarded", "true");
        setHasOnboarded(true);
      } else {
        setHasOnboarded(true);
      }
    });
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <Stack.Navigator>
      {hasOnboarded && (
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
      )}

      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
        navigation={navigation}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <AntDesign
              onPress={handleGoBack}
              name="left"
              size={24}
              color="black"
            />
          ),
        }}
        name="LoginUser"
        component={LoginUser}
        navigation={navigation}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <AntDesign
              onPress={handleGoBack}
              name="left"
              size={24}
              color="black"
            />
          ),
        }}
        name="SignUpUser"
        component={SignUpScreen}
        navigation={navigation}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <AntDesign
              onPress={handleGoBack}
              name="left"
              size={24}
              color="black"
            />
          ),
        }}
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        navigation={navigation}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <AntDesign
              onPress={handleGoBack}
              name="left"
              size={24}
              color="black"
            />
          ),
        }}
        name="EnterNewPasswordScreen"
        component={EnterNewPasswordScreen}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;