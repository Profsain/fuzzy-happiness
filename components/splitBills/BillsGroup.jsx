import { View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { BackTopBar, HorizontalTitle } from "../home";
import EventGroupCard from "./component/EventGroupCard";

const BillsGroup = ({ navigation }) => {
  // handle device back btn
  const handleBack = () => {
    navigation.goBack();
  };

  // handle open group details
  const handleOpenGroupDetails = () => {
    // navigate to group details screen
    navigation.navigate("BillsDetails");
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Groups" func={handleBack} />

        <ScrollView>
          {/* recent section  */}
          <View className="mt-6">
            <HorizontalTitle title="Recent" action="" icon="" />
            <EventGroupCard func={handleOpenGroupDetails} />
          </View>

          {/* all group section  */}
          <View className="mt-6">
            <HorizontalTitle title="All Groups" action="" icon="" />
            <EventGroupCard
              eventName="House Party"
              func={handleOpenGroupDetails}
            />
            <EventGroupCard
              eventName="Glory Birthday"
              func={handleOpenGroupDetails}
            />
            <EventGroupCard
              eventName="Coding Hangout"
              func={handleOpenGroupDetails}
            />
            <EventGroupCard
              eventName="Go sportified"
              func={handleOpenGroupDetails}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BillsGroup;
