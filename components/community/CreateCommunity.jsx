import { View, Text, SafeAreaView, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar } from "../home";
import { Image } from "react-native";
import CustomButton from "../CustomButton";
import { secondBgColor, secondaryColor } from "../../utils/appstyle";

const CreateCommunity = ({ navigation }) => {
  // form state
  const [coverImage, setCoverImage] = useState(null);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityGuidelines, setCommunityGuidelines] = useState("");
  const [communityMembers, setCommunityMembers] = useState([]);
    const [isAllValid, setIsAllValid] = useState(false);
    
  // todo: add validation
  // todo: add members modal
  // todo: image upload
    // todo: create community
    
  // handle back button
  const handleBack = () => {
    navigation.goBack();
  };

  // handle image upload
  const handleImageUpload = () => {
    console.log("Image Upload");
  };

  // handle add members modal
  const handleAddMembersModal = () => {
    console.log("Add Members Modal");
  };

  // handle create community
  const handleCreateCommunity = () => {
      console.log("Create Community");
      navigation.navigate("CommunityTerms");
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
      <View>
        {/* upload cover image */}
        <View className="mt-6">
          <Pressable onPress={handleImageUpload}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} />
            ) : (
              <View className="flex justify-center items-center bg-gray-200 h-28 w-28 rounded-full">
                <Text className="text-gray-500">
                  <AntDesign name="camerao" size={34} color="black" />
                </Text>
              </View>
            )}
          </Pressable>
          <Text className="mt-1">Community Display Picture</Text>
        </View>

        {/* community name */}
        <View className="my-6">
          <TextInput
            placeholder="Enter Community Name"
            className="border-b border-gray-300"
          />
        </View>

        {/* community description */}
        <View className="my-6">
          <TextInput
            placeholder="Enter Community Description"
            className="border-b border-gray-300"
            multiline={true}
          />
        </View>

        {/* community guidelines */}
        <View className="my-6">
          <TextInput
            placeholder="Enter Community Guidelines"
            className="border-b border-gray-300"
            multiline={true}
          />
        </View>

        {/* add community members button */}
        <Pressable onPress={handleAddMembersModal}>
          <View className="flex flex-row items-center">
            <AntDesign name="addusergroup" size={38} color="black" />
          </View>
        </Pressable>

        {/* create community button */}
        <View className="mt-12">
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
      </View>
    </SafeAreaView>
  );
};

export default CreateCommunity;
