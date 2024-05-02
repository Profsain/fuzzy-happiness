import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOpenGroupDetails,
  toggleOpenTransactionScreen,
} from "../../store/openScreenSlice";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { BackHandler } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import { BackTopBar, HorizontalTitle } from "../home";
import MemberProfileCard from "./component/MemberProfileCard";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import TransactionScreen from "./TransactionScreen";

const BillsDetails = ({ eventName = "Karaoke" }) => {
  const dispatch = useDispatch();
  const openTransactionScreen = useSelector(
    (state) => state.openScreens.openTransactionScreen
  );

  // handle device back btn
  useBackHandler([() => dispatch(toggleOpenGroupDetails())]);

  // handle make transaction
  const handleMakeTransaction = () => {
    // toggle screen
    dispatch(toggleOpenTransactionScreen());
  };

  // handle set payment reminder
  const handleSetPaymentReminder = () => {
    Alert.alert("Set Payment reminder");
  };

  // handle invite members
  const handleInviteMembers = () => {
    Alert.alert("Invite Members");
  };

  return (
    <>
      {openTransactionScreen ? (
        <TransactionScreen />
      ) : (
        <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
          {/* top bar */}
          <BackTopBar
            headline=""
            func={() => dispatch(toggleOpenGroupDetails())}
          />

          {/* top card */}
          <View
            className=" rounded-lg my-6 p-6"
            style={{ backgroundColor: primeryColor }}
          >
            <View className="flex flex-row content-center justify-between items-center">
              <Text className="text-white font-medium text-base">
                {eventName}
              </Text>
              <Text className="text-white font-normal text-xs">14/11/2024</Text>
            </View>

            <View className="px-0">
              <View className="flex flex-row content-center items-center ">
                <Text className="font-normal pr-12">Bill Total</Text>
                <Text className="font-semibold text-base">$2100</Text>
              </View>
              <View className="flex flex-row content-center items-center ">
                <Text className="font-normal pr-8">Amount Due</Text>
                <Text className="font-semibold text-base">$300</Text>
              </View>
              <View className="flex flex-row content-center items-center mt-3">
                <Text className="font-xm">Plot 37, Kingsway Yaba</Text>
              </View>
            </View>
          </View>

          {/* group members section */}
          <View>
            <HorizontalTitle title="Members Expenses" action="" />

            {/* group members */}
            <View className="flex flex-row justify-between items-center mt-2">
              <MemberProfileCard />
              <MemberProfileCard
                name="Glory"
                imgUrl="https://img.freepik.com/free-photo/confident-african-businesswoman-mockup-psd-smiling-closeup-portr_53876-143279.jpg?t=st=1710456406~exp=1710460006~hmac=d227f46822c0ca646efe8e8ac42e41da7b8c1bdaeb6ebf5366bc60ddf48ab2ca&w=740"
              />
              <MemberProfileCard
                name="Winford"
                status="Paid"
                imgUrl="https://img.freepik.com/free-photo/portrait-young-handsome-african-man-blue-wall_176420-2339.jpg?t=st=1710456494~exp=1710460094~hmac=48443a0598a0a4726258ab39cbd4f73941fb7e969f4757b4120f1f0ab1cd7a68&w=740"
              />
            </View>
          </View>

          {/* action button section */}
          <View className="mt-6rs-7y">
            <BillsHorizontalBtn
              text="Make new transaction"
              iconLeft={
                <FontAwesome
                  name="pencil-square-o"
                  size={18}
                  color={primeryColor}
                />
              }
              func={handleMakeTransaction}
            />
            <BillsHorizontalBtn
              text="Set Payment reminder"
              iconLeft={
                <AntDesign name="clockcircleo" size={18} color={primeryColor} />
              }
              func={handleSetPaymentReminder}
            />
            <BillsHorizontalBtn
              text="Invite Members"
              iconLeft={
                <Octicons name="share" size={18} color={primeryColor} />
              }
              func={handleInviteMembers}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default BillsDetails;
