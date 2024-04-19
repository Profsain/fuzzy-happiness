import { View, Text, SafeAreaView, Alert, FlatList, ScrollView } from "react-native";
import { Fab, Box, FabIcon, FabLabel, EditIcon } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import {useLogin} from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import SearchBox from "../SearchBox";

import UserCard from "./UserCard";
import User from "./User";
import { secondaryColor, primeryColor } from "../../utils/appstyle";

const ChatList = ({navigation}) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();

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
  }
 
  // render user list
  const renderUser = ({ item }) => <User item={item} />;


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
        <ScrollView>
          <View>
            {userList.map((user) => (
              <UserCard
                key={user._id}
                userName={user.firstName}
                lastMessage="Hello there!"
                messageCount={user.friends.length}
                lastMessageTime="8:47 am"
                func={handleUserCardClick}
                profileImage={user.profileImg}
              />
            ))}
          </View>
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
