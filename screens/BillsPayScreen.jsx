import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  AddMoney,
  BillsHome,
  BillsGroup,
  BillsDetails,
  CreateNewBills,
  TransactionScreen,
  TransactionHistory,
  RequestPay,
  TransferMoney
} from "../components/splitBills";

const BillsPayScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BillsHome"
        component={BillsHome}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AddMoney"
        component={AddMoney}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="CreateNewBills"
        component={CreateNewBills}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="BillsDetails"
        component={BillsDetails}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="BillsGroup"
        component={BillsGroup}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="RequestPay"
        component={RequestPay}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="TransferMoney"
        component={TransferMoney}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default BillsPayScreen;
