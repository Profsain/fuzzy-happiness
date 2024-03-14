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

const AvatarStack = ({ hw = 18 }) => {
  const renderItem = ({ item }) => (
    <View style={styles.avatarContainer}>
      <Image source={{ uri: item.url }} style={{height: hw, width: hw, borderRadius: 25}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={avatars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
