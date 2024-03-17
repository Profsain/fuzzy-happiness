import {
  View,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOpenTransactionScreen,
  toggleOpenTransactionHistory,
  toggleOpenTopUpScreen,
} from "../../store/openScreenSlice";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import { BackTopBar } from "../home";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import TransactionHistory from "./TransactionHistory";
import AddMoney from "./AddMoney";

const TransactionScreen = () => {
  const dispatch = useDispatch();
  const openTransactionHistory = useSelector(
    (state) => state.openScreens.openTransactionHistory
  );
  const openTopUpScreen = useSelector(
    (state) => state.openScreens.openTopUpScreen
  );

  // handle back to prev screen when device back button press
  useBackHandler([() => dispatch(toggleOpenTransactionScreen())]);

  // handle make transaction
  const handleTransactionHistory = () => {
    dispatch(toggleOpenTransactionHistory());
  };

  // handle change payment method
  const handleChangePaymentMethod = () => {
    Alert.alert("payment method changed");
  };

  // handle invite members
  const handleWalletSettings = () => {
    Alert.alert("Wallet settings ");
  };

  // handle faq
  const handleFaq = () => {
    Alert.alert("FAQ");
  };

  return (
    <>
      {/* transaction history screen */}
      {openTransactionHistory ? (
        <TransactionHistory />
      ) : openTopUpScreen ? (
        <AddMoney />
      ) : (
        <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
          {/* top bar */}
          <BackTopBar
            headline="Wallet"
            func={() => dispatch(toggleOpenTransactionScreen())}
          />

          {/* top card */}
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
                    <Text className="mt-1 font-semibold text-xl">$700.00</Text>
                  </View>
                  <Text className="text-white font-normal text-xs">
                    14/11/2024
                  </Text>
                </View>
                {/* round button section */}
                <View className="flex flex-row justify-end mt-7">
                  <TouchableOpacity
                    className="flex items-center mr-3"
                    onPress={() => dispatch(toggleOpenTopUpScreen())}
                  >
                    <View className="bg-white p-1 rounded-full h-7 w-7 flex items-center justify-center">
                      <AntDesign name="pluscircleo" size={18} color="black" />
                    </View>
                    <Text className="font-semibold text-xs">Top up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex items-center mr-3">
                    <View className="bg-white p-1 rounded-full h-7 w-7 flex items-center justify-center">
                      <Fontisto name="arrow-swap" size={14} color="black" />
                    </View>
                    <Text className="font-semibold text-xs">Transfer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex items-center">
                    <View className="bg-white p-1 rounded-full h-7 w-7 flex items-center justify-center">
                      <AntDesign name="arrowdown" size={18} color="black" />
                    </View>
                    <Text className="font-semibold text-xs">Request</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* action button section */}
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
              text="Wallet Settings"
              iconLeft={
                <Fontisto name="wallet" size={18} color={primeryColor} />
              }
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default TransactionScreen;
