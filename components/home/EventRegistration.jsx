import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import { primeryColor, secondBgColor } from "../../navigation/utils/appstyle";
import daysBetweenDates from "../../navigation/utils/getNumbersOfDays";
import sendPushNotification from "../../navigation/utils/sendPushNotification";

const EventRegistration = ({ navigation, route }) => {
  // login context
  const { userProfile, token } = useLogin();

  // extract event details
  const { eventDetails } = route.params;

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
  const inDays = `In ${daysBetweenDates(eventDetails.eventDate)} days`;

  // handle form validation
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
    navigation.goBack();
  };

  // handle event Registration
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMsg, setSubmitErrorMsg] = useState("");

  const handleEventRegistration = async () => {
    setIsSubmitting(true);

    const { _id: userId, firstName } = userProfile;
    const { _id: eventId, id, eventName, eventDate } = eventDetails;
    const isAllowReminder = isGetEventReminder;
    const eventID = eventId || id;

    try {
      const registrationResponse = await fetch(
        `${process.env.BASE_URL}/event/${eventID}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, isAllowReminder }),
        }
      );

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(errorData.message);
      }

      const message = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #f9784b;">Splinx Event Registration</h1>
        <p>Dear ${firstName},</p>
        <p>You have successfully registered for the ${eventName} event, happening on ${eventDate}.</p>
        <p>See you there!</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">Best regards,<br>SplinX Planet</p>
      </div>
    `;

      const emailResponse = await fetch(
        `${process.env.BASE_URL}/email/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: emailAddress,
            subject: "SplinX Planet Event Registration",
            html: message,
          }),
        }
      );

      if (emailResponse.ok) {
        await sendPushNotification(
          userId,
          "Splinx Planet",
          `${eventName} registration is successful. Hurray!😍.`
        );
      } else {
        const emailError = await emailResponse.json();
        console.error("Email error:", emailError.message);
      }

      setIsSubmitting(false);
      // show alert
      Alert.alert("Success", "Event registration successful", [
        {
          text: "OK",
          onPress: () => navigation.navigate("HomeScreen"),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      // show error message
      Alert.alert("Error", JSON.stringify(error.message));
      setSubmitErrorMsg(error.message);
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
              source={{ uri: eventDetails.eventImage }}
              className="w-full h-40 rounded-2xl"
            />

            {/* days left */}
            <View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
              <Text className="text-sm">{inDays}</Text>
            </View>

            {/* event name */}
            <View className="mt-4">
              <Text className="text-xl font-semibold">
                {eventDetails.eventName}
              </Text>
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
            ) : isSubmitting ? (
              <LoadingSpinner />
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
