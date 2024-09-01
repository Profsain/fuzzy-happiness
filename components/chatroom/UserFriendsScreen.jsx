import { View, Text, SafeAreaView, Alert, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar, HorizontalTitle } from "../home";
import SearchBox from "../SearchBox";

import User from "./User";
import LoadingSpinner from "../LoadingSpinner";
import FriendsScreen from "./FriendsScreen";

const UserFriendsScreen = () => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();

  // component state
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

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
        // update state
        setLoading(false);
        setUserList(data);
      } else {
        console.log("Failed to fetch users");
        setLoading(false);
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

  // render user list
  const renderUser = ({ item }) => (
    <User item={item} setUserList={setUserList} userList={userList} />
  );

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="My Connect" icon="" />

        {/* search bar */}
        <View className="mt-4">
          <SearchBox
            searchTerm={searchTerm}
            handleSearch={handleSearchChange}
          />
        </View>

        <ScrollView>
          {/* All connected friends list */}
          <View>
            {/* horizontal headings */}
            <HorizontalTitle title="Connected Friends" action="" icon="" />
            {/* show loading spinner */}
            {loading && <LoadingSpinner />}

            {/* connected friends list */}
            <FriendsScreen userList={userList} />
          </View>

          {/* All users list */}
          <View>
            {/* horizontal headings */}
            <HorizontalTitle title="All Users" action="" icon="" />
            {/* show loading spinner */}
            {loading && <LoadingSpinner />}

            {/* user list */}
            {userList.length > 0 && (
              <View>
                <FlatList
                  data={userList}
                  renderItem={renderUser}
                  keyExtractor={(item, index) => index.toString()}
                  scroll={"vertical"}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UserFriendsScreen;
