import { View, SafeAreaView, FlatList, Text, Alert } from "react-native";
import React, { useState } from "react";
import BackTopBar from "./BackTopBar";
import EventCard from "./EventCard";

const AllEvents = ({ navigation, route }) => {
  // handle back to prev screen
  const handleBack = () => {
    navigation.goBack();
  }

  // extract route params
  const { headText, eventList } = route.params;
  // Alert.alert("eventList", JSON.stringify(eventList));
 
  // state for event details
  const [eventDetails, setEventDetails] = useState({});

  // handle open event details
  const handleOpenSingleEvent = (id) => {
    // set event details
    const event = eventList.find((event) => event.id === id);
    setEventDetails(event);
  
    // navigate to single event and pass event details
    navigation.navigate("SingleEvent", { eventDetails: event });
  };

  const renderEvents = ({ item }) => (
    <EventCard
      img={
        item.eventImage
          ? item.eventImage
          : "https://img.freepik.com/free-photo/medium-shot-people-with-vr-glasses_23-2150433375.jpg?t=st=1708723420~exp=1708727020~hmac=9096dbce4e7a09ca0c3d54e14edff136a83b68c1bbceb01e22626488aa8ca9db&w=740"
      }
      category={item.eventCategory}
      title={item.eventName}
      location={item.eventLocation}
      date={item.eventDate}
      time={item.eventTime}
      func={() => handleOpenSingleEvent(item.id)}
    />
  );

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar  */}

        <BackTopBar headline={headText} func={handleBack} />
        <View className="mt-8">

          {/* show message if no events */}
          {eventList.length === 0 && (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg">No events available</Text>
            </View>
          )}

          {/* show events */}
          <FlatList
            data={eventList}
            renderItem={renderEvents}
            keyExtractor={(item) => item.id || item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default AllEvents;
