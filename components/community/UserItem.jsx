import React, { useState } from "react";
import {
  View,
  Image,
  Text,
} from "react-native";
import Checkbox from "expo-checkbox";
import { primeryColor} from "../../utils/appstyle";

const UserItem = ({ user, isChecked, onToggle }) => {
  const handleToggle = () => {
    onToggle(user._id, !isChecked);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }} key={user._id}>
      <Image
        source={{
          uri:
            user.profileImg ||
            "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740",
        }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text>{user.firstName}</Text>
      </View>
      <Checkbox value={isChecked} onValueChange={handleToggle} color={isChecked ? primeryColor : undefined} />
    </View>
  );
};
export default UserItem;