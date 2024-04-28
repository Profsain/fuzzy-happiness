import React from "react";
import { Modal, View, Text, Button } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import UserList from "./UserList";

const AddMemberModal = ({ visible, onClose, usersList }) => {
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <View>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ marginBottom: 10 }}
            />
            <UserList
              users={usersList}
              searchQuery={searchQuery}
              onToggle={handleToggleUser}
            />
          </View>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default AddMemberModal;
