import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from "../../store/eventSlice";
import { fetchUsersByIds, selectAllUsers } from "../../store/fetchUsersByIdSlice";
import { useLogin } from "../../context/LoginProvider";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { toggleOpenCreateNewBill } from "../../store/openScreenSlice";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { primeryColor } from "../../utils/appstyle";
import MembersRowCard from "./component/MembersRowCard";
import RNPickerSelect from "react-native-picker-select";

const CreateNewBills = () => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();

  const dispatch = useDispatch();

  // event state
  const userId = userProfile._id;
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  useEffect(() => {
    dispatch(fetchUserEvents(userId));
  }, [userId]);


  // form state
  const [selectedEvent, setSelectedEvent] = useState(null);
  // find selected event
  const event = events.find((event) => event._id === selectedEvent);
  const [eventCost, setEventCost] = useState("");
  const [eventName, setEventName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [splitPercentage, setSplitPercentage] = useState(0);
  const [note, setNote] = useState("");
  const [membersId, setMembersId] = useState([]);

  // check if event is selected and update form state
  useEffect(() => {
    if (event) {
      setEventCost(event.eventCost || 0.0);
      setEventName(event.eventName);
      setCreatedBy(userProfile.firstName + " " + userProfile.lastName);
      // event members id. This will be used to fetch members
      const userIds = event.eventMembers.map((member) => member.user);
      setMembersId(userIds);
    }
  }, [event]);

  // fetch members by id
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector((state) => state.users.status);
  const userError = useSelector((state) => state.users.error);
  // alert(JSON.stringify(userError));

  // fetch user info
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/fetch-users-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds: membersId }),
      });

      if (!response.ok) {
        throw new Error(JSON.stringify(response));
      }

      const data = await response.json();
      alert(JSON.stringify(data));
      return data.users;
    } catch (error) {
      alert(JSON.stringify(error));
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    if (membersId.length > 0) {
      // dispatch(fetchUsersByIds(membersId));
      fetchUsers();
    }
  }, [membersId]);

  const [selectedMembers, setSelectedMembers] = useState([]);

  // handle back to prev screen when device back button press
  useBackHandler([() => dispatch(toggleOpenCreateNewBill())]);

  // handle create new bill
  const handleCreateNewBill = () => {
    // check if user is subscriber
    // create new bill
    Alert.alert("create new bill");
  };

  // event items
  const eventItems = events.map((event) => ({
    label: event.eventName,
    value: event._id,
  }));

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar
        headline="Create New Bill"
        func={() => dispatch(toggleOpenCreateNewBill())}
      />

      <ScrollView>
        {/* create new bills section */}
        <View className="my-8 ">
          {/* check events and render in select input field  */}
          <RNPickerSelect
            onValueChange={(value) => setSelectedEvent(value)}
            items={eventItems}
            placeholder={{ label: "Select Event", value: null }}
            style={pickerSelectStyles}
          />

          <CustomInput placeholder="Event Name" inputValue={eventName} />

          <CustomInput placeholder="Total Amount" inputValue={eventCost} />

          <CustomInput placeholder="Created by" inputValue={createdBy} />

          <CustomInput
            placeholder="Split Percentage"
            keyboardType="numeric"
            inputValue={splitPercentage}
          />

          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Note"
            style={styles.textInput}
          />
        </View>

        {/* member list section to select from flatList scrollable*/}
        <View>
          <HorizontalTitle
            title="Select with whom to split"
            icon=""
            action=""
          />

          <MembersRowCard />
          <MembersRowCard
            imgUrl="https://img.freepik.com/free-photo/portrait-young-handsome-african-man-blue-wall_176420-2339.jpg?t=st=1710626498~exp=1710630098~hmac=96457b13d44d42d906ab4cc9429f68b45ed3670f33b4a7390f4181e0cd9a3bb1&w=826"
            memberName="Grace Pero"
          />
          <MembersRowCard
            imgUrl="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=826&t=st=1710626441~exp=1710627041~hmac=91402668e99223790db54de3553a9c5e61a11defabbb9e6e4ef0f16b28c1ce87"
            memberName="Fred James"
          />
          <MembersRowCard
            imgUrl="https://img.freepik.com/free-photo/carefree-relaxed-pretty-young-mixed-race-female-wearing-big-round-eyeglasses-smiling-broadly-feeling-excited-about-spending-vacations-abroad_273609-1260.jpg?t=st=1710626535~exp=1710630135~hmac=4733b7502db243a164e78fd0ae3c8da5edd2539cdd6e0da4879cd4b1239a357d&w=826"
            memberName="Ekemini Rico"
          />
        </View>

        {/* create button */}
        <View className="flex justify-center items-center mt-8">
          <CustomButton title="Create" onPress={handleCreateNewBill} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "100%",
    height: 150,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    textAlignVertical: "top",
  },
});

export default CreateNewBills;
