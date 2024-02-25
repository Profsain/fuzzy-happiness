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
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import DropdownSelectInput from "../DropdownSelectInput";
import DateModal from "./DateModal";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import TimeModal from "./TimeModal";
import { primeryColor, secondBgColor } from "../../utils/appstyle";

import handleValidation from "./inputValidation";

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

const CreateNewEvent = ({ setBack }) => {
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
  const [isAllValid, setIsAllValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [eventData, setEventData] = useState({
    eventName: "",
    eventLocation: "",
    eventDescription: "",
    eventUserRules: "",
    eventHashtags: "",
  });

  // handle eventData change
  const handleEventDataChange = (name, value) => {
    setEventData({ ...eventData, [name]: value });
    // handle form input validation
    if (
      eventData.eventName &&
      eventData.eventLocation &&
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

  // handle image upload
  const handleImageUpload = () => {
    Alert.alert("Image Upload to cloudinary to be implemented");
  };

  // handle date picker
  const handleDatePicker = () => {
    setShowDateModal(true);
  };

  // handle date picker
  const handleTimePicker = () => {
    setShowTimeModal(true);
  };

  // handle create new event
    const handleCreateNewEvent = () => {
        const formData = {
            ...eventData,
            eventDate,
            eventTime,
            eventCategory,
            eventImage,
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
          {/* image upload */}
          <View className="mt-8 mb-12">
            <Image
              source={
                eventImage
                  ? { uri: eventImage }
                  : require("../../assets/images/slider3.jpg")
              }
              className="w-full h-40 rounded-2xl"
            />

            {/* upload image btn */}
            <View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
              <TouchableOpacity onPress={handleImageUpload}>
                <Text className="text-sm">Change Image</Text>
              </TouchableOpacity>
            </View>
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
              <TextInput
                multiline={true}
                placeholder="Enter event rules"
                className="border-b-2 border-slate-100 mt-2 text-lg"
                value={eventData.eventUserRules}
                onChangeText={(text) =>
                  handleEventDataChange("eventUserRules", text)
                }
              />
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
                buttonFunc={handleCreateNewEvent}
              />
            ) : (
              <CustomButton
                label="Create Event"
                buttonFunc={handleCreateNewEvent}
              />
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
