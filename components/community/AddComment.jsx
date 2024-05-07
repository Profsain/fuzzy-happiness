import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { Ionicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import PostCom from "./PostCom";
import UserCommentCom from "./UserCommentCom";

// default
const imgUrl =
  "https://img.freepik.com/free-photo/decorated-banquet-hall-with-served-round-table-with-hydrangea-centerpiece-chiavari-chairs_8353-10059.jpg?t=st=1714005008~exp=1714008608~hmac=808f01105efa63d0d81162d24a9046582dd11564e9c9f209c4e2a6d90ea88cf1&w=826";

const AddComment = () => {
  const baseUrl = process.env.BASE_URL;

  const [isAddCommentPage, setIsAddCommentPage] = useState(true);
  const [commentList, setCommentList] = useState([]);

  // extract from useLogin context
  const { userProfile, currentPost, communities } = useLogin();
  const userId = userProfile._id;

  // find the current community
  const currentCommunity = communities.find(
    (community) => community._id === currentPost.community
  );

  // handle comment input
  const [commentText, setCommentText] = useState("");
  const [commentTextError, setCommentTextError] = useState("");
  const textLimit = 100;

  // handle comment input change
  const handleCommentTextChange = (text) => {
    setCommentText(text);
    if (text.length === textLimit) {
      setCommentTextError("Limit reached");
      //stop typing
      return;
    } else {
      setCommentTextError("");
    }
  };

  // comment count
  const [commentCounter, setCommentCounter] = useState(0);
  
   // fetch all comments of post
  const fetchAllComments = async () => {
    try {
      const response = await fetch( `${baseUrl}/post/${currentPost._id}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setCommentList(data);
      // update comment count
      setCommentCounter(data.length)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllComments()
  }, [])

  // handle comment submit
  const handleCommentSubmit = async () => {
    // check if the comment is empty
    if (!commentText) {
      setCommentTextError("Comment is required");
      return;
    }

    // post comment
    try {
      const response = await fetch(
        `${baseUrl}/post/${currentPost._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentText: commentText,
            commenter: userId,
            commenterName: userProfile.firstName,
            commenterProfileImage: userProfile.profileImage,
          }),
        }
      );

      const data = await response.json();
      // console.log("Comment response", data);
      setCommentText("");
      setCommentTextError("");

      // call fetchComments
      fetchAllComments()
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <SafeAreaView className="flex-1 pt-14 pb-8 bg-white">
      {/* top section */}
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              currentCommunity.coverImage ||
              "https://img.freepik.com/free-photo/decorated-banquet-hall-with-served-round-table-with-hydrangea-centerpiece-chiavari-chairs_8353-10059.jpg?t=st=1714005008~exp=1714008608~hmac=808f01105efa63d0d81162d24a9046582dd11564e9c9f209c4e2a6d90ea88cf1&w=826",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>
              {currentCommunity.communityName || ""}
            </Text>
          </View>
          <View
            className="w-full py-2 px-6 rounded-t-md border-b-2 border-gray-300 bg-white"
            style={{
              position: "relative",
              bottom: 0,
            }}
          >
            <View className="flex items-center justify-between mb-2 py-4">
              <View className="w-20 h-2 bg-slate-200 rounded-2xl mb-4"></View>
              <Text className="font-semibold text-lg">Comments</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* post preview */}
      <ScrollView className="flex-1 bg-white">
        <View className="px-6 py-2 border-b-2 border-gray-300 bg-white ">
          <PostCom post={currentPost} isAddCommentPage={isAddCommentPage} commentCounter={commentCounter} />
        </View>
        {/* comments section */}
        {commentList.map((comment) => ( 
          <UserCommentCom key={comment._id} comment={comment} />
        ))}
        
      </ScrollView>

      {/* add comment */}
      <View className="flex flex-row items-center justify-between px-6 py-2 mt-6 bg-white">
        <View className="flex flex-row items-center w-4/5">
          <View>
            <Image
              source={{ uri: userProfile.profileImage || imgUrl }}
              className="h-8 w-8 rounded-full"
            />
          </View>
          <View className="flex w-full mx-2">
            <TextInput
              value={commentText}
              onChangeText={handleCommentTextChange}
              placeholder="Write a comment..."
              className="h-8  border px-2 rounded-3xl border-gray-300"
            />
          </View>
          <TouchableOpacity className="py-2" onPress={handleCommentSubmit}>
            <Ionicons name="send" size={18} color={primeryColor} />
          </TouchableOpacity>
        </View>
      </View>
        <View className="flex items-end justify-end pr-12">
          <Text className="text-gray-500 text-xs">
            {commentText.length}/{textLimit}
          </Text>
          <Text className="text-red-500 text-xs">{commentTextError}</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Full width
    height: 235, // Height of 235px
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  text2: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
  },
});

export default AddComment;
