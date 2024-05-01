import React from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";

const avatars = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    url: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
  },
  {
    id: 3,
    url: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  },
];

const defaultImg =
  "https://img.freepik.com/free-photo/medium-shot-young-people-having-fun-party_23-2151108194.jpg?t=st=1710406096~exp=1710409696~hmac=906914bcf854bf8683147a964e415c512e4a6f93a5fbc6b28a8b10f5157deb3d&w=740";

const AvatarStack = ({ hw = 18, images }) => {
  // limit images to 5, user images or avatars
  const dataToShow = images && images.length > 0 ? images.slice(0, 5) : avatars;
  const renderItem = ({ item }) => (
    <View style={styles.avatarContainer}>
      <Image
        source={{ uri: item.url || defaultImg}}
        style={{ height: hw, width: hw, borderRadius: 25 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToShow}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },

  avatarContainer: {
    marginLeft: -3,
  },
});

export default AvatarStack;
