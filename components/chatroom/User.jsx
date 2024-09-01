import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

const User = ({ item, setUserList, userList }) => {
  // navigation
  const navigation = useNavigation();

  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;

  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  useEffect(() => {
    // fetch pending friends requests
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/user/friend-request/${userId}`,
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
          setFriendRequests(data);
        } else {
          console.log("error", response.status);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    // fetch user friends connected
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/friends/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };

    fetchUserFriends();
  }, []);

  useEffect(() => {
    // fetch user sent friend requests
    const fetchUserSentRequest = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/user/sent-friend-request/${userId}`,
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
          setSentFriendRequests(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };

    fetchUserSentRequest();

    // call fetchUserSentRequest function after 10 seconds
    const interval = setInterval(() => {
      fetchUserSentRequest();
    }, 10000);
  }, []);

  // handle send friend request
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(`${baseUrl}/user/friend-request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  // handle friends accept request
  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(`${baseUrl}/user/friend-request/accept`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: friendRequestId,
          recipientId: userId,
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log("friend request accepted");
        setUserList(
          userList.filter((request) => request._id !== friendRequestId)
        );
      }
    } catch (err) {
      console.log("error accepting the friend request", err);
    }
  };

  // handle go to chat room
  const handleGoChatRoom = () => {
    const user = {
      friendId: item._id,
      friendName: item.firstName,
      friendImage: item.profileImg,
    };
    navigation.navigate("ChatRoom", { user });
  };

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{
            uri:
              item.profileImg ||
              "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1713381212~exp=1713384812~hmac=9db911ae74ca122c7bdd2eb2310c4a51f167567423c4aebcf59cf8b9a7c9f2f6&w=740",
          }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.firstName}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>
          {item?.emailAddress}
        </Text>
      </View>
      {userFriends.includes(item._id) ? (
        <Pressable
          onPress={handleGoChatRoom}
          style={{
            backgroundColor: "#f9784b",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Chat</Text>
        </Pressable>
      ) : requestSent ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          onPress={() => acceptRequest(item._id)}
          style={{
            backgroundColor: "#FBCEB1",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 13 }}>
            Accept
          </Text>
        </Pressable>
      ) : sentFriendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#FEEEE8",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "black", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#FBCEB1",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "black", fontSize: 13 }}>
            Connect
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
