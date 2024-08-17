import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  AddMoney,
  AddMoneySuccess,
  AddMoneyPayScreen,
  BillsHome,
  BillsGroup,
  BillsDetails,
  CreateNewBills,
  TransactionScreen,
  TransactionHistory,
  RequestPay,
  TransferMoney
} from "../components/splitBills";
import ProfileHome from "../components/profileSettings/ProfileHome";
import FaqScreen from "../components/profileSettings/FaqScreen";

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
        name="AddMoneySuccess"
        component={AddMoneySuccess}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="AddMoneyPayScreen"
        component={AddMoneyPayScreen}
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
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default BillsPayScreen;
