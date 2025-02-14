import React, { useState } from "react";
import { Modal, View, TextInput } from "react-native";
import { useLogin } from "../../context/LoginProvider";
import CustomButton from "../CustomButton";
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
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ width: "90%", height: "80%", backgroundColor: "white", borderRadius: 10, padding: 16 }}>
          {/* Search and User List - Takes available space */}
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 5 }}
            />
            <UserList searchQuery={searchQuery} onToggle={handleToggleUser} />
          </View>

          {/* Fixed Bottom Button */}
          <View style={{ position: "absolute", bottom: 20, left: 16, right: 16 }} className="px-8">
            <CustomButton label="Finish Adding" buttonFunc={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMemberModal;
