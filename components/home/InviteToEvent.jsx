import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import InviteCard from "./InviteCard";

const users = [
  {
    id: 1,
    name: "John Doe",
    location: "New York",
    avatar:
      "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  },
  {
    id: 2,
    name: "Peter Gori",
    location: "Los Angeles",
    avatar:
      "https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg",
  },
  {
    id: 3,
    name: "Alice Smith",
    location: "Chicago",
    avatar:
      "https://t4.ftcdn.net/jpg/06/98/43/65/240_F_698436528_EBWhicfurAmO0I4Ci9JTsH5lmYuqCzCL.jpg",
  },
  // Add more user objects here...
  {
    id: 4,
    name: "Michael Johnson",
    location: "Houston",
    avatar:
      "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  },
  {
    id: 5,
    name: "Emily Brown",
    location: "San Francisco",
    avatar:
      "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  },
  {
    id: 6,
    name: "Robert Wilson",
    location: "Miami",
    avatar:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  },
  {
    id: 7,
    name: "Emma Martinez",
    location: "Dallas",
    avatar:
      "https://img.freepik.com/premium-photo/happy-asian-man-laptop-fist-celebration-winning-bonus-promotion-office-desk-portrait-excited-businessman-by-computer-good-news-victory-win-success-workplace_590464-192302.jpg",
  },
  {
    id: 8,
    name: "William Anderson",
    location: "Seattle",
    avatar:
      "https://t4.ftcdn.net/jpg/02/59/09/73/360_F_259097390_tkPAv7YXWLkOfwhCFGXRMsytRynOFkuz.jpg",
  },
  {
    id: 9,
    name: "Olivia Taylor",
    location: "Atlanta",
    avatar:
      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
  },
  {
    id: 10,
    name: "Daniel Garcia",
    location: "Phoenix",
    avatar:
      "https://t4.ftcdn.net/jpg/06/98/43/65/240_F_698436528_EBWhicfurAmO0I4Ci9JTsH5lmYuqCzCL.jpg",
  },
];

const BottomModal = ({ isVisible, onClose }) => {
  const translateY = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 800,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

    const renderUser = ({ item }) => <InviteCard user={item} />;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.modal}>
        <Text>Invite User to Join the Event</Text>
        <View>
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 400,
  },
});

export default BottomModal;
