import {
  View,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import EventRegistration from "./EventRegistration";
// icons
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import formatDate from "../../utils/dateConverter";
import daysBetweenDates from "../../utils/getNumbersOfDays";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import handleSocialShare from "../../utils/socialSharefunc";
import { Feather } from "@expo/vector-icons";
import { secondBgColor } from "../../utils/appstyle";

const SingleEvent = ({
  event,
  openAllEvents,
  setBack,
  openEventRegister,
  setOpenEventRegister,
  setOpenSingleEvent,
}) => {
  // get login user from context
  const { userProfile } = useLogin();

  // check if login user is an event members
  const [isEventMember, setIsEventMember] = useState(false);
  const checkEventMember = () => {
    if (userProfile) {
      const { eventMembers } = event;
      if (eventMembers.includes(userProfile._id)) {
        setIsEventMember(true);
      }
    }
    return false;
  };
  useEffect(() => {
    checkEventMember();
  }, []);

  // handle back to prev screen when device back button press
  const handleSingleBack = () => {
    setOpenSingleEvent(false);
    setOpenEventRegister(false);
  };
  // use custom device back btn hook
  useBackHandler([handleSingleBack]);

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

  // check if event is over
  const [isEventClose, setIsEventClose] = useState(false);
  const eventClosed = () => {
    if (daysBetweenDates(event.eventDate) <= 0) {
      setIsEventClose(true);
    }
  };

  useEffect(() => {
    eventClosed();
  }, []);

  // handle invite to event
  const handleShareEvent = () => {
    const appUrl = "https://www.google.com";
    const message = `Join me at ${eventName} event. Download the app to register and join the event ${appUrl}`;
    handleSocialShare(message);
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
        <View className="flex-1 px-6 pt-14 bg-white">
          {/* top bar  */}

          <BackTopBar headline={headlineText} func={setBack} />
          <View className="mt-8">
            <ScrollView>
              <Image
                source={{ uri: event.eventImage }}
                className="w-full h-40 rounded-2xl"
              />

              {/* days left */}
              <View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
                <Text className="text-sm">
                  {isEventClose ? "Closed" : inDays}
                </Text>
              </View>

              {/* event name */}
              <View className="mt-4">
                <Text className="text-xl font-semibold">{eventName}</Text>
              </View>

              {/* action button */}
              {isEventClose || isEventMember ? (
                <View className="mt-4 flex justify-start flex-row">
                  <View>
                    <CustomButton
                      mr={14}
                      width={110}
                      label="Register"
                      backgroundColor={secondBgColor}
                    />
                  </View>
                  <View>
                    <CustomButton
                      width={50}
                      height={50}
                      label={<Feather name="share" size={24} color="white" />}
                      bradius={100}
                      backgroundColor={secondBgColor}
                    />
                  </View>
                </View>
              ) : (
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
                      width={50}
                      height={50}
                      label={<Feather name="share" size={24} color="white" />}
                      bradius={100}
                      buttonFunc={handleShareEvent}
                    />
                  </View>
                </View>
              )}

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

              {/* event confirmation  */}
              {isEventMember && (
                <View className="mt-6 p-3 border-2 border-slate-400 rounded-xl">
                  <Text className="font-semibold pb-2">You're In!</Text>
                  <Text>A confirmation email has been sent to you email</Text>
                  <View className="flex flex-row items-center bg-green-600 rounded-md p-2 mt-2">
                    <AntDesign name="checkcircle" size={24} color="white" />
                    <Text className="text-white ml-3">
                      Thank you for registering
                    </Text>
                  </View>
                </View>
              )}

              {/* about event  */}
              <View className="mt-4 mb-24">
                <Text className="text-lg font-semibold">About Event</Text>
                <Text className="mt-2">{eventDescription}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default SingleEvent;
