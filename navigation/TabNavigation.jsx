import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  BillsPayScreen,
  SettingScreen,
  ChatComScreen,
  CommunityScreen,
} from "../screens";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="BillsPay"
        component={BillsPayScreen}
        options={{
          tabBarLabel: "BillsPay",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hand-holding-usd" size={24} color="black" />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="ChatCom"
        component={ChatComScreen}
        options={{
          tabBarLabel: "ChatCom",
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="user"
        component={SettingScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
