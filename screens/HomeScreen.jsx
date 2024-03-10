// import { Text, View, SafeAreaView, FlatList, Alert } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useLogin } from "../context/LoginProvider";
// import { BackHandler } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { ScrollView } from "react-native-virtualized-view";
// import { Box } from "@gluestack-ui/themed";
// import { CustomButton, SearchBox, LoadingSpinner } from "../components";
// import {
//   EventCard,
//   HomeCarousel,
//   HorizontalTitle,
//   AllEvents,
//   SingleEvent,
//   CreateNewEvent,
//   SearchResult,
// } from "../components/home";
// import eventData from "../mockdata/eventData";
// import filterEventsByCreator from "../utils/filterEventByUser";
// import MySingleEvent from "../components/home/MySingleEvent";
// import searchEvents from "../utils/searchEvent";

// const HomeScreen = () => {
//   const { userProfile, token } = useLogin();

//   // switch screens
//   const [openAllEvents, setOpenAllEvents] = useState(false);
//   const [openCreateEvent, setOpenCreateEvent] = useState(false);
//   const [openMySingleEvent, setOpenMySingleEvent] = useState(false);
//   const [openSingleEvent, setOpenSingleEvent] = useState(false);
//   const [openEventRegister, setOpenEventRegister] = useState(false);
//   const [eventList, setEventList] = useState([{}]);
//   const [myEventDetails, setMyEventDetails] = useState({});
//   const [eventDetails, setEventDetails] = useState({});
//   const [headlineText, setHeadlineText] = useState("");
//   // fetch events
//   const [fetchEventData, setFetchEventData] = useState([]);
//   const [myEvents, setMyEvents] = useState([]);
//   const [allAppEvents, setAllAppEvents] = useState([]);
//   const [eventsLoading, setEventsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // fetch event data
//   useEffect(() => {
//     const fetchData = async () => {
//       setEventsLoading(true);
//       try {
//         const response = await fetch(
//           "https://splinx-server.onrender.com/event",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();
//         setFetchEventData(data.events);

//         // get all app events join with eventData
//         const allEvents = [...data.events, ...eventData];
//         setAllAppEvents(allEvents);
//         // get current user events
//         const userEvents = filterEventsByCreator(data.events, userProfile._id);
//         setMyEvents(userEvents);

//         setEventsLoading(false);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         //  setLoading(false);
//       }
//     };

//     fetchData();
//   }, [openCreateEvent]);

//   // set openAllEvents to false when device back button press
//   useEffect(() => {
//     const backAction = () => {
//       setOpenAllEvents(false);
//       setOpenSingleEvent(false);
//       setOpenCreateEvent(false);
//       setOpenEventRegister(false);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );
//     return () => backHandler.remove();
//   }, []);

//   // limit the number of events to display
//   const limit = 30;

//   // sort events by date
//   allAppEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

//   // filter upcoming events and open events
//   const upcomingEvents = allAppEvents.filter(
//     (event) => event.isOpen && new Date(event.eventDate) > new Date()
//   );

//   const limitedUpcomingEvents = upcomingEvents.slice(0, limit);

//   // handle view all events
//   const handleViewAllEvents = () => {
//     //set open all events to true
//     setOpenAllEvents(true);

//     // set headline
//     // set eventList
//     setHeadlineText("Upcoming Events");
//     setEventList(upcomingEvents);
//   };

//   // filter popular events
//   const popularEvents = allAppEvents.filter(
//     (event) => event.isOpen && event.isPopular
//   );
//   const limitedPopularEvents = popularEvents.slice(0, limit);

//   // handle view all popular events
//   const handleViewAllPopularEvents = () => {
//     //set open all events to true
//     setOpenAllEvents(true);

//     // set headline
//     // set eventList
//     setHeadlineText("Popular Events");
//     setEventList(popularEvents);
//   };

//   // handle open event details
//   const handleOpenSingleEvent = (id) => {
//     // set open single event to true
//     setOpenSingleEvent(() => !openSingleEvent);

//     // set event details
//     const event = allAppEvents.find((event) => {
//       if (event._id === id) {
//         return event;
//       } else {
//         return event.id === id;
//       }
//     });
//     setEventDetails(event);
//   };

//   // handle open event details
//   const handleOpenMySingleEvent = (id) => {
//     // set open single event to true
//     setOpenMySingleEvent(() => !openMySingleEvent);

//     // set event details
//     const event = myEvents.find((event) => event._id === id);
//     setMyEventDetails(event);
//   };

//   // handle create new event
//   const handleCreateNewEvent = () => {
//     setOpenCreateEvent(() => !openCreateEvent);
//   };

