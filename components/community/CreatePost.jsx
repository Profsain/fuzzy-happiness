// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import { useLogin } from "../../context/LoginProvider";
// import { AntDesign } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { primeryColor, secondaryColor } from "../../utils/appstyle";
// import uploadImage from "../../utils/uploadImage";

// const CreatePost = ({ navigation, route }) => {
//   // extract from route param
//   const { communityId } = route.params;
//   // base url
//   const baseUrl = process.env.BASE_URL;

//   // extract from useLogin context
//   const { userProfile, token } = useLogin();
//   const userId = userProfile._id;

//   const [postText, setPostText] = useState("");
//   const [postTextError, setPostTextError] = useState("");
//   const [postImage, setPostImage] = useState(null);
//   const [isAllValid, setIsAllValid] = useState(false);
//   const [textCharacterCount, setTextCharacterCount] = useState(0);
//   const [textCharacterLimit, setTextCharacterLimit] = useState(200);

//   // handle text change
//   const handleTextChange = (text) => {
//     if (text.length > 0 && text.length <= textCharacterLimit) {
//       setPostTextError("");
//     }

//     if (text.length > textCharacterLimit) {
//       setPostTextError("Text limit reached");
//       return;
//     }
//     setPostText(text);
//     setTextCharacterCount(text.length);
//   };

//   // handle image upload
//   const handleUpload = async () => {
//     const postImg = await uploadImage();
//     setPostImage(postImg);
//   };

//   // handle cancel
//   const handleCancel = () => {
//     navigation.goBack();
//   };

//   // handle post send
//   const handlePostSend = async () => {
//     if (postText.length < 1) {
//       setPostTextError("Text is required");
//       return;
//     }
//     // post data object
//     const postData = {
//       postCreator: userId,
//       postText,
//       postImage: postImage ? postImage : null,
//       community: communityId,
//     };

//     // send post to server
//     try {
//       const response = await fetch(`${baseUrl}/post/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(postData),
//       });

//       const data = await response.json();
     
//       navigation.goBack();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <SafeAreaView className="flex-1 pt-14 bg-white">
//       {/* top section */}
//       <View className="mb-3 border-b-2 border-gray-300 py-3 px-6">
//         <View className="flex flex-row justify-between items-center">
//           <TouchableOpacity onPress={handleCancel}>
//             <Text className="font-semibold text-lg">Cancel</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handlePostSend}
//             style={{ backgroundColor: secondaryColor }}
//             className="py-2 px-3 rounded-2xl"
//           >
//             <Text className="font-semibold">Post</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* post preview */}
//       <View className="flex-1 border-b-2 border-gray-300 px-6">
//         <Text className="leading-5 font-medium text-lg">
//           {postText ? postText : "What's on your mind?"}
//         </Text>

//         {/* image preview */}
//         {postImage && (
//           <View className="mt-2">
//             <Image
//               source={{ uri: postImage }}
//               style={{ width: "100%", height: 200 }}
//             />
//           </View>
//         )}
//       </View>

//       {/* post input */}
//       <View className="flex flex-row justify-between items-center px-6 py-4 bg-white">
//         <TouchableOpacity onPress={handleUpload}>
//           <AntDesign name="camerao" size={28} color="black" />
//         </TouchableOpacity>
//         <View className="flex-1 mx-3 mt-4">
//           <TextInput
//             placeholder="Write something..."
//             multiline={true}
//             className="h-10 border  px-4 py-2 rounded-2xl border-gray-300"
//             onChangeText={handleTextChange}
//           />

//           {/* character remaining */}
//           <View className="flex flex-row justify-between mt-1">
//             <Text className="text-red-500 text-xs pl-4">{postTextError} </Text>
//             <Text className="text-gray-500 text-right text-xs pr-2">
//               {textCharacterCount}/{textCharacterLimit}
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity onPress={handlePostSend}>
//           <Ionicons name="send" size={24} color={primeryColor} />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CreatePost;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../../context/LoginProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import uploadImage from "../../utils/uploadImage";

const CreatePost = ({ navigation, route }) => {
  const { communityId } = route.params;
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;

  const [postText, setPostText] = useState("");
  const [postTextError, setPostTextError] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [textCharacterCount, setTextCharacterCount] = useState(0);
  const [textCharacterLimit, setTextCharacterLimit] = useState(200);

  useEffect(() => {
    const showRespectAlert = async () => {
      try {
        const lastShownDate = await AsyncStorage.getItem(
          "lastRespectAlertDate"
        );
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

        if (lastShownDate !== today) {
          Alert.alert(
            "Community Guidelines",
            "Please be respectful and courteous. We have a zero-tolerance policy for objectionable content and abusive behavior."
          );
          await AsyncStorage.setItem("lastRespectAlertDate", today); // Store today's date
        }
      } catch (error) {
        console.log("Error showing respect alert:", error);
      }
    };

    showRespectAlert();
  }, []);

  const handleTextChange = (text) => {
    if (text.length > textCharacterLimit) {
      setPostTextError("Text limit reached");
      return;
    }
    setPostTextError("");
    setPostText(text);
    setTextCharacterCount(text.length);
  };

  const handleUpload = async () => {
    const postImg = await uploadImage();
    setPostImage(postImg);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handlePostSend = async () => {
    if (postText.length < 1) {
      setPostTextError("Text is required");
      return;
    }

    const postData = {
      postCreator: userId,
      postText,
      postImage: postImage ? postImage : null,
      community: communityId,
    };

    try {
      const response = await fetch(`${baseUrl}/post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      {/* top section */}
      <View className="mb-3 border-b-2 border-gray-300 py-3 px-6">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity onPress={handleCancel}>
            <Text className="font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePostSend}
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

        {/* image preview */}
        {postImage && (
          <View className="mt-2">
            <Image
              source={{ uri: postImage }}
              style={{ width: "100%", height: 200 }}
            />
          </View>
        )}
      </View>

      {/* post input */}
      <View className="flex flex-row justify-between items-center px-6 py-4 bg-white">
        <TouchableOpacity onPress={handleUpload}>
          <AntDesign name="camerao" size={28} color="black" />
        </TouchableOpacity>
        <View className="flex-1 mx-3 mt-4">
          <TextInput
            placeholder="Write something..."
            multiline={true}
            className="h-10 border  px-4 py-2 rounded-2xl border-gray-300"
            onChangeText={handleTextChange}
          />

          {/* character remaining */}
          <View className="flex flex-row justify-between mt-1">
            <Text className="text-red-500 text-xs pl-4">{postTextError}</Text>
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
