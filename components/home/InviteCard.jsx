import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { primeryColor, secondBgColor } from "../../utils/appstyle";

const InviteCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userLocation}>{user.location}</Text>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.buttonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    marginRight: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userLocation: {
    fontSize: 14,
    color: "#666666",
  },
  inviteButton: {
    backgroundColor: primeryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default InviteCard;
