import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

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

export default UserItem;