import React from "react";
import { Modal, View, Text, Button } from "react-native";
import { useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import { TextInput } from "react-native";
import UserList from "./UserList";

const AddMemberModal = ({ visible, onClose }) => {
    const { communityMembers, setCommunityMembers } = useLogin();
    const [searchQuery, setSearchQuery] = useState("");

    const handleToggleUser = (userId, isSelected) => {
      if (isSelected) {
        setCommunityMembers((prevSelectedUsers) => [
          ...prevSelectedUsers,
          userId,
        ]);
      } else {
        setCommunityMembers((prevSelectedUsers) =>
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
          className="w-full h-full bg-white p-4 rounded-lg overflow-y-auto"
        >
          <View>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ marginBottom: 10 }}
            />
            <UserList
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
