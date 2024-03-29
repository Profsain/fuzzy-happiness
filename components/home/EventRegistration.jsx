import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import { primeryColor, secondBgColor } from "../../utils/appstyle";
import daysBetweenDates from "../../utils/getNumbersOfDays";
// send email function
// import sendEmail from "../../utils/sendEmail";

const EventRegistration = ({ setBack, setBackToAll, openAllEvents, event }) => {
  // login context
  const { userProfile, token } = useLogin();

  const { emailAddress, firstName, lastName } = userProfile;

  const headlineText = `Register for Event`;

  // form data
  const [isAllValid, setIsAllValid] = useState(false);
  const [isGetEventReminder, setIsGetEventReminder] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [eventData, setEventData] = useState({
    userName: `${firstName} ${lastName}`,
    emailAddress: emailAddress,
  });

  // format event days left
  const inDays = `In ${daysBetweenDates(event.eventDate)} days`;

  const handleValidation = () => {
    if (eventData.userName === "" || eventData.emailAddress === "") {
      setErrorMsg("All fields are required");
      setIsAllValid(false);
    } else {
      setErrorMsg("");
      setIsAllValid(true);
    }
  };

  // handle eventData change
  const handleEventDataChange = (name, value) => {
    setEventData({ ...eventData, [name]: value });

    handleValidation();
  };

  useEffect(() => {
    handleValidation();
  }, [eventData]);

  // handle back to prev screen
  const handleBack = () => {
    if (setBackToAll) {
      setBackToAll(() => !openAllEvents);
    } else if (setBack) {
      setBack((preState) => !preState);
    }
  };

    // handle event Registration
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMsg, setSubmitErrorMsg] = useState("");

  const handleEventRegistration = async () => {
    // set isSubmitting
    setIsSubmitting(true);

    const userId = userProfile._id;
    const eventId = event._id || event.id;
    const isAllowReminder = isGetEventReminder;

    try {
      const response = await fetch(
        `https://splinx-server.onrender.com/event/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            isAllowReminder,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setIsSubmitting(false);
        // send email
        // sendEmail(
        //   [eventData.emailAddress],
        //   "Event Registration",
        //   `Hello ${eventData.userName}, \n\nYou have successfully registered for ${event.eventName} event. \n\nThank you for registering.`
        // );
        // navigate back to event list
        handleBack();
        console.log("Success", data.message);
      } else {
        // Registration failed
        setSubmitErrorMsg(data.message);
        setIsSubmitting(false);
        console.log("Error", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar  */}
        <BackTopBar icon="" headline={headlineText} func={handleBack} />

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

            {/* event email */}
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
            <Text className="text-red-600 text-xs mt-4">{submitErrorMsg}</Text>
          </View>
         

          {/* register event button */}
          <View className="mt-8 mb-16">
            {!isAllValid ? (
              <CustomButton label="Register" backgroundColor={secondBgColor} />
            ) : (
              isSubmitting ? (
                <LoadingSpinner />
              ) : (
              <CustomButton
                label="Register"
                buttonFunc={handleEventRegistration}
                    />
              )
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EventRegistration;
