import { Image, Text, View, SafeAreaView, FlatList, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import { Box } from "@gluestack-ui/themed";
import { SearchBox } from "../components";
import { EventCard, HomeCarousel, HorizontalTitle } from "../components/home";
import eventData from "../mockdata/eventData";

const HomeScreen = () => {
  const limit = 30;
  // sort events by date
  eventData.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  // filter upcoming events and open events
  const upcomingEvents = eventData.filter(
    (event) => event.isEventOpen && event.isUpComingEvent
  );
  const limitedUpcomingEvents = upcomingEvents.slice(0, limit);

  // handle view all events
  const handleViewAllEvents = () => {
    Alert.alert("View all events");
  };

  // filter popular events
  const popularEvents = eventData.filter(
    (event) => event.isEventOpen && event.isEventPopular
  );
  const limitedPopularEvents = popularEvents.slice(0, limit);

  // handle view all popular events
  const handleViewAllPopularEvents = () => {
    Alert.alert("View all popular events");
  };

  // handle open event details
  const handleOpenSingleEvent = (id) => {
    // convert id to string
    id = id.toString();
    Alert.alert("Event ID", id)
  }

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* Top bar */}
      <Box>
        <View className="flex flex-row justify-between ">
          <Text className="font-4xl font-semibold">Hello Pascal</Text>
          <View>
            <Ionicons name="notifications" size={24} color="black" />
          </View>
        </View>
        {/* search bar */}
        <SearchBox mt={14} mb={18} />
      </Box>

      <ScrollView>
        {/* carousel section */}
        <Box mt={8}>
          <HomeCarousel />
        </Box>

        {/* Event section */}
        <Box mt={24}>
          {/* upcoming events */}
          <Box>
            <HorizontalTitle func={handleViewAllEvents} />
            <View>
              <FlatList
                data={limitedUpcomingEvents}
                renderItem={({ item }) => (
                  <EventCard
                    img={item.eventImage}
                    category={item.eventCategory}
                    title={item.eventName}
                    location={item.eventLocation}
                    date={item.eventDate}
                    time={item.eventTime}
                    func={() => handleOpenSingleEvent(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Box>
          {/* popular events */}
          <Box>
            <HorizontalTitle
              title="Popular Event"
              func={handleViewAllPopularEvents}
            />
            <View>
              <FlatList
                data={limitedPopularEvents}
                renderItem={({ item }) => (
                  <EventCard
                    img={item.eventImage}
                    category={item.eventCategory}
                    title={item.eventName}
                    location={item.eventLocation}
                    date={item.eventDate}
                    time={item.eventTime}
                    func={() => handleOpenSingleEvent(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
