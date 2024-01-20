import React, { useEffect, useState } from "react";
// local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreen, LoginScreen } from "./screens";
import { LoginUser } from "./screens/login";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginUser"
          component={LoginUser}
        />
      </Stack.Navigator>
  );
}

export default AuthStack;