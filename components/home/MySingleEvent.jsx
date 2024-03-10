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
import BottomModal from "./InviteToEvent";
import { primeryColor, secondBgColor } from "../../utils/appstyle";
// icons
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import formatDate from "../../utils/dateConverter";
import daysBetweenDates from "../../utils/getNumbersOfDays";
import handleSocialShare from "../../utils/socialSharefunc";
import { BackHandler } from 'react-native';
import { Feather } from "@expo/vector-icons";

const MySingleEvent = ({
  event,
  openAllEvents,
  setBack,
  openEventRegister,
  setOpenEventRegister,
  setOpenSingleEvent,
}) => {
  // handle back to prev screen when device back button press
   useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // const handleSingleBack = (setOpenSingleEvent, setOpenEventRegister) => {
  //   setOpenSingleEvent(false);
  //   setOpenEventRegister(false);
  // };
  // // use custom device back btn hook
  // useBackHandler;

  const headlineText = `${event.eventCategory.substring(0, 20)} Event`;
  const inDays = `In ${daysBetweenDates(event.eventDate)} days`;

  // extract event details
  const { eventName, eventLocation, eventDate, eventTime, eventDescription } =
    event;

  // component state
  const [openEventsRegister, setOpenEventsRegister] = useState(false);
  const [isEventClose, setIsEventClose] = useState(false);

  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // check if event is over
  const eventClosed = () => {
    if (daysBetweenDates(event.eventDate) <= 0) {
      setIsEventClose(true);
    }
  };

  useEffect(() => {
    eventClosed();
  }, []);

  // handle invite to event
  const handleInvite = () => {
    setShowActionsheet(!showActionsheet);
  };

  // handle share event
  const handleShare = () => {
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
        <ScrollView className="flex-1 px-6 pt-14 bg-white">
          {/* top bar  */}

          <BackTopBar headline={headlineText} func={setBack} />
          <View className="mt-8">
            <Image
              source={{
                uri: event.eventImage
                  ? event.eventImage
                  : "https://images.unsplash.com/photo-1607827448387-a67db1383b59?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="w-full h-40 rounded-2xl"
            />

            {/* days left */}
            <View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
              <Text className="text-sm">
                {daysBetweenDates(event.eventDate) <= 0 ? "Closed" : inDays}
              </Text>
            </View>

            {/* event name */}
            <View className="mt-4">
              <Text className="text-xl font-semibold">{eventName}</Text>
            </View>

            {/* action button */}
            {isEventClose ? (
              <View className="mt-4 flex justify-start flex-row">
                <View>
                  <CustomButton
                    mr={14}
                    width={110}
                    label="Invite"
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
                    label="Invite"
                    buttonFunc={toggleModal}
                  />
                </View>
                <View>
                  <CustomButton
                    width={50}
                    height={50}
                    label={<Feather name="share" size={24} color="white" />}
                    buttonFunc={handleShare}
                    bradius={100}
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

            {/* about event  */}

            <View className="mt-4">
              <Text className="text-lg font-semibold">About Event</Text>
              <Text className="mt-2">{eventDescription}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* bottom modal  */}
      <BottomModal isVisible={isModalVisible} onClose={toggleModal} />
    </>
  );
};

export default MySingleEvent;
