import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { CustomButton, CustomHeadings, CustomInput } from "../../components";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { secondaryColor, textColor, secondBgColor } from "../../utils/appstyle";
import initialToUpperCase from "../../utils/firstCharToUpperCase";
import handleListUpdate from "../../utils/handlyListUpdate";
import navigationToScreen from "../../utils/navigationUtil";
import useReceivedData from "../../hooks/useReceivedData";

// data import
import interestData from "../../mockdata/interest";
import hashtagsData from "../../mockdata/hashtags";

const UserProfileScreen = ({ navigation }) => {
  // received data from previous screen
  const { data } = useReceivedData();
  
  const [avatarUri, setAvatarUri] = useState(
    "https://i.ibb.co/qg4nZz0/avataricon.png"
  );
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");

  // render interest items
  const [bgColor, setBgColor] = useState(secondaryColor);
  const [color, setColor] = useState(textColor);
  const selectedColor = "#e9e9e9";
  const [interestList, setInterestList] = useState([]);

  // handle add and remove interest from interest list
  const handleInterest = (id) => {
    handleListUpdate(id, interestData, setInterestList);
  };
  const renderInterest = ({ item }) => (
    <CustomButton
      fSize={14}
      mr={8}
      width={94}
      label={initialToUpperCase(item.interest)}
      color={color}
      backgroundColor={
        interestList.some((interest) => interest.id === item.id)
          ? secondBgColor
          : secondaryColor
      }
      buttonFunc={() => handleInterest(item.id)}
    />
  );

  // render tags items
  const [tagList, setTagList] = useState([]);
  // handle add and remove interest from interest list
  const handleTag = (id) => {
    handleListUpdate(id, hashtagsData, setTagList);
  };
  const renderTags = ({ item }) => (
    <CustomButton
      fSize={14}
      mr={8}
      width={94}
      label={`#${initialToUpperCase(item.tag)}`}
      color={color}
      backgroundColor={
        tagList.some((interest) => interest.id === item.id)
          ? secondBgColor
          : secondaryColor
      }
      buttonFunc={() => handleTag(item.id)}
    />
  );

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handleBioChange = (text) => {
    setBio(text);
  };

  const handlePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleCreateAccount = () => {
    // send data to backend database
    // navigate to inviteFriends Screen
    navigationToScreen(navigation, "InviteFriendsScreen");
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <Box width="100%" justifyContent="center" p={24} pt={28}>
        <VStack space="2xl">
          {/* profile avatar */}
          <HStack space="2xl">
            <TouchableOpacity onPress={handlePhoto}>
              <Avatar size="xl" bgColor="#E0E0E0">
                <AvatarFallbackText>SS</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: avatarUri,
                  }}
                  alt="avatar"
                />
              </Avatar>
            </TouchableOpacity>
            <VStack mt={16}>
              <Heading size="sm">Ronald Richards</Heading>
              <Text size="sm">Lagos Nigeria</Text>
            </VStack>
          </HStack>
          {/* add age and bio */}
          <Box>
            <CustomInput
              placeholder="Add age"
              type="text"
              inputValue={age}
              handleTextChange={handleAgeChange}
              error={ageError}
              mb={24}
            />
            <CustomInput
              placeholder="Bio"
              type="text"
              inputValue={bio}
              handleTextChange={handleBioChange}
              error={bioError}
            />
          </Box>

          {/* interest section */}
          <Box>
            <CustomHeadings title="My Interests" />
            <FlatList
              data={interestData}
              renderItem={renderInterest}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={StyleSheet.columnWrapper}
            />
          </Box>

          {/* hash tags section */}
          <Box>
            <CustomHeadings title="Hashtags" />
            <FlatList
              data={hashtagsData}
              renderItem={renderTags}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={StyleSheet.columnWrapper}
            />
          </Box>

          {/* action button */}
          <CustomButton label="Create Account" buttonFunc={handleCreateAccount} />
        </VStack>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default UserProfileScreen;
