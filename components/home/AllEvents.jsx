import { View, Alert, SafeAreaView, FlatList } from "react-native";
import React, {useState} from "react";
import BackTopBar from "./BackTopBar";
import EventCard from "./EventCard";
import SingleEvent from "./SingleEvent";

const AllEvents = ({
  eventList,
  setBack,
  headlineText,
  openSingleEvent,
  setOpenSingleEvent,
  openEventRegister,
  setOpenEventRegister,
}) => {
  // state for event details
  const [eventDetails, setEventDetails] = useState({});
  // handle open event details
  const handleOpenSingleEvent = (id) => {
    // set event details
    const event = eventList.find((event) => event.id === id);
    setEventDetails(event);

    // set open single event to true
    setOpenSingleEvent(() => !openSingleEvent);
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
      {/* open single event */}
      {openSingleEvent ? (
        <SingleEvent
          setBack={setOpenSingleEvent}
          event={eventDetails}
          setOpenSingleEvent={setOpenSingleEvent}
          openEventRegister={openEventRegister}
          setOpenEventRegister={setOpenEventRegister}
        />
      ) : (
        <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
          {/* top bar  */}

          <BackTopBar headline={headlineText} func={setBack} />
          <View className="mt-8">
            <FlatList
              data={eventList}
              renderItem={renderEvents}
              keyExtractor={(item) => item.id || item._id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default AllEvents;
