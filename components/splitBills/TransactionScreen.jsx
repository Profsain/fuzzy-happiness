
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import { BackTopBar } from "../home";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import useFetchWallet from "../../hooks/useFetchWallet";

const TransactionScreen = ({ navigation }) => {
  // base URL
  const baseUrl = process.env.BASE_URL; 
  const { userProfile, token } = useLogin();
  const {currency, currencySymbol} = userProfile;

  // call useFetchWallet
 const { wallet, fetchWallet } = useFetchWallet();
  // re-fetch wallet on screen focus
   const fetchWalletData = useCallback(() => {
     fetchWallet(); // Call fetchWallet from the hook
   }, [fetchWallet]);

   useFocusEffect(fetchWalletData);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTransactionHistory = () => {
    navigation.navigate("TransactionHistory");
  };

  const handleChangePaymentMethod = () => {
    Alert.alert("Payment method changed");
  };

  const handleWalletSettings = () => {
    navigation.navigate("ProfileHome");
  };

  const handleFaq = () => {
    navigation.navigate("FaqScreen");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Wallet" func={handleBack} />
      <View
        className="h-40 rounded-lg my-6"
        style={{ backgroundColor: primeryColor }}
      >
        <ImageBackground
          source={require("../../assets/images/linestyles.png")}
          style={styles.background}
        >
          <View className="p-4">
            <View className="flex flex-row content-center justify-between items-center">
              <View>
                <Text className="text-white font-medium text-base">
                  Splinx Balance
                </Text>
                <Text className="mt-1 font-semibold text-xl">
                  {currencySymbol || "$"}{wallet?.balance?.toFixed(2) || "0.00"}
                </Text>
              </View>
              <Text className="text-white font-normal text-xs">
                {new Date().toLocaleDateString()}
              </Text>
            </View>
            <View className="flex flex-row justify-end mt-7">
              <TouchableOpacity
                className="flex items-center mr-3"
                onPress={() => navigation.navigate("AddMoney")}
              >
                <View className="bg-white p-1 rounded-full h-7 w-7 flex items-center justify-center">
                  <AntDesign name="pluscircleo" size={18} color="black" />
                </View>
                <Text className="font-semibold text-xs">Top up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex items-center mr-3"
                onPress={() => navigation.navigate("TransferMoney")}
              >
                <View className="bg-white p-1 rounded-full h-7 w-7 flex items-center justify-center">
                  <Fontisto name="arrow-swap" size={14} color="black" />
                </View>
                <Text className="font-semibold text-xs">Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex items-center"
                onPress={() => navigation.navigate("RequestPay")}
              >
                <View className="bg-white p-1 rounded-full h-7 w-7 flex items-center justify-center">
                  <AntDesign name="arrowdown" size={18} color="black" />
                </View>
                <Text className="font-semibold text-xs">Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className="mt-6">
        <BillsHorizontalBtn
          text="Transaction History"
          iconLeft={
            <FontAwesome name="history" size={18} color={primeryColor} />
          }
          func={handleTransactionHistory}
        />
        <BillsHorizontalBtn
          text="Add/Change Payment Method"
          iconLeft={
            <MaterialIcons name="payment" size={18} color={primeryColor} />
          }
          func={handleChangePaymentMethod}
        />
        <BillsHorizontalBtn
          text="Settings"
          iconLeft={<Fontisto name="wallet" size={18} color={primeryColor} />}
          func={handleWalletSettings}
        />
        <BillsHorizontalBtn
          text="Help/FAQ"
          iconLeft={
            <AntDesign name="question" size={18} color={primeryColor} />
          }
          func={handleFaq}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default TransactionScreen;
