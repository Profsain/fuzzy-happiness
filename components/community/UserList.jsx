import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { FlatList } from "react-native";
import UserItem from "./UserItem";

const UserList = ({ searchQuery, onToggle }) => {
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;
  const [userList, setUserList] = useState([]);
  const { communityMembers } = useLogin();

  const fetchAllUsers = async () => {
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
  }, []);

  const filteredUsers = userList?.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <FlatList
      data={filteredUsers || userList}
      renderItem={({ item }) => (
        <UserItem
          user={item}
          isChecked={communityMembers.includes(item._id)}
          onToggle={onToggle}
        />
      )}
      keyExtractor={(item) => item._id}
    />
  );
};

export default UserList;