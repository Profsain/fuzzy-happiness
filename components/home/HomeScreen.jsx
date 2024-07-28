import React, { useState, useEffect, useCallback } from "react";
import { useLogin } from "../../context/LoginProvider";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import { CustomButton, SearchBox, LoadingSpinner } from "..";
import {
  EventCard,
  HomeCarousel,
  HorizontalTitle,
  AllEvents,
  SingleEvent,
  CreateNewEvent,
  MySingleEvent,
  SearchResult,
} from ".";
import eventData from "../../mockdata/eventData";
import filterEventsByCreator from "../../utils/filterEventByUser";
import searchEvents from "../../utils/searchEvent";

const HomeScreen = ({ navigation }) => {
  const { userProfile, token } = useLogin();
  const baseUrl = process.env.BASE_URL;

  const [allEventsList, setAllEventsList] = useState([]);
  const [headText, setHeadText] = useState("Upcoming Events");

  const [state, setState] = useState({
    openAllEvents: false,
    openCreateEvent: false,
    openMySingleEvent: false,
    openSingleEvent: false,
    openEventRegister: false,
    eventList: [{}],
    myEventDetails: {},
    eventDetails: {},
    fetchEventData: [],
    myEvents: [],
    allAppEvents: [],
    eventsLoading: false,
    error: null,
    searchTerm: "",
    searchResults: [],
    searching: false,
  });

  // Fetch events
  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, eventsLoading: true }));
      try {
        const response = await fetch(`${baseUrl}/event`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const allEvents = [...data.events, ...eventData];
        setAllEventsList(allEvents);
        setState((prevState) => ({
          ...prevState,
          fetchEventData: data.events,
          allAppEvents: allEvents,
          myEvents: filterEventsByCreator(data.events, userProfile._id),
          eventsLoading: false,
        }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, eventsLoading: false }));
      }
    };

    fetchData();
  }, [token, userProfile._id]);

  // Handlers and other functions...

  // handle view my events
  const handleViewMyEvents = useCallback(() => {
    // filter login user events
    const myEvents = allEventsList.filter(
      (event) => event.eventCreator === userProfile._id
    );

    // navigate to all events screen and pass the event list
    navigation.navigate("AllEvents", {
      eventList: myEvents,
      headText: "My Events",
    });
  }, [allEventsList]);

  // handle view all events
  const handleViewAllEvents = useCallback(() => {
    // filter all events
    const filteredEvents = allEventsList
      .filter((event) => event.isOpen && new Date(event.eventDate) > new Date())
      .slice(0, 30);

    // navigate to all events screen and pass the event list
    navigation.navigate("AllEvents", {
      eventList: filteredEvents,
      headText: "Upcoming Events",
    });
  }, [allEventsList, headText]);

  // handle view all popular events
  const handleViewAllPopularEvents = () => {
    // filter all events
    const filteredEvents = allEventsList
      .filter((event) => event.isOpen && event.isPopular)
      .slice(0, 30);

    // navigate to all events screen and pass the event list
    navigation.navigate("AllEvents", {
      eventList: filteredEvents,
      headText: "Popular Events",
    });
  };

  // handle open single event
  const handleOpenSingleEvent = useCallback(
    (id) => {
      const event = allEventsList.find((event) => {
        // check if event._id is empty and use event.id
        if (event._id) {
          return event._id === id;
        } else {
          return event.id === id;
        }
      });

      navigation.navigate("SingleEvent", { eventDetails: event });
    },
    [allEventsList]
  );

  // handle create new event
  const handleCreateNewEvent = useCallback(() => {
    // navigate to CreateNewEvent screen
    navigation.navigate("CreateNewEvent");
  }, []);

  // handle search term change
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // search events
  useEffect(() => {
    if (searchTerm) {
      setSearching(true);

      const results = searchEvents(allEventsList, searchTerm);

      // check if results is empty
      if (results.length > 0) {
        setSearchResults(results);
        setSearching(false);
      } else {
        setSearchResults([]);
        setSearching(false);
      }
    } else {
      setSearchResults([]);
      setSearching(false);
    }
  }, [searchTerm, allEventsList]);

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* Top bar */}
      <Box>
        <View className="flex flex-row justify-between">
          <Text className="font-4xl font-semibold">
            Hello {userProfile.firstName || "User"}
          </Text>
          <View>
            <Ionicons name="notifications" size={24} color="black" />
          </View>
        </View>
        {/* Search bar */}
        <SearchBox
          handleSearch={handleSearchTermChange}
          searchTerm={searchTerm}
          mt={14}
          mb={18}
        />
      </Box>

      {/* Search result list */}
      {searching && <LoadingSpinner text="Searching..." />}
      {/* if searchResult empty */}
      {searchResults.length === 0 && searchTerm && !searching && (
        <Text className="text-lg">No search results found</Text>
      )}
      {searchResults.length > 0 ? (
        <SearchResult
          eventList={searchResults}
          headlineText="Search Results"
        />
      ) : (
        <ScrollView>
          {/* Carousel section */}
          <Box mt={8}>
            <HomeCarousel func={handleViewAllEvents} />
          </Box>

          {/* Create event button */}
          <Box mt={18}>
            <CustomButton
              backgroundColor="#000"
              width={140}
              label="Create Event"
              buttonFunc={handleCreateNewEvent}
            />
          </Box>

          {/* Event sections */}
          <Box mt={10}>
            {/* My events list */}
            {state.myEvents && state.myEvents.length > 0 && (
              <Box>
                <HorizontalTitle title="My Events" func={handleViewMyEvents} />
                {state.eventsLoading && <LoadingSpinner text="" />}
                <View>
                  <FlatList
                    data={state.myEvents}
                    renderItem={({ item }) => (
                      <EventCard
                        img={
                          item.eventImage
                            ? item.eventImage
                            : "https://images.unsplash.com/photo-1607827448387-a67db1383b59?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        category={item.eventCategory}
                        title={item.eventName}
                        location={item.eventLocation}
                        date={item.eventDate}
                        time={item.eventTime}
                        func={() => handleOpenSingleEvent(item._id)}
                      />
                    )}
                    keyExtractor={(item) => item._id || item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </Box>
            )}

            {/* Upcoming events */}
            <Box>
              <HorizontalTitle title={headText} func={handleViewAllEvents} />
              {state.eventsLoading && <LoadingSpinner text="" />}
              <View>
                <FlatList
                  data={state.allAppEvents
                    .filter(
                      (event) =>
                        event.isOpen && new Date(event.eventDate) > new Date()
                    )
                    .slice(0, 30)}
                  renderItem={({ item }) => (
                    <EventCard
                      img={item.eventImage}
                      category={item.eventCategory}
                      title={item.eventName}
                      location={item.eventLocation}
                      date={item.eventDate}
                      time={item.eventTime}
                      func={() => handleOpenSingleEvent(item.id || item._id)}
                    />
                  )}
                  keyExtractor={(item) => item.id || item._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </Box>

            {/* Popular events */}
            <Box>
              <HorizontalTitle
                title="Popular Events"
                func={handleViewAllPopularEvents}
              />
              {state.eventsLoading && <LoadingSpinner text="" />}
              <View>
                <FlatList
                  data={state.allAppEvents
                    .filter((event) => event.isOpen && event.isPopular)
                    .slice(0, 30)}
                  renderItem={({ item }) => (
                    <EventCard
                      img={item.eventImage}
                      category={item.eventCategory}
                      title={item.eventName}
                      location={item.eventLocation}
                      date={item.eventDate}
                      time={item.eventTime}
                      func={() => handleOpenSingleEvent(item.id || item._id)}
                    />
                  )}
                  keyExtractor={(item) => item.id || item._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </Box>
          </Box>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
