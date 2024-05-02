import { View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { toggleOpenAllGroup, toggleOpenGroupDetails } from "../../store/openScreenSlice";
import { BackTopBar, HorizontalTitle } from "../home";
import EventGroupCard from "./component/EventGroupCard";
import BillsDetails from "./BillsDetails";

const BillsGroup = () => {
  const dispatch = useDispatch();
   const openGroupDetails = useSelector(
     (state) => state.openScreens.openGroupDetails
  );
  
  // handle device back btn
  useBackHandler([() => dispatch(toggleOpenAllGroup())]);

  return (
    <>
      {openGroupDetails ? (
        <BillsDetails />
      ) : (
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
              <EventGroupCard func={() => dispatch(toggleOpenGroupDetails())} />
            </View>

            {/* all group section  */}
            <View className="mt-6">
              <HorizontalTitle title="All Groups" action="" icon="" />
              <EventGroupCard eventName="House Party" func={() => dispatch(toggleOpenGroupDetails())}/>
              <EventGroupCard eventName="Glory Birthday" func={() => dispatch(toggleOpenGroupDetails())}/>
              <EventGroupCard eventName="Coding Hangout" func={() => dispatch(toggleOpenGroupDetails())}/>
              <EventGroupCard eventName="Go sportified" func={() => dispatch(toggleOpenGroupDetails())}/>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default BillsGroup;
