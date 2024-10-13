import React, { useState, useEffect, useCallback } from "react";
import { useLogin } from "../../context/LoginProvider";
import { FlatList, SafeAreaView, Text, View, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import { CustomButton, SearchBox, LoadingSpinner } from "..";
import { EventCard, HomeCarousel, HorizontalTitle, SearchResult } from ".";
import eventData from "../../mockdata/eventData";
import filterEventsByCreator from "../../utils/filterEventByUser";
import searchEvents from "../../utils/searchEvent";
import sortEventsByDate from "../../utils/sortEventsByDate";
import { ScrollView } from "react-native-virtualized-view";
// subscription
import SubscriptionModal from "../SubscriptionModal";
import useSubscription from "../../hooks/useSubscription";
import { primeryColor } from "../../utils/appstyle";
import { TouchableOpacity } from "react-native";
import TopAdvertCarousel from "./TopAdvertCarousel";

const HomeScreen = ({ navigation }) => {
  const {
    userProfile,
    token,
    setAllUsers,
    setPushNotification,
    pushNotification = [],
    setAdverts,
  } = useLogin();

  const { daysLeft, showTrialModal, isLocked, setShowTrialModal } =
    useSubscription(userProfile); // Use the subscription hook
  const [notRead, setNotRead] = useState(null);

  const baseUrl = process.env.BASE_URL;

  // Fetch all users and update context only if necessary
  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/user/get-all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllUsers(data); // Update context once
    } catch (error) {
      console.log(error);
    }
  }, [baseUrl, token, setAllUsers]);

  // fetch all adverts
  const fetchAdverts = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/advert`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        return;
      }
      const data = await response.json();
      setAdverts(data.data);
    } catch (error) {
      console.error("Fetch adverts error", error);
    }
  }, [baseUrl, token]);

  // fetch login user notification
  const fetchNotification = useCallback(async () => {
    try {
      const response = await fetch(
        `${baseUrl}/notification/${userProfile._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPushNotification(data.data); // Update context once
    } catch (error) {
      console.log(error);
    }
  }, [baseUrl, userProfile._id, token, setPushNotification]);

  useEffect(() => {
    fetchAllUsers();
    fetchAdverts();
  }, [fetchAllUsers, fetchAdverts]);

  // Call fetchNotification each time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchNotification();
    }, [fetchNotification])
  );

  // Update notRead count when pushNotification is updated
  useEffect(() => {
    if (pushNotification) {
      const unreadCount = pushNotification?.filter(
        (item) => item.read === false
      );
      setNotRead(unreadCount.length);
    }
  }, [pushNotification]);

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
          allAppEvents: sortEventsByDate(allEvents),
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

  // subscription modal
  const handleSubscribe = () => {
    // Navigate to subscription screen
    navigation.navigate("MembershipScreen");
    // setShowTrialModal(false);
  };

  // handle notification
  const handleNotification = () => {
    // Navigate to notification screen
    navigation.navigate("PushNotification");
  };

  // carousel switch
  const [currentCarousel, setCurrentCarousel] = useState(0); // 0: HomeCarousel, 1: TopAdvertCarousel

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle between 0 and 1 every minute
      setCurrentCarousel((prevCarousel) => (prevCarousel === 0 ? 1 : 0));
    }, 30000); // 1 minute (30,000 milliseconds)

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* { isLocked ? (
        <View className="flex-1 justify-center items-center">
          <Text>Your free trial has ended. Please subscribe to continue.</Text>
          <Button title="Subscribe" onPress={handleSubscribe} />
        </View>
      ) : ()} */}
      {/* Top bar */}
      <Box>
        <View className="flex flex-row justify-between">
          <Text className="font-4xl font-semibold">
            Hello {userProfile.firstName || "User"}
          </Text>
          <View>
            <TouchableOpacity onPress={handleNotification}>
              <View>
                {/* Notification Icon */}
                <Ionicons name="notifications" size={24} color="black" />

                {/* Badge to show unread notifications */}
                {notRead > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -6, // Adjust the position to fit the icon
                      top: -3, // Adjust the position to fit the icon
                      backgroundColor: primeryColor, // Use your primary color
                      borderRadius: 10, // Circular shape
                      width: 16, // Badge size
                      height: 16, // Badge size
                      justifyContent: "center", // Center the text inside the badge
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 6,
                        fontWeight: "bold",
                      }}
                    >
                      {notRead}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
        <Text className="text-lg my-28">No search results found</Text>
      )}
      {searchResults.length > 0 ? (
        <SearchResult
          eventList={sortEventsByDate(searchResults)}
          headlineText="Search Results"
        />
      ) : (
        <ScrollView>
          {/* Carousel section */}
          <Box mt={8}>
            {currentCarousel === 0 ? (
              <HomeCarousel func={handleViewAllEvents} />
            ) : (
              <TopAdvertCarousel />
            )}
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
                    data={sortEventsByDate(state.myEvents)}
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

      {/* Subscription modal */}
      <SubscriptionModal
        visible={showTrialModal}
        daysLeft={daysLeft}
        onSubscribe={handleSubscribe}
        onClose={() => setShowTrialModal(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
