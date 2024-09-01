import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import ConnectedFriend from "./ConnectedFriend";

const FriendsScreen = ({ userList }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();
  const [friends, setFriends] = useState([]);

  // fetch friend requests
  const fetchFriends = async () => {
    const userId = userProfile._id;
    try {
      const response = await fetch(`${baseUrl}/user/friends/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch friend requests");
      }

      const responseData = await response.json();

      // find the friend in the user list
      const friendsData = responseData.map((friend) => {
        // find the friend in the user list
        const found = userList.find((user) => user._id === friend);

        // create a new object with the friend data
        return {
          _id: found._id,
          name: found.firstName,
          email: found.emailAddress,
          image: found.profileImg,
        };
      });

      setFriends(friendsData);
    } catch (err) {
      console.log("error message", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <View>
      {friends.map((item, index) => (
        <ConnectedFriend key={index} item={item} />
      ))}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
