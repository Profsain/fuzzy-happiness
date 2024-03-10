import React, { useEffect, useState } from "react";
// local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import TabNavigation from "./TabNavigation";
import { AllEvents } from "../components/home";


const Stack = createNativeStackNavigator();

const AppStack = () => {
  const navigation = useNavigation();


  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "",
          headerBackVisible: false,
          shadowColor: "white",
          borderBottomWidth: 0,
          elevation: 0,
        }}
        name="TabNavigation"
        component={TabNavigation}
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
        name="AllEvents"
        component={AllEvents}
      />
      
    </Stack.Navigator>
  );
};

export default AppStack;
