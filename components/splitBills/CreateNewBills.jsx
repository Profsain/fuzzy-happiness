import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";

import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from "../../store/eventSlice";
import {fetchUsersByIds, selectAllUsers } from "../../store/fetchUsersByIdSlice";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { primeryColor } from "../../utils/appstyle";
import MembersRowCard from "./component/MembersRowCard";
import RNPickerSelect from "react-native-picker-select";

const CreateNewBills = ({navigation}) => {
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
      setEventCost("$" + event.eventCost || 0.0);
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

  // handle fetch all users excluding logged in user
  const [userList, setUserList] = useState([]);
  const fetchAllUsers = async () => {
    const userId = userProfile._id;

    try {
      const response = await fetch(`${baseUrl}/user/all-users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const data = await response.json();
        // update state
        setUserList(data);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.log("An error occurred while fetching users", error);
    }
  };
  // call fetch
  useEffect(() => {
    fetchAllUsers();
  }, [membersId]);

  // fetch all user and filter members
  // map through userList list and filter members
  const members = userList.filter((user) => membersId.includes(user._id));
  // alert(JSON.stringify(members));

  const [selectedMembers, setSelectedMembers] = useState([]);

  // handle select and deselect members
  const toggleMemberSelection = (memberId) => {
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.includes(memberId)
        ? prevSelectedMembers.filter((id) => id !== memberId)
        : [...prevSelectedMembers, memberId]
    );
  };

  // set split percentage based on the number of selected members
  useEffect(() => {
    if (selectedMembers.length > 0) {
      const percent = 100 / selectedMembers.length;
      setSplitPercentage(percent);
    } else {
      setSplitPercentage(0);
    }
  }, [selectedMembers]);

  // handle create new bill
  const handleCreateNewBill = async () => {
    if (!selectedEvent) {
      Alert.alert("Error", "Please select an event.");
      return;
    }

    if (selectedMembers.length === 0) {
      Alert.alert(
        "Error",
        "Please select at least one member to split the cost."
      );
      return;
    }

    // Prepare the split percentages
    const splitPercentages = {};
    selectedMembers.forEach((memberId) => {
      splitPercentages[memberId] = 100 / selectedMembers.length;
    });

    // Prepare the request body
    const requestBody = {
      splitPercentages,
    };

    try {
      const response = await fetch(
        `${baseUrl}/event/split-cost/${selectedEvent}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Event cost split successfully.");
        // clear form state
        setSelectedEvent(null);
        setEventCost("");
        setEventName("");
        setCreatedBy("");
        setSplitPercentage(0);
        setNote("");
        setSelectedMembers([]);

        // navigate to split bill screen
        dispatch(toggleOpenCreateNewBill());
      } else {
        Alert.alert(
          "Error",
          data.message || "An error occurred while splitting the cost."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while splitting the cost.");
      console.log(error);
    }
  };

  // event items
  const eventItems = events
    .filter((event) => !event.isEventCostSplitted)
    .map((event) => ({
      label: event.eventName,
      value: event._id,
    }));

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar
        headline="Create New Bill"
        func={() => navigation.goBack()}
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

          <View className="px-2 py-3 border border-slate-300 rounded-lg mb-4">
            <Text className="text-lg">{eventCost}</Text>
          </View>

          <CustomInput placeholder="Created by" inputValue={createdBy} />
          {/* show event split percent */}
          <View>
            {splitPercentage > 0 && (
              <Text className="mb-6 text-orange-400">
                {" "}
                Each members pays {splitPercentage}% of the event cost{" "}
              </Text>
            )}
          </View>

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

          {members.length === 0 && (
            <View>
              <Text className="text-lg font-bold text-orange-400">
                No members to split with.
              </Text>
              <Text className="mb-6 font-bold text-slate-500">
                Select event to split with members
              </Text>
            </View>
          )}
          <FlatList
            data={members}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MembersRowCard
                imgUrl={item.profileImg}
                memberName={`${item.firstName} ${item.lastName}`}
                memberId={item._id}
                toggleMemberSelection={toggleMemberSelection}
              />
            )}
          />
        </View>

        {/* create button */}
        <View className="flex justify-center items-center mt-8">
          <CustomButton label="Create" buttonFunc={handleCreateNewBill} />
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