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
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
  LoadingSpinner,
} from "../../components";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { secondaryColor, textColor, secondBgColor } from "../../utils/appstyle";
import initialToUpperCase from "../../utils/firstCharToUpperCase";
import handleListUpdate from "../../utils/handleListUpdate";
import { useNavigation } from "@react-navigation/native";
import useReceivedData from "../../hooks/useReceivedData";

// data import
import interestData from "../../mockdata/interest";
import hashtagsData from "../../mockdata/hashtags";

// get device width
const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const ITEM_SIZE = width / COLUMN_COUNT;

const UserProfileScreen = () => {
  const baseUrl = process.env.BASE_URL;
  const navigation = useNavigation();
  const receivedData = useReceivedData();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { firstName, lastName, country, city } = receivedData;
  const [avatarUri, setAvatarUri] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [bgColor, setBgColor] = useState(secondaryColor);
  const [color, setColor] = useState(textColor);
  const [interestList, setInterestList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const handleInterest = (id) => {
    handleListUpdate(id, interestData, setInterestList);
    Alert.alert("Interest", JSON.stringify(interestList));
  };

  const handleTag = (id) => {
    handleListUpdate(id, hashtagsData, setTagList);
  };

  const renderInterest = interestData.map((item) => (
    <CustomButton
      key={item.id}
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
  ));

  const renderTags = hashtagsData.map((item) => (
    <CustomButton
      key={item.id}
      fSize={14}
      mr={8}
      width={94}
      label={`#${initialToUpperCase(item.tag)}`}
      color={color}
      backgroundColor={
        tagList.some((tag) => tag.id === item.id)
          ? secondBgColor
          : secondaryColor
      }
      buttonFunc={() => handleTag(item.id)}
    />
  ));

  const handleAgeChange = (text) => {
    setAge(text);
    if (text.length < 1) {
      setAgeError("Age is required");
      setIsValid(false);
    } else {
      setAgeError("");
    }
  };

  const handleBioChange = (text) => {
    setBio(text);
    if (text.length < 1) {
      setBioError("Bio is required");
      setIsValid(false);
    } else if (text.length < 10) {
      setBioError("Bio must be at least 10 characters");
      setIsValid(false);
    } else {
      setBioError("");
      setIsValid(true);
    }
  };

  const handlePhoto = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
      let data = {
        file: base64Img,
        upload_preset: "hwebe1a7",
      };

      uploadPhoto(data);
    }

    setLoading(false);
  };

  const uploadPhoto = async (data) => {
    let CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dvwxyofm2/image/upload";

    await fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        setProfileImg(data.secure_url);
      })
      .catch((err) => console.log("err", err));
  };

  const handleCreateAccount = async () => {
    setSubmitting(true);
    try {
      const data = {
        ...receivedData,
        profileImg,
        age,
        bio,
        interestList,
        tagList,
      };
      Alert.alert("Data", JSON.stringify(data));

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      const response = await fetch(
        `${baseUrl}/auth/register`,
        requestOptions
      );
      if (!response.ok) {
        Alert.alert("Error", "Registration failed");
      }
      const result = await response.text();
      setSubmitting(false);
      navigation.replace("InviteFriendsScreen");
    } catch (error) {
      Alert.alert("Error", "An error occurred, please try again");
      setSubmitting(false);
    }
  };

  return (
    <Box width="100%" justifyContent="center" p={24} pt={28}>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <VStack space="2xl" flex={1}>
          <HStack space="2xl">
            <TouchableOpacity onPress={handlePhoto}>
              {avatarUri === null ? (
                <View style={styles.avatarCon}>
                  {!loading ? (
                    <Text>Click to Upload</Text>
                  ) : (
                    <LoadingSpinner text="" />
                  )}
                </View>
              ) : (
                <Avatar size="xl" bgColor="#E0E0E0">
                  <AvatarFallbackText>SP</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: avatarUri || "https://bit.ly/3iJx6j6",
                    }}
                    alt="avatar"
                  />
                </Avatar>
              )}
            </TouchableOpacity>
            <VStack mt={16}>
              <Heading size="sm">
                {firstName} {lastName}
              </Heading>
              <Text size="sm">
                {city} {country}
              </Text>
            </VStack>
          </HStack>
          <Box>
            <CustomInput
              placeholder="Add age"
              type="number"
              keyboardType="numeric"
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

          <VStack space="2xl" mt={24} flex={1}>
            <Box>
              <CustomHeadings title="My Interests" />
              <View style={styles.container}>{renderInterest}</View>
            </Box>

            <Box>
              <CustomHeadings title="Hashtags" />
              <View style={styles.container}>{renderTags}</View>
            </Box>

            <Box>
              {!isValid ? (
                <CustomButton
                  label="Create Account"
                  backgroundColor={secondaryColor}
                />
              ) : (
                <Box>
                  {submitting ? (
                    <LoadingSpinner text="Creating Profile" />
                  ) : (
                    <CustomButton
                      label="Create Account"
                      buttonFunc={handleCreateAccount}
                    />
                  )}
                </Box>
              )}
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarCon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default UserProfileScreen;