//   // handle search
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   useEffect(() => {
//     if (searchTerm) {
//       setSearching(true);
//       const results = searchEvents(allAppEvents, searchTerm);
//       setSearchResults(results);
//       setSearching(false);
//     }
//   }, [searchTerm]);

//   console.log("Search result", searchResults);

//   return (
//     <>
//       {openAllEvents ? (
//         <AllEvents
//           eventList={eventList}
//           setBack={setOpenAllEvents}
//           headlineText={headlineText}
//           openSingleEvent={openSingleEvent}
//           setOpenSingleEvent={setOpenSingleEvent}
//           setEventDetails={setEventDetails}
//           openEventRegister={openEventRegister}
//           setOpenEventRegister={setOpenEventRegister}
//         />
//       ) : openSingleEvent ? (
//         <SingleEvent
//           openAllEvents={openAllEvents}
//           setBack={setOpenSingleEvent}
//           event={eventDetails}
//           openEventRegister={openEventRegister}
//           setOpenSingleEvent={setOpenSingleEvent}
//           setOpenEventRegister={setOpenEventRegister}
//         />
//       ) : openCreateEvent ? (
//         <CreateNewEvent setBack={setOpenCreateEvent} />
//       ) : openMySingleEvent ? (
//         <MySingleEvent event={myEventDetails} setBack={setOpenMySingleEvent} />
//       ) : (
//         <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
//           {/* Top bar */}
//           <Box>
//             <View className="flex flex-row justify-between ">
//               <Text className="font-4xl font-semibold">
//                 Hello {userProfile.firstName || "User"}
//               </Text>
//               <View>
//                 <Ionicons name="notifications" size={24} color="black" />
//               </View>
//             </View>
//             {/* search bar */}
//             <SearchBox
//               setSearchTerm={setSearchTerm}
//               searchTerm={searchTerm}
//               mt={14}
//               mb={18}
//             />
//           </Box>

//           {/* search result list */}
//           {searching && <LoadingSpinner text="Searching..." />}
//           {searchResults.length > 0 ? (
//             <SearchResult
//               eventList={searchResults}
//               setBack={setOpenAllEvents}
//               headlineText="Search Results"
//               openSingleEvent={openSingleEvent}
//               setOpenSingleEvent={setOpenSingleEvent}
//               openEventRegister={openEventRegister}
//               setOpenEventRegister={setOpenEventRegister}
//             />
//           ) : (
//             <ScrollView>
//               {/* carousel section */}
//               <Box mt={8}>
//                 <HomeCarousel func={handleViewAllEvents} />
//               </Box>

//               {/* create event button */}
//               <Box mt={18}>
//                 <CustomButton
//                   backgroundColor="#000"
//                   width={140}
//                   label="Create Event"
//                   buttonFunc={handleCreateNewEvent}
//                 />
//               </Box>

//               {/* Event section */}
//               <Box mt={10}>
//                 {/* My events list*/}
//                 {myEvents && myEvents.length > 0 && (
//                   <Box>
//                     <HorizontalTitle
//                       title="My Events"
//                       func={handleViewAllEvents}
//                     />
//                     {eventsLoading && <LoadingSpinner text="" />}
//                     <View>
//                       <FlatList
//                         data={myEvents}
//                         renderItem={({ item }) => (
//                           <EventCard
//                             img={
//                               item.eventImage
//                                 ? item.eventImage
//                                 : "https://images.unsplash.com/photo-1607827448387-a67db1383b59?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                             }
//                             category={item.eventCategory}
//                             title={item.eventName}
//                             location={item.eventLocation}
//                             date={item.eventDate}
//                             time={item.eventTime}
//                             func={() => handleOpenMySingleEvent(item._id)}
//                           />
//                         )}
//                         keyExtractor={(item) => item._id}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                       />
//                     </View>
//                   </Box>
//                 )}

//                 {/* upcoming events */}
//                 <Box>
//                   <HorizontalTitle func={handleViewAllEvents} />
//                   {eventsLoading && <LoadingSpinner text="" />}
//                   <View>
//                     <FlatList
//                       data={limitedUpcomingEvents}
//                       renderItem={({ item }) => (
//                         <EventCard
//                           img={
//                             item.eventImage
//                               ? item.eventImage
//                               : "https://images.unsplash.com/photo-1607827448387-a67db1383b59?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                           }
//                           category={item.eventCategory}
//                           title={item.eventName}
//                           location={item.eventLocation}
//                           date={item.eventDate}
//                           time={item.eventTime}
//                           func={() =>
//                             handleOpenSingleEvent(item.id || item._id)
//                           }
//                         />
//                       )}
//                       keyExtractor={(item) => item.id || item._id}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                     />
//                   </View>
//                 </Box>

//                 {/* popular events */}
//                 <Box>
//                   <HorizontalTitle
//                     title="Popular Events"
//                     func={handleViewAllPopularEvents}
//                   />
//                   {eventsLoading && <LoadingSpinner text="" />}
//                   <View>
//                     <FlatList
//                       data={limitedPopularEvents}
//                       renderItem={({ item }) => (
//                         <EventCard
//                           img={
//                             item.eventImage
//                               ? item.eventImage
//                               : "https://images.unsplash.com/photo-1607827448387-a67db1383b59?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                           }
//                           category={item.eventCategory}
//                           title={item.eventName}
//                           location={item.eventLocation}
//                           date={item.eventDate}
//                           time={item.eventTime}
//                           func={() =>
//                             handleOpenSingleEvent(item.id || item._id)
//                           }
//                         />
//                       )}
//                       keyExtractor={(item) => item.id || item._id}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                     />
//                   </View>
//                 </Box>
//               </Box>
//             </ScrollView>
//           )}
//         </SafeAreaView>
//       )}
//     </>
//   );
// };

// export default HomeScreen;


import React, { useState, useEffect, useCallback } from "react";
import { useLogin } from "../context/LoginProvider";
import { BackHandler, FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import { CustomButton, SearchBox, LoadingSpinner } from "../components";
import { EventCard,
  HomeCarousel,
  HorizontalTitle,
  AllEvents,
  SingleEvent,
  CreateNewEvent,
  MySingleEvent,
  SearchResult,} from "../components/home";
import eventData from "../mockdata/eventData";
import filterEventsByCreator from "../utils/filterEventByUser";
// import MySingleEvent from "../components/home/MySingleEvent";
import searchEvents from "../utils/searchEvent";

const HomeScreen = () => {
  const { userProfile, token } = useLogin();

  const [state, setState] = useState({
    openAllEvents: false,
    openCreateEvent: false,
    openMySingleEvent: false,
    openSingleEvent: false,
    openEventRegister: false,
    eventList: [{}],
    myEventDetails: {},
    eventDetails: {},
    headlineText: "",
    fetchEventData: [],
    myEvents: [],
    allAppEvents: [],
    eventsLoading: false,
    error: null,
    searchTerm: "",
    searchResults: [],
    searching: false,
  });

  const handleViewAllEvents = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openAllEvents: true,
      headlineText: "Upcoming Events",
      eventList: prevState.allAppEvents.filter(
        (event) => event.isOpen && new Date(event.eventDate) > new Date()
      ).slice(0, 30),
    }));
  }, [state.allAppEvents]);

  const handleViewAllPopularEvents = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openAllEvents: !prevState.openAllEvents,
      headlineText: "Popular Events",
      eventList: prevState.allAppEvents.filter(
        (event) => event.isOpen && event.isPopular
      ).slice(0, 30),
    }));
  }, [state.allAppEvents]);

  const handleOpenSingleEvent = useCallback((id) => {
    const event = state.allAppEvents.find((event) => event._id === id);
    setState((prevState) => ({
      ...prevState,
      openSingleEvent: !prevState.openSingleEvent,
      eventDetails: event,
    }));
  }, [state.allAppEvents]);

  const handleOpenMySingleEvent = useCallback((id) => {
    const event = state.myEvents.find((event) => event._id === id);
    setState((prevState) => ({
      ...prevState,
      openMySingleEvent: !prevState.openMySingleEvent,
      myEventDetails: event,
    }));
  }, [state.myEvents]);

  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, eventsLoading: true }));
      try {
        const response = await fetch(
          "https://splinx-server.onrender.com/event",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const allEvents = [...data.events, ...eventData];
        setState((prevState) => ({
          ...prevState,
          fetchEventData: data.events,
          allAppEvents: allEvents,
          myEvents: filterEventsByCreator(data.events, userProfile._id),
          eventsLoading: false,
        }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error: error.message, eventsLoading: false }));
      }
    };

    fetchData();
  }, [token, userProfile._id]);

  const handleCreateNewEvent = useCallback(() => {
    console.log("Open me")
    setState((prevState) => ({ ...prevState, openCreateEvent: !prevState.openCreateEvent }));
    console.log(state.openCreateEvent)
  }, []);

  const handleSearchTermChange = useCallback((term) => {
    setState((prevState) => ({ ...prevState, searchTerm: term }));
  }, []);

  useEffect(() => {
    if (state.searchTerm) {
      setState((prevState) => ({ ...prevState, searching: true }));
      const results = searchEvents(state.allAppEvents, state.searchTerm);
      setState((prevState) => ({ ...prevState, searchResults: results, searching: false }));
    } else {
      setState((prevState) => ({ ...prevState, searchResults: [] }));
    }
  }, [state.searchTerm, state.allAppEvents]);

  return (
    <>
      {state.openAllEvents ? (
        <AllEvents
          eventList={state.eventList}
          setBack={(value) =>
            setState((prevState) => ({ ...prevState, openAllEvents: value }))
          }
          headlineText={state.headlineText}
          openSingleEvent={state.openSingleEvent}
          setOpenSingleEvent={(value) =>
            setState((prevState) => ({ ...prevState, openSingleEvent: value }))
          }
          setEventDetails={(event) =>
            setState((prevState) => ({ ...prevState, eventDetails: event }))
          }
          openEventRegister={state.openEventRegister}
          setOpenEventRegister={(value) =>
            setState((prevState) => ({
              ...prevState,
              openEventRegister: value,
            }))
          }
        />
      ) : state.openSingleEvent ? (
        <SingleEvent
          openAllEvents={state.openAllEvents}
          setBack={(value) =>
            setState((prevState) => ({ ...prevState, openSingleEvent: value }))
          }
          event={state.eventDetails}
          openEventRegister={state.openEventRegister}
          setOpenSingleEvent={(value) =>
            setState((prevState) => ({ ...prevState, openSingleEvent: value }))
          }
          setOpenEventRegister={(value) =>
            setState((prevState) => ({
              ...prevState,
              openEventRegister: value,
            }))
          }
        />
      ) : state.openCreateEvent ? (
        <CreateNewEvent
          setBack={(value) =>
            setState((prevState) => ({ ...prevState, openCreateEvent: value }))
          }
        />
      ) : state.openMySingleEvent ? (
        <MySingleEvent
          event={state.myEventDetails}
          setBack={(value) =>
            setState((prevState) => ({
              ...prevState,
              openMySingleEvent: value,
            }))
          }
        />
      ) : (
        <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
          {/* Top bar */}
          <Box>
            <View className="flex flex-row justify-between ">
              <Text className="font-4xl font-semibold">
                Hello {userProfile.firstName || "User"}
              </Text>
              <View>
                <Ionicons name="notifications" size={24} color="black" />
              </View>
            </View>
            {/* search bar */}
            <SearchBox
              setSearchTerm={handleSearchTermChange}
              searchTerm={state.searchTerm}
              mt={14}
              mb={18}
            />
          </Box>

          {/* search result list */}
          {state.searching && <LoadingSpinner text="Searching..." />}
          {state.searchResults.length > 0 ? (
            <SearchResult
              eventList={state.searchResults}
              setBack={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  openAllEvents: value,
                }))
              }
              headlineText="Search Results"
              openSingleEvent={state.openSingleEvent}
              setOpenSingleEvent={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  openSingleEvent: value,
                }))
              }
              openEventRegister={state.openEventRegister}
              setOpenEventRegister={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  openEventRegister: value,
                }))
              }
            />
          ) : (
            <ScrollView>
              {/* carousel section */}
              <Box mt={8}>
                <HomeCarousel func={handleViewAllEvents} />
              </Box>

              {/* create event button */}
              <Box mt={18}>
                <CustomButton
                  backgroundColor="#000"
                  width={140}
                  label="Create Event"
                  buttonFunc={handleCreateNewEvent}
                />
              </Box>

              {/* Event section */}
              <Box mt={10}>
                {/* My events list*/}
                {state.myEvents && state.myEvents.length > 0 && (
                  <Box>
                    <HorizontalTitle
                      title="My Events"
                      func={handleViewAllEvents}
                    />
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
                            func={() => handleOpenMySingleEvent(item._id)}
                          />
                        )}
                        keyExtractor={(item) => item._id || item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  </Box>
                )}

                {/* upcoming events */}
                <Box>
                  <HorizontalTitle func={() => handleViewAllEvents()} />
                  {state.eventsLoading && <LoadingSpinner text="" />}
                  <View>
                    <FlatList
                      data={state.allAppEvents
                        .filter(
                          (event) =>
                            event.isOpen &&
                            new Date(event.eventDate) > new Date()
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
                          func={() =>
                            handleOpenSingleEvent(item.id || item._id)
                          }
                        />
                      )}
                      keyExtractor={(item) => item.id || item._id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </Box>

                {/* popular events */}
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
                          func={() =>
                            handleOpenSingleEvent(item.id || item._id)
                          }
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
      )}
    </>
  );
};

export default HomeScreen;
