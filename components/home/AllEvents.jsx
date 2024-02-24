import { View, Alert, SafeAreaView, FlatList } from "react-native";
import React from "react";
import BackTopBar from "./BackTopBar";
import EventCard from "./EventCard";

const AllEvents = ({ eventList, setBack, headlineText }) => {
  const handleOpenSingleEvent = (id) => {
    Alert.alert("open single event", id.toString());
  };

  const renderEvents = ({ item }) => (
    <EventCard
      img={item.eventImage}
      category={item.eventCategory}
      title={item.eventName}
      location={item.eventLocation}
      date={item.eventDate}
      time={item.eventTime}
      func={() => handleOpenSingleEvent(item.id)}
    />
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar  */}

      <BackTopBar headline={headlineText} func={setBack} />
      <View className="mt-8">
        <FlatList
          data={eventList}
          renderItem={renderEvents}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllEvents;
