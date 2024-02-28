import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import { primeryColor, secondBgColor } from "../../utils/appstyle";
import daysBetweenDates from "../../utils/getNumbersOfDays";

const EventRegistration = ({ setBack, event }) => {
  const headlineText = `Register for Event`;

  // form data
  const [eventImage, setEventImage] = useState("");
  const [isAllValid, setIsAllValid] = useState(false);
  const [isGetEventReminder, setIsGetEventReminder] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [eventData, setEventData] = useState({
    userName: "",
    emailAddress: "",
    eventDescription: "",
  });

  // format event days left
  const inDays = `In ${daysBetweenDates(event.eventDate)} days`;

  // handle eventData change
  const handleEventDataChange = (name, value) => {
    setEventData({ ...eventData, [name]: value });
    // handle form input validation
    if (
      eventData.userName &&
      eventData.emailAddress &&
      eventData.eventDescription
    ) {
      setIsAllValid(true);
      setErrorMsg("");
    } else {
      setErrorMsg("All fields are required");
      setIsAllValid(false);
    }
  };

  // handle event Registration
  const handleEventRegistration = () => {
    const formData = {
      ...eventData,
    };
    console.log("Create new event", formData);
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar  */}
        <BackTopBar headline={headlineText} func={setBack} />

        {/* form input section */}
        <ScrollView className="mt-4">
          {/* top section */}
          <View className="mb-8">
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
              <Text className="text-xl font-semibold">{event.eventName}</Text>
            </View>
          </View>

          <View>
            {/* event name */}
            <View>
              <Text className="text-lg font-semibold">Your Name</Text>
              <TextInput
                multiline={true}
                placeholder="Enter your name"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.userName}
                onChangeText={(text) => handleEventDataChange("userName", text)}
              />
            </View>

            {/* event description */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Email</Text>
              <TextInput
                multiline={true}
                placeholder="Enter email address"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.emailAddress}
                onChangeText={(text) =>
                  handleEventDataChange("emailAddress", text)
                }
              />
            </View>

            {/* checkbox for get reminder notification */}
            <View className="flew items-center flex-row mt-4">
              <Checkbox
                className="mr-4 "
                color={isGetEventReminder ? primeryColor : undefined}
                value={isGetEventReminder}
                onValueChange={setIsGetEventReminder}
              />
              <Text className="text-lg font-semibold">Get reminder?</Text>
            </View>

            {/* error message */}
            <Text className="text-red-600 text-xs mt-4">{errorMsg}</Text>
          </View>

          {/* register event button */}
          <View className="mt-14 mb-16">
            {!isAllValid ? (
              <CustomButton label="Register" backgroundColor={secondBgColor} />
            ) : (
              <CustomButton
                label="Register"
                buttonFunc={handleEventRegistration}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EventRegistration;

