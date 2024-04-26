import { View, Text, SafeAreaView, Pressable, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { primeryColor, secondaryColor } from "../../utils/appstyle";


const CreatePost = ({ navigation }) => {
  const [postText, setPostText] = useState("");
  const [postTextError, setPostTextError] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isAllValid, setIsAllValid] = useState(false);
  const [textCharacterCount, setTextCharacterCount] = useState(0);
  const [textCharacterLimit, setTextCharacterLimit] = useState(200);

  // handle text change
  const handleTextChange = (text) => {
    if (text.length > textCharacterLimit) {
      setPostTextError("Text limit reached");
      return;
    }
    setPostText(text);
    setTextCharacterCount(text.length);
  };

  // handle image upload
  const handleUpload = () => {
    console.log("Upload Image");
  };

  // handle cancel
  const handleCancel = () => {
    console.log("Cancel")
    navigation.goBack();
  };

  // handle post send
  const handlePostSend = () => {
    console.log("Post Send");
  };
  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      {/* top section */}
      <View className="mb-3 border-b-2 border-gray-300 py-3 px-6">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity onPress={handleCancel}>
            <Text className="font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePostSend}
            style={{ backgroundColor: secondaryColor }}
            className="py-2 px-3 rounded-2xl"
          >
            <Text className="font-semibold">Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* post preview */}
      <View className="flex-1 border-b-2 border-gray-300 px-6">
        <Text className="leading-5 font-medium text-lg">
          {postText ? postText : "What's on your mind?"}
        </Text>
      </View>

      {/* post input */}
      <View className="flex flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity onPress={handleUpload}>
          <AntDesign name="camerao" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 mx-3 mt-2">
          <TextInput
            placeholder="Write something..."
            multiline={true}
            className="h-10 border  px-4 py-2 rounded-2xl border-gray-300"
            onChangeText={handleTextChange}
          />

          {/* character remaining */}
          <View className="flex flex-row justify-between mt-1">
            <Text className="text-red-500 text-xs pl-4">{postTextError} </Text>
            <Text className="text-gray-500 text-right text-xs pr-2">
              {textCharacterCount}/{textCharacterLimit}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handlePostSend}>
          <Ionicons name="send" size={24} color={primeryColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
