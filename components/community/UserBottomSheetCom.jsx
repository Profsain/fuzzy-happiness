import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BottomSheet, Text, Checkbox } from "react-native-paper";

const UserItem = ({ user, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(user.id, !isChecked);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <Image
        source={{ uri: user.profileImg }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text>{user.firstName}</Text>
      </View>
      <TouchableOpacity onPress={handleToggle}>
        <Checkbox checked={isChecked} />
      </TouchableOpacity>
    </View>
  );
};

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

const UserBottomSheetCom = ({ visible, onClose, users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleUser = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
    }
  };

  return (
    <BottomSheet visible={visible} onDismiss={onClose}>
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ marginBottom: 10 }}
        />
        <UserList
          users={users}
          searchQuery={searchQuery}
          onToggle={handleToggleUser}
        />
      </View>
    </BottomSheet>
  );
};

export default UserBottomSheetCom;
