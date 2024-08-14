import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomButton from "../CustomButton";
import { primeryColor } from "../../utils/appstyle";
import GroupBillsCard from "./component/GroupBillsCard";
import EventBillCard from "./component/EventBillCard";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import LoadingSpinner from "../LoadingSpinner";
import { useLogin } from "../../context/LoginProvider";

const BillsHome = ({ navigation }) => {
  const { userProfile, setUserProfile, token } = useLogin();
  const { isWalletCreated, phoneNumber, _id, currency, currencySymbol } = userProfile;
  // base url
  const baseUrl = process.env.BASE_URL;

  // component state
  const [processing, setProcessing] = useState(false);

  // handle activate wallet
  const handleActivateWallet = async () => {
    setProcessing(true);
    // create new wallet account
    try {
      const response = await fetch(`${baseUrl}/wallet/create-wallet/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // update userProfile context
        setUserProfile({ ...userProfile, isWalletCreated: true, walletAccountNumber: data.accountNumber });
        
        Alert.alert("Success", "Wallet account activated successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("TransactionScreen"),
          },
        ]);
        // Alert.alert("Wallet ", JSON.stringify(data));
        setProcessing(false);
      } else {
        const error = await response.json();
        Alert.alert("Error yy", JSON.stringify(error));
        setProcessing(false);
      }
    } catch (error) {
      Alert.alert("Error xx", JSON.stringify(error.message));
      setProcessing(false);
      throw new Error(error.message);
    }
  };
  // handle create new bill
  const handleCreateNewBill = () => {
    // navigate to create new bill screen
    navigation.navigate("CreateNewBills");
  };

  // handle pay someone
  const handlePaySomeone = () => {
    navigation.navigate("TransferMoney");
  };

  // handle request money
  const handleRequestMoney = () => {
    navigation.navigate("RequestPay");
  };

  // handle view all recent bills
  const handleRecentBills = () => {
    Alert.alert("View all recent bills");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar headline="Split Bills" icon="" />

      {/* top card */}
      <View
        style={{ backgroundColor: primeryColor }}
        className="p-3 pb-0 my-4 rounded-xl"
      >
        <Text className="text-xl font-semibold pb-2 text-slate-600">
          Total Spent
        </Text>
        <Text className="text-2xl font-bold text-slate-600">{currencySymbol || "$"}0.00</Text>

        <View className="flex flex-row justify-end mt-6">
          {isWalletCreated ? (
            <CustomButton
              color="black"
              width={60}
              height={34}
              fSize={12}
              mr={12}
              backgroundColor="white"
              label="Wallet"
              buttonFunc={() => navigation.navigate("TransactionScreen")}
            />
          ) : !processing ? (
            <CustomButton
              color="black"
              width={120}
              height={34}
              fSize={12}
              mr={12}
              backgroundColor="white"
              label="Activate Wallet"
              buttonFunc={handleActivateWallet}
            />
          ) : (
            <LoadingSpinner text="" color="white" />
          )}

          <CustomButton
            color="black"
            width={120}
            height={34}
            fSize={12}
            backgroundColor="white"
            label="Transaction History"
            buttonFunc={() => navigation.navigate("TransactionHistory")}
          />
        </View>
      </View>

      <ScrollView>
        {/* top group section, title header  */}
        <HorizontalTitle
          title="Groups"
          action="View all"
          func={() => navigation.navigate("BillsGroup")}
        />
        <View className="flex flex-row">
          <View className="h-24 w-24 bg-gray-200 rounded-2xl p-3 flex justify-center items-center">
            <TouchableOpacity
              onPress={handleCreateNewBill}
              className="bg-white p-3 rounded-full h-9 w-9 text-center mb-4"
            >
              <AntDesign
                name="plus"
                size={14}
                color="black"
                style={{ textAlign: "center", fontWeight: 900 }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10, fontWeight: 700 }}>
              Create new bill
            </Text>
          </View>
          {/* group bills card flatlist */}
          <GroupBillsCard func={() => navigation.navigate("BillsDetails")} />
          <GroupBillsCard func={() => navigation.navigate("BillsDetails")} />
        </View>

        {/* friends own section */}
        <View className="my-6 py-3 border rounded-md border-gray-300">
          <View className="flex flex-row px-4 justify-between content-center">
            <View>
              <Text className="text-xs leading-4 font-medium text-slate-500">
                Friends owe you
              </Text>
              <Text className="text-lg leading-7 font-medium -tracking-tighter text-slate-700">
                $0.00
              </Text>
            </View>
            <View>
              <Text className="text-xs leading-4 font-medium text-slate-500">
                You own friends
              </Text>
              <Text className="text-lg leading-7 font-medium -tracking-tighter text-slate-700">
                $0.00
              </Text>
            </View>
          </View>
          {/* horizontal button section */}
          <View>
            <BillsHorizontalBtn func={handlePaySomeone} />
            <BillsHorizontalBtn
              text="Request money"
              iconLeft={
                <AntDesign name="arrowleft" size={24} color={primeryColor} />
              }
              func={handleRequestMoney}
            />
          </View>
        </View>

        {/* recent bills section */}
        <HorizontalTitle
          title="Recent Bills"
          action="View all"
          func={handleRecentBills}
        />
        <View>
          <EventBillCard />
          <EventBillCard />
          <EventBillCard />
          <EventBillCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsHome;
