import React, {useEffect, useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useExplorerStatus from "../hooks/useExplorerStatus";
import {
  HomeNavigator,
  BillsPayScreen,
  SettingScreen,
  ChatComScreen,
  CommunityScreen,
} from "../screens";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLogin } from "../context/LoginProvider";
import { Alert, TouchableOpacity } from "react-native"; // Import TouchableOpacity

const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  const isExplorer = useExplorerStatus(); // Use the custom hook to get explorer status

  const { isLocked } = useLogin(); // Check subscription status

  // Function to handle tab press and check if subscription is locked
  const handleTabPress = (navigation) => {
    if (isLocked) {
      Alert.alert("Subscription", "You are not allowed to access this screen");
    } else if (isExplorer === "true") {
      Alert.alert("Explorer", "You are not allowed to access this screen");
    } else {
      navigation(); // Proceed to the selected screen
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "white",
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress(props.onPress)}
            />
          ),
        }}
      />

      <Tab.Screen
        name="BillsPay"
        component={BillsPayScreen}
        options={{
          tabBarLabel: "BillsPay",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hand-holding-usd" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress(props.onPress)}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChatCom"
        component={ChatComScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress(props.onPress)}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress(props.onPress)}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress(props.onPress)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
