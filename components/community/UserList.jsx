import React from "react";
import { FlatList } from "react-native";
import UserItem from "./UserItem";

const UserList = ({ users, searchQuery, onToggle }) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FlatList
      data={filteredUsers}
      renderItem={({ item }) => <UserItem user={item} onToggle={onToggle} />}
      keyExtractor={(item) => item.id}
    />
  );
};
