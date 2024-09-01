import { View, SafeAreaView, Alert, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { BackTopBar, HorizontalTitle } from "../home";
import EventGroupCard from "./component/EventGroupCard";

const BillsGroup = ({ route, navigation }) => {
  // handle device back btn
  const handleBack = () => {
    navigation.goBack();
  };

  // extract userEvents from params
  const { userEvents } = route.params;

  // Sort userEvents based on createdAt date
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    const sorted = userEvents.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedEvents(sorted);
  }, [userEvents]);

  // handle open group details
  const handleOpenGroupDetails = () => {
    // navigate to group details screen
    navigation.navigate("BillsDetails");
  };

  // render event item
  const renderEventItem = ({ item }) => (
    <EventGroupCard
      key={item._id}
      eventId={item._id}
      eventName={item.eventName}
      eventDate={item.eventDate}
      eventCost={item.eventCost}
      eventLocation={item.eventLocation}
      func={() => handleOpenGroupDetails(item._id)}
    />
  );

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Groups" func={handleBack} />

        <ScrollView>
          {/* recent section */}
          <View className="mt-6">
            <HorizontalTitle title="Recent" action="" icon="" />
            {sortedEvents?.slice(0, 1).map((event) => (
              <EventGroupCard
                key={event._id}
                eventId={event._id}
                eventName={event.eventName}
                eventDate={event.eventDate}
                eventCost={event.eventCost}
                eventLocation={event.eventLocation}
                func={handleOpenGroupDetails}
              />
            ))}
          </View>

          {/* all group section */}
          <View className="mt-6">
            <HorizontalTitle title="All Groups" action="" icon="" />
            <FlatList
              data={sortedEvents}
              renderItem={renderEventItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BillsGroup;
