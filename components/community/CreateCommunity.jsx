import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar } from "../home";
import { Image } from "react-native";
import CustomButton from "../CustomButton";

import { secondBgColor, secondaryColor } from "../../utils/appstyle";
import handlePhoto from "../../utils/uploadImage";
import UserBottomSheetCom from "./UserBottomSheetCom";
import AddMemberModal from "./AddMemberModal";

const CreateCommunity = ({ navigation }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;

  const [userList, setUserList] = useState([]);

  // handle fetch all users excluding logged in user
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/all-users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const data = await response.json();
        // update state
        setUserList(data);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.log("An error occurred while fetching users", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(userList);

  // form state
  const [coverImage, setCoverImage] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityGuidelines, setCommunityGuidelines] = useState("");
  const [communityMembers, setCommunityMembers] = useState([]);
  const [isAllValid, setIsAllValid] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // handle modal close
  const handleModalClose = () => {
    setIsVisible(false);
  };
  
  // form validation
  const validateForm = () => {
    if (
      coverImage &&
      communityName &&
      communityDescription &&
      communityGuidelines &&
      communityMembers.length > 0
    ) {
      setIsAllValid(true);
      setError("");
    } else {
      setIsAllValid(false);
      setError("Please fill all fields");
    }
  };

  // handle back button
  const handleBack = () => {
    navigation.goBack();
  };

  // handle image upload
  const handleImageUpload = async () => {
    const imgUploadUrl = await handlePhoto();
    setCoverImage((prevCoverImage) => {
      return imgUploadUrl;
    });
  };

  // handle add members modal
  const handleAddMembersModal = () => {
    console.log("Add Members Modal");
    setIsVisible(true);
  };

  // handle create community
  const handleCreateCommunity = (e) => {
    e.preventDefault();
    validateForm();
    const communityData = {
      coverImage,
      communityName,
      communityDescription,
      communityGuidelines,
      communityMembers,
    };
    console.log(communityData);
    console.log("Create Community");
    // navigation.navigate("CommunityTerms");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top section */}
      <View>
        <BackTopBar
          headline="Create Community"
          icon2={<AntDesign name="close" size={24} color="black" />}
          func={handleBack}
          func2={handleBack}
        />
      </View>

      {/* create community form */}
      <ScrollView>
        {/* upload cover image */}
        <View className="mt-6">
          <TouchableOpacity onPress={handleImageUpload}>
            {coverImage ? (
              <Image
                source={{ uri: coverImage }}
                className="h-28 w-28 rounded-full"
              />
            ) : (
              <View className="flex justify-center items-center bg-gray-200 h-28 w-28 rounded-full">
                <Text className="text-gray-500">
                  <AntDesign name="camerao" size={34} color="black" />
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text className="mt-1">Community Display Picture</Text>
        </View>

        {/* community name */}
        <View className="my-6">
          <TextInput
            placeholder="Enter Community Name"
            className="border-b border-gray-300"
            value={communityName}
            onChangeText={(text) => setCommunityName(text)}
          />
        </View>

        {/* community description */}
        <View className="my-6">
          <TextInput
            placeholder="Enter Community Description"
            className="border-b border-gray-300"
            multiline={true}
            value={communityDescription}
            onChangeText={(text) => setCommunityDescription(text)}
          />
        </View>

        {/* community guidelines */}
        <View className="my-6">
          <TextInput
            placeholder="Enter Community Guidelines"
            className="border-b border-gray-300"
            multiline={true}
            value={communityGuidelines}
            onChangeText={(text) => setCommunityGuidelines(text)}
          />
        </View>

        {/* add community members button */}
        <TouchableOpacity onPress={handleAddMembersModal}>
          <View className="flex flex-row items-center">
            <AntDesign name="addusergroup" size={38} color="black" />
            <Text className="text-lg ml-4">Add Community Members</Text>
          </View>
        </TouchableOpacity>

        {/* create community button */}
        <View className="mt-12">
          {/* show error message */}
          {error && (
            <Text className="text-red-500 text-center text-xs">{error}</Text>
          )}
          {isAllValid ? (
            <CustomButton
              buttonFunc={handleCreateCommunity}
              label="Create Community"
            />
          ) : (
            <CustomButton
              buttonFunc={handleCreateCommunity}
              label="Create Community"
              backgroundColor={secondaryColor}
              color="black"
            />
          )}
        </View>
      </ScrollView>

      {/* add member modal sheet */}
      {isVisible && (
        <AddMemberModal
          visible={isVisible}
          onClose={handleModalClose}
          userList={userList}
        />)}
     
    </SafeAreaView>
  );
};

export default CreateCommunity;
