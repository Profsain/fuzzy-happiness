import { View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { toggleOpenAllGroup } from "../../store/openScreenSlice";
import { BackTopBar, HorizontalTitle } from "../home";
import EventGroupCard from "./component/EventGroupCard";

const BillsGroup = () => {
  const dispatch = useDispatch();
  // handle device back btn
  useBackHandler([() => dispatch(toggleOpenAllGroup())]);

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar
        headline="Groups"
        func={() => dispatch(toggleOpenAllGroup())}
      />

      <ScrollView>
        {/* recent section  */}
        <View className="mt-6">
          <HorizontalTitle title="Recent" action="" icon="" />
          <EventGroupCard />
        </View>

        {/* all group section  */}
        <View className="mt-6">
          <HorizontalTitle title="All Groups" action="" icon="" />
          <EventGroupCard eventName="House Party"/>
          <EventGroupCard eventName="Glory Birthday"/>
          <EventGroupCard eventName="Coding Hangout"/>
          <EventGroupCard eventName="Go sportified"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsGroup;
