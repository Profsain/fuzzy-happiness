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
} from "react-native";

// import { ScrollView } from "react-native-virtualized-view";
import { secondaryColor, textColor, secondBgColor } from "../../utils/appstyle";
import initialToUpperCase from "../../utils/firstCharToUpperCase";
import handleListUpdate from "../../utils/handlyListUpdate";
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
  const navigation = useNavigation();
  // received data from previous screen
  const receivedData = useReceivedData();

  // loading spinner
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // form state
  const { firstName, lastName, country, city } = receivedData;
  const [avatarUri, setAvatarUri] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");
  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid

  // render interest items
  const [bgColor, setBgColor] = useState(secondaryColor);
  const [color, setColor] = useState(textColor);
  const selectedColor = "#e9e9e9";
  const [interestList, setInterestList] = useState([]);

  // handle add and remove interest from interest list
  const handleInterest = (id) => {
    handleListUpdate(id, interestData, setInterestList);
  };
  // map through interestData and return item

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

  // render tags items
  const [tagList, setTagList] = useState([]);
  // handle add and remove interest from interest list
  const handleTag = (id) => {
    handleListUpdate(id, hashtagsData, setTagList);
  };
  const renderTags = hashtagsData.map((item) => (
    <CustomButton
      key={item.id}
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
  ));

  const handleAgeChange = (text) => {
    setAge(text);

    // handle error
    if (text.length < 1) {
      setAgeError("Age is required");
      setIsValid(false);
    } else {
      setAgeError("");
    }
  };

  const handleBioChange = (text) => {
    setBio(text);

    // handle error
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
    // set loading to true
    setLoading(true);

    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);

      // set loading to false
      setLoading(false);

      // upload photo to cloudinary
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
      let data = {
        file: base64Img,
        upload_preset: "hwebe1a7",
      };

      uploadPhoto(data);
    }
  };

  // upload profile photo to cloudinary
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

  // handle new user registration
  const handleCreateAccount = async () => {
    // set submitting to true
    setSubmitting(true);

    // send data to backend database
    const data = {
      ...receivedData,
      profileImg,
      age,
      bio,
      interestList,
      tagList,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    const registerUser = async () => {
      try {
        const response = await fetch(
          "https://splinx-server.onrender.com/auth/register",
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();

        // set submitting to false
        setSubmitting(false);

        // navigate to invite friends screen
        navigation.replace("InviteFriendsScreen");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    registerUser();
  };

  return (
    <Box width="100%" justifyContent="center" p={24} pt={28}>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <VStack space="2xl" flex={1}>
          {/* profile avatar */}
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
          {/* add age and bio */}
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

          {/* action button */}
          {/* <CustomButton
            label="Create Account"
            buttonFunc={handleCreateAccount}
          /> */}
        </VStack>

        <VStack space="2xl" mt={24} flex={1}>
          {/* interest section */}
          <Box>
            <CustomHeadings title="My Interests" />

            <View style={styles.container}>{renderInterest}</View>
          </Box>

          {/* hash tags section */}
          <Box>
            <CustomHeadings title="Hashtags" />
            <View style={styles.container}>{renderTags}</View>
          </Box>

          {/* action button */}
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
