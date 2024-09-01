import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { Fab, Box, FabIcon, FabLabel, EditIcon } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import SearchBox from "../SearchBox";

import UserChat from "./UserChat";
import { secondaryColor, primeryColor } from "../../utils/appstyle";
import LoadingSpinner from "../LoadingSpinner";

const ChatList = ({ navigation }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();

  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = userProfile._id;

  useEffect(() => {
    const acceptedFriendsList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/user/accepted-friends/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setLoading(false);
          setAcceptedFriends(data);
        }
      } catch (error) {
        setLoading(false);
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);

  // component state
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);

  // handle fetch all users excluding logged in user
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
  }, []);

  // handle search input change
  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  // handle user card click
  const handleUserCardClick = () => {
    Alert.alert("User card clicked");
  };

  // handle fab click
  const handleFab = () => {
    // navigate to UserFriendsScreen
    navigation.navigate("UserFriendsScreen");
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Chats      " icon="" />

        {/* search bar */}

        <View className="mt-4">
          <SearchBox
            searchTerm={searchTerm}
            handleSearch={handleSearchChange}
          />
        </View>

        {/* chat list */}
        
        {/* show loading spinner */}
        {loading && <LoadingSpinner />}

        {acceptedFriends.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-gray-500">
              No friends found. Connect with friends to chat.
            </Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable>
            {acceptedFriends.map((item, index) => (
              <UserChat key={index} item={item} />
            ))}
          </Pressable>
        </ScrollView>

        {/* floating action button */}
        <Box
          w={320}
          bg={secondaryColor}
          $dark-bg="$backgroundDark900"
          borderRadius="$md"
        >
          <Fab
            bg={primeryColor}
            size="md"
            placement="bottom right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            onPress={handleFab}
          >
            <FabIcon as={EditIcon} mr="$1" />
            <FabLabel>Chat</FabLabel>
          </Fab>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default ChatList;
