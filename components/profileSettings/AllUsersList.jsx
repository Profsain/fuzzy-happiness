import React, { useState, useCallback } from "react";
import { useLogin } from "../../context/LoginProvider";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { BackTopBar } from "../home";
import LoadingSpinner from "../LoadingSpinner";

const AllUsersList = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();

  // restricted accounts list
  const restrictedAccounts = userProfile.restrictedAccount || [];

  // component state
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // handle fetch all users excluding logged in user
  const fetchAllUsers = async () => {
    setLoading(true);
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
        // filter out restricted users
        const filteredData = data.filter(
          (user) => !restrictedAccounts.includes(user._id)
        );
        // update state
        setLoading(false);
        setUserList(filteredData);
      } else {
        console.log("Failed to fetch users");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("An error occurred while fetching users", error);
    }
  };

  // call fetch
  useFocusEffect(
    useCallback(() => {
      fetchAllUsers();
    }, [])
  );

  // handle add account
  const restrictAccount = async (restrictedUserId) => {
    const userId = userProfile._id;

    try {
      const response = await fetch(`${baseUrl}/user/restricted-account`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, restrictedUserId }),
      });

      if (response.ok) {
        Alert.alert(
          "User Restricted",
          "The user has been restricted successfully."
        );
        // Remove the restricted user from the local userList state
        setUserList((prevList) =>
          prevList.filter((user) => user._id !== restrictedUserId)
        );
      } else {
        Alert.alert(
          "Failed to Restrict User",
          "There was a problem restricting the user."
        );
      }
    } catch (error) {
      console.log("An error occurred while restricting the user", error);
      Alert.alert("Error", "An error occurred while restricting the user.");
    }
  };

  // render user item
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
      <Text>
        {item.firstName} {item.lastName}
      </Text>
      <TouchableOpacity onPress={() => restrictAccount(item._id)}>
        <Text style={{ color: "red" }}>Restrict</Text>
      </TouchableOpacity>
    </View>
  );

  // filter user list based on search query
  const filteredUserList = userList.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View className="px-6">
        <BackTopBar headline="My Connections" icon2="" func={handleBackBtn} />
      </View>

      <View className="flex-row justify-between items-center mt-8 px-6">
        <TouchableOpacity>
          <Text className="text-slate-500 font-bold"></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBackBtn}>
          <Text className="text-slate-500 font-bold">Close</Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 mt-5">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search users..."
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
      </View>

      <View style={{ flex: 1 }} className="px-6">
        {loading ? (
          <LoadingSpinner />
        ) : filteredUserList.length === 0 ? (
          <Text>No connections found</Text>
        ) : (
          <FlatList
            data={filteredUserList}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllUsersList;
