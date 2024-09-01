import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from "../../store/eventSlice";
import {
  fetchUsersByIds,
  selectAllUsers,
} from "../../store/fetchUsersByIdSlice";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { primeryColor } from "../../utils/appstyle";
import MembersRowCard from "./component/MembersRowCard";
import RNPickerSelect from "react-native-picker-select";
import LoadingSpinner from "../LoadingSpinner";

const CreateNewBills = ({ navigation }) => {
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const dispatch = useDispatch();

  const userId = userProfile._id;
  const events = useSelector((state) => state.events.events);
  useEffect(() => {
    dispatch(fetchUserEvents(userId));
  }, [userId]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const event = events.find((event) => event._id === selectedEvent);
  const [eventCost, setEventCost] = useState("");
  const [eventName, setEventName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [splitPercentage, setSplitPercentage] = useState(0);
  const [note, setNote] = useState("");
  const [membersId, setMembersId] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setEventCost("$" + event.eventCost || 0.0);
      setEventName(event.eventName);
      setCreatedBy(userProfile.firstName + " " + userProfile.lastName);
      const userIds = event.eventMembers.map((member) => member.user);
      setMembersId(userIds);
    }
  }, [event]);

  const users = useSelector(selectAllUsers);
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

      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.log("An error occurred while fetching users", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [membersId]);

  const members = userList.filter((user) => membersId.includes(user._id));
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMemberSelection = (memberId) => {
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.includes(memberId)
        ? prevSelectedMembers.filter((id) => id !== memberId)
        : [...prevSelectedMembers, memberId]
    );
  };

  useEffect(() => {
    if (selectedMembers.length > 0) {
      const percent = 100 / selectedMembers.length;
      setSplitPercentage(percent);
    } else {
      setSplitPercentage(0);
    }
  }, [selectedMembers]);

  const handleCreateNewBill = async () => {
    setLoading(true);

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

    const splitPercentages = {};
    selectedMembers.forEach((memberId) => {
      splitPercentages[memberId] = 100 / selectedMembers.length;
    });

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
        setLoading(false);

        Alert.alert("Success", "Event cost splitted successfully.");
        setSelectedEvent(null);
        setEventCost("");
        setEventName("");
        setCreatedBy("");
        setSplitPercentage(0);
        setNote("");
        setSelectedMembers([]);

        // navigate back to the previous screen
        navigation.goBack();
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

  const eventItems = events
    .filter((event) => !event.isEventCostSplitted)
    .map((event) => ({
      label: event.eventName,
      value: event._id,
    }));

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Create New Bill" func={() => navigation.goBack()} />
      <ScrollView>
        <View className="my-8 ">
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
          <View>
            {splitPercentage > 0 && (
              <Text className="mb-6 text-orange-400">
                {" "}
                Each member pays {splitPercentage}% of the event cost{" "}
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
                isSelected={selectedMembers.includes(item._id)}
                onSelect={() => toggleMemberSelection(item._id)}
              />
            )}
          />
        </View>
        <View className="flex justify-center items-center mt-8">
          {loading && <LoadingSpinner />}
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
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
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
