import React, { useState, useCallback } from "react";
import { useLogin } from "../../context/LoginProvider";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { BackTopBar } from "../home";
import LoadingSpinner from "../LoadingSpinner";

const RestrictedAccount = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, setUserProfile, token } = useLogin();
  // restricted accounts list

  // component state
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  // handle fetch all users excluding logged in user
  const fetchAllUsers = async () => {
    setLoading(true);
    const userId = userProfile._id;

    try {
      const response = await fetch(
        `${baseUrl}/user/get-restricted-account/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        const data = await response.json();
        // update state
        setLoading(false);
        setUserList(data);
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

  // handle remove account
  const removeAccount = async (restrictedUserId) => {
    const userId = userProfile._id;

    try {
      const response = await fetch(
        `${baseUrl}/user/remove-restricted-account`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, restrictedUserId }),
        }
      );

      if (response.ok) {
        Alert.alert("User Restricted", "Restricted remove successfully.");

        // Remove the restricted user from the local userList state
        setUserList((prevList) =>
          prevList.filter((user) => user._id !== restrictedUserId)
        );
        
        // Update the userProfile state
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          restrictedAccount: prevProfile.restrictedAccount.filter(
            (id) => id !== restrictedUserId
          ),
        }));
      } else {
        Alert.alert(
          "Failed to remove Restrict User",
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
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      <Text>
        {item.firstName} {item.lastName}
      </Text>
      <TouchableOpacity onPress={() => removeAccount(item._id)}>
        <Text style={{ color: "red" }}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="My Connections" icon2="" func={handleBackBtn} />

      <View className="flex-row justify-between items-center mt-8">
        <TouchableOpacity>
          <Text className="text-slate-500 font-bold"></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AllUsersList")}>
          <Text className="text-slate-500 font-bold">Add</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 56, flex: 1 }}>
        {loading ? (
          <LoadingSpinner />
        ) : userList.length === 0 ? (
          <Text>No restricted account</Text>
        ) : (
          <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default RestrictedAccount;
