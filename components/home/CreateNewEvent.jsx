import {
  View,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import * as ImagePicker from "expo-image-picker";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import DropdownSelectInput from "../DropdownSelectInput";
import DateModal from "./DateModal";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import TimeModal from "./TimeModal";
import { primeryColor, secondBgColor } from "../../utils/appstyle";
import formatCurrency from "../../utils/formatCurrency";

import sendPushNotification from "../../utils/sendPushNotification";

// fetch event categories from an api
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://rapidapi-event-categories.onrender.com/event-categories"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Rethrow the error to be caught by the caller
  }
};

const CreateNewEvent = ({ navigation }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // handle back to prev screen
  const handleBack = () => {
    navigation.goBack();
  };

  const { token, userProfile } = useLogin();

  const headlineText = `Create New Event`;
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [listItems, setListItems] = useState([]);

  // fetch event categories and update listItems
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchData();
        setListItems(data);
      } catch (error) {
        console.log("Error fetching data");
      }
    };

    fetchCategories();
  }, []);

  // form data
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState("");
  const [isAllValid, setIsAllValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [eventData, setEventData] = useState({
    eventName: "",
    eventLocation: "",
    eventCost: "",
    eventDescription: "",
    eventUserRules: "",
    eventHashtags: "",
  });
  // event state
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newEvent, setNewEvent] = useState({});

  // handle eventData change
  const handleEventDataChange = (name, value) => {
    setEventData({ ...eventData, [name]: value });
    // handle form input validation
    if (
      eventData.eventName &&
      eventData.eventLocation &&
      eventData.eventCost &&
      eventData.eventDescription &&
      eventData.eventUserRules &&
      eventData.eventHashtags
    ) {
      setIsAllValid(true);
      setErrorMsg("");
    } else {
      setErrorMsg("All fields are required");
      setIsAllValid(false);
    }
  };

  // load event image from device
  const handleImageUpload = async () => {
    // set loading to true
    setLoading(true);

    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setEventImageUrl(result.assets[0].uri);

      // set loading to false
      setLoading(false);

      // upload photo to cloudinary
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
      let data = {
        file: base64Img,
        upload_preset: "hwebe1a7",
      };

      uploadPhoto(data);
    }

    if (result.canceled) {
      setLoading(false);
    }
  };

  // upload profile photo to cloudinary
  const uploadPhoto = async (data) => {
    let CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dvwxyofm2/image/upload";

    await fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();

        setEventImage(data.secure_url);
      })
      .catch((err) => console.log("err", err));
  };

  // handle date picker
  const handleDatePicker = () => {
    setShowDateModal(true);
  };

  // handle date picker
  const handleTimePicker = () => {
    setShowTimeModal(true);
  };

  // handle rule info
  const handleRuleInfo = () => {
    Alert.alert(
      "Event Rules",
      "Event rules are the guidelines that participants must follow during the event. It could include dress code, no smoking, no alcohol, etc."
    );
  };

  // handle event budget info
  const handleEventBudgetInfo = () => { 
    Alert.alert(
      "Event Budget",
      "The event budget is the total amount you plan to spend on the event, which will be split among the event participants. It includes costs such as the venue, food, drinks, entertainment, and more."
    );
  };

  // handle create new event
  const handleCreateNewEvent = () => {
    // set submitting to true
    setSubmitting(true);

    const formData = {
      ...eventData,
      eventDate,
      eventTime,
      eventCategory,
      eventImage,
      eventCreator: userProfile._id,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: "follow",
    };

    // handle create
    const createEvent = async () => {
      try {
        const response = await fetch(`${baseUrl}/event`, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        setNewEvent(result);

        // set submitting to false
        setSubmitting(false);

        const message = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #f9784b;">Splinx Event</h1>
        <p>Dear ${userProfile.firstName},</p>
        <p>You have successfully created an event ${formData.eventName} event, happening on ${formData.eventDate}.</p>
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
              email: userProfile.emailAddress,
              subject: "SplinX Planet Event ",
              html: message,
            }),
          }
        );

        if (emailResponse.ok) {
          await sendPushNotification(
            userProfile._id,
            "Splinx Planet",
            `${formData.eventName} created successful. Hurray!😍.`
          );
        } else {
          const emailError = await emailResponse.json();
          console.error("Email error:", emailError.message);
        }

        // navigate to previous screen
        Alert.alert("Success", "Event created successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("HomeScreen"),
          },
        ]);
      } catch (error) {
        Alert.alert("Error", "An error occurred, please try again");
        console.error("Error:", error);
        setSubmitting(false);
      }
    };

    createEvent();
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar  */}
        <BackTopBar headline={headlineText} func={handleBack} />

        {/* form input section */}
        <ScrollView className="mt-4">
          {/* image upload */}
          <View className="mt-8 mb-12">
            <Image
              source={
                eventImage
                  ? { uri: eventImageUrl }
                  : require("../../assets/images/slider3.jpg")
              }
              className="w-full h-40 rounded-2xl"
            />

            {/* upload image btn */}
            {loading ? (
              <View className="absolute right-4 top-32">
                <LoadingSpinner />
              </View>
            ) : (
              <View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
                <TouchableOpacity onPress={handleImageUpload}>
                  <Text className="text-sm">Change Image</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View>
            {/* event name */}
            <View>
              <Text className="text-lg font-semibold">Event Name</Text>
              <TextInput
                multiline={true}
                placeholder="Enter event name"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.eventName}
                onChangeText={(text) =>
                  handleEventDataChange("eventName", text)
                }
              />
            </View>

            {/* event location */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Event Location</Text>
              <TextInput
                multiline={true}
                placeholder="Enter event location"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.eventLocation}
                onChangeText={(text) =>
                  handleEventDataChange("eventLocation", text)
                }
              />
            </View>

            {/* event cost */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Event Cost</Text>
              <View className="flex flex-row items-center justify-between pr-4">
                <TextInput
                  multiline={true}
                  placeholder="Enter total budget for the event"
                  className="border-b-2 border-slate-100 mt-2 text-lg"
                  value={eventData.eventCost}
                  onChangeText={(text) =>
                    handleEventDataChange("eventCost", text)
                  }
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={handleEventBudgetInfo}>
                  <AntDesign
                    name="infocirlceo"
                    size={24}
                    color={primeryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* event date */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Event Date</Text>
              <View className="flex flex-row items-center justify-between pr-4">
                <Text className="flex-1 border-b-2 border-slate-100 mt-2 text-lg">
                  {eventDate.toString() || "Select event date"}
                </Text>
                <TouchableOpacity onPress={handleDatePicker}>
                  <Fontisto name="date" size={24} color={primeryColor} />
                </TouchableOpacity>
              </View>
            </View>

            {/* event time */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Event Time</Text>
              <View className="flex flex-row items-center justify-between pr-4">
                <Text className="flex-1 border-b-2 border-slate-100 mt-2 text-lg">
                  {eventTime.toString() || "Select event time"}
                </Text>
                <TouchableOpacity onPress={handleTimePicker}>
                  <AntDesign
                    name="clockcircleo"
                    size={24}
                    color={primeryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* event description */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Event Description</Text>
              <TextInput
                multiline={true}
                placeholder="Enter event description"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.eventDescription}
                onChangeText={(text) =>
                  handleEventDataChange("eventDescription", text)
                }
              />
            </View>

            {/* event rules */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">
                Set Your Event Rules
              </Text>
              <View className="flex flex-row items-center justify-between pr-4">
                <TextInput
                  multiline={true}
                  placeholder="Enter event rules"
                  className="border-b-2 border-slate-100 mt-2 text-lg"
                  value={eventData.eventUserRules}
                  onChangeText={(text) =>
                    handleEventDataChange("eventUserRules", text)
                  }
                />
                <TouchableOpacity onPress={handleRuleInfo}>
                  <AntDesign
                    name="infocirlceo"
                    size={24}
                    color={primeryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* event hashtags */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">Add Hashtags</Text>
              <TextInput
                multiline={true}
                placeholder="#birthday, #party, #dance"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.eventHashtags}
                onChangeText={(text) =>
                  handleEventDataChange("eventHashtags", text)
                }
              />
            </View>

            {/* select events category */}
            <View className="mt-4">
              <Text className="text-lg font-semibold">
                Select Event Category
              </Text>
              <DropdownSelectInput
                value={eventCategory}
                setValue={setEventCategory}
                listItems={listItems}
              />
            </View>

            {/* error message */}
            <Text className="text-red-600 text-xs mt-4">{errorMsg}</Text>
          </View>

          {/* create event button */}
          <View className="mt-14 mb-16">
            {!isAllValid ? (
              <CustomButton
                label="Create Event"
                backgroundColor={secondBgColor}
              />
            ) : (
              <View>
                {submitting ? (
                  <LoadingSpinner />
                ) : (
                  <CustomButton
                    label="Create Event"
                    buttonFunc={handleCreateNewEvent}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* date modal */}
      {showDateModal && (
        <DateModal
          setShowDateModal={setShowDateModal}
          showDateModal={showDateModal}
          date={eventDate}
          setDate={setEventDate}
        />
      )}

      {/* time modal */}
      {showTimeModal && (
        <TimeModal
          setShowTimeModal={setShowTimeModal}
          showTimeModal={showTimeModal}
          time={eventTime}
          setTime={setEventTime}
        />
      )}
    </>
  );
};

export default CreateNewEvent;
