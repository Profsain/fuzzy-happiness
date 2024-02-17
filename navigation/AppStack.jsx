import React, { useEffect, useState } from "react";
// local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";


const Stack = createNativeStackNavigator();

const AppStack = () => {
  const navigation = useNavigation();


  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true }}
        name="HomeScreen"
        component={HomeScreen}
        navigation={navigation}
      />

      {/* <Stack.Screen
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
      /> */}

    </Stack.Navigator>
  );
};

export default AppStack;
