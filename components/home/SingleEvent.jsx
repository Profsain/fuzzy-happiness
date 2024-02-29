import {
  View,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import EventRegistration from "./EventRegistration";
import { BackHandler } from "react-native";
// icons
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import formatDate from "../../utils/dateConverter";
import daysBetweenDates from "../../utils/getNumbersOfDays";
import useBackHandler from "../../hooks/useDeviceBackBtn";

const SingleEvent = ({
  event,
   openAllEvents,
  setBack,
  openEventRegister,
  setOpenEventRegister,
  setOpenSingleEvent,
}) => {
 // handle back to prev screen when device back button press
  const handleSingleBack = () => {
    setOpenSingleEvent(false);
    setOpenEventRegister(false);
  }
  // use custom device back btn hook
  useBackHandler([handleSingleBack])


  const headlineText = `${event.eventCategory.substring(0, 20)} Event`;
  const inDays = `In ${daysBetweenDates(event.eventDate)} days`;

  // extract event details
  const { eventName, eventLocation, eventDate, eventTime, eventDescription } =
    event;

  // component state
  const [openEventsRegister, setOpenEventsRegister] = useState(false);

  // handle event registration
  const handleRegistration = () => {
    if (setOpenEventRegister) {
      setOpenEventRegister((prevState) => !prevState); // Toggle openEventRegister
    } else if (setOpenEventsRegister) {
      setOpenEventsRegister((prevState) => !prevState); // Toggle openEventsRegister
    }
  };

  // handle invite to event
  const handleInvite = () => {
    Alert.alert("Invite", "Invite sent successfully");
  };

  return (
    <>
      {/*  event registration form */}
      {openEventRegister || openEventsRegister ? (
        <EventRegistration
          event={event}
          openAllEvents={openAllEvents}
          setBack={setOpenEventRegister}
          setBackToAll={setOpenEventsRegister}
        />
      ) : (
        <ScrollView className="flex-1 px-6 pt-14 bg-white">
          {/* top bar  */}

          <BackTopBar headline={headlineText} func={setBack} />
          <View className="mt-8">
            <Image
              source={{ uri: event.eventImage }}
              className="w-full h-40 rounded-2xl"
            />

            {/* days left */}
            <View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
              <Text className="text-sm">{inDays}</Text>
            </View>

            {/* event name */}
            <View className="mt-4">
              <Text className="text-xl font-semibold">{eventName}</Text>
            </View>

            {/* action button */}
            <View className="mt-4 flex justify-start flex-row">
              <View>
                <CustomButton
                  mr={14}
                  width={110}
                  label="Register"
                  buttonFunc={handleRegistration}
                />
              </View>
              <View>
                <CustomButton
                  width={90}
                  label="Invite"
                  buttonFunc={handleInvite}
                />
              </View>
            </View>

            {/* event details */}
            <View className="mt-4">
              <View className="flex flex-row items-center">
                <View className="border p-2 rounded-lg border-gray-400 w-10 h-10 text-center">
                  <Fontisto name="date" size={18} color="black" />
                </View>
                <View>
                  <Text className="ml-4">{formatDate(eventDate)}</Text>
                  <Text className="ml-4">{eventTime}</Text>
                </View>
              </View>

              <View className="flex flex-row items-center mt-3">
                <View className="border p-2 rounded-lg border-gray-400 w-10 h-10 text-center">
                  <Fontisto name="map-marker-alt" size={18} color="black" />
                </View>
                <Text className="ml-6">{eventLocation}</Text>
              </View>

              <View className="flex flex-row items-center mt-3">
                <View className="border p-2 rounded-lg border-gray-400 w-10 h-10 text-center">
                  <FontAwesome5 name="rocketchat" size={18} color="black" />
                </View>
                <TouchableOpacity className="ml-4">
                  <Text>Register to Join Chat</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* about event  */}

            <View className="mt-4">
              <Text className="text-lg font-semibold">About Event</Text>
              <Text className="mt-2">{eventDescription}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default SingleEvent;
