import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import {
  HomeScreen,
  AllEvents,
  CreateNewEvent,
  MySingleEvent,
  SingleEvent,
  SearchResult,
  EventRegistration,
} from "../components/home";
import MembershipScreen from "../components/profileSettings/MembershipScreen";

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AllEvents"
        component={AllEvents}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="CreateNewEvent"
        component={CreateNewEvent}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="EventRegistration"
        component={EventRegistration}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="MySingleEvent"
        component={MySingleEvent}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="SingleEvent"
        component={SingleEvent}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="MembershipScreen"
        component={MembershipScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
