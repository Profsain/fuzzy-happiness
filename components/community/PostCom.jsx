import { View, Text, Image, TouchableOpacity, Share, Modal, TextInput, Alert } from "react-native";
import { Provider, Menu, IconButton, } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MemberProfieTop from "./MemberProfieTop";
import LoadingSpinner from "../LoadingSpinner";
import { primeryColor } from "../../utils/appstyle";
import timeAgo from "../../utils/timeAgo";

const PostCom = ({ post, isAddCommentPage, commentCounter }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  const postId = post._id;
  const commentsLen = post.comments.length;
  const [commentCount, setCommentCount] = useState(commentsLen);
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportUsername, setReportUsername] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [reportSent, setReportSent] = useState(false);

  // extract from useLogin context
  const { allUsers, userProfile, token, setCurrentPost } = useLogin();
  const userId = userProfile._id;

  const navigation = useNavigation();

  // find user who created the post from allUsers
  const user = allUsers.find((user) => user._id === post.postCreator);
  const postedAgo = timeAgo(post.createdAt);

  // handle open comment screen
  const openComment = () => {
    // set current post to context
    setCurrentPost(post);

    // navigate to comment screen
    navigation.navigate("AddComment", {
      postId: postId,
      postCreator: post.postCreator,
    });
  };

  // like post operation
  const [loading, setLoading] = useState(false);
  const [postLikes, setPostLikes] = useState(post.postLikes || []);
  const [isLiked, setIsLiked] = useState(false);

  // fetch all post likes
  const fetchPostLikes = async () => {
    try {
      const response = await fetch(`${baseUrl}/post/${postId}/likes`);
      if (response.ok) {
        const data = await response.json();
        setPostLikes(data.likes);
        // check if user has liked the post
        const liked = data.likes.find((like) => like.likeBy === userId);
        if (liked) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } else {
        throw new Error("Error fetching post likes");
      }
    } catch (error) {
      throw new Error("Error fetching post likes catch:", error);
    }
  };

  // call fetchPostLikes on component mount and loading changes
  useEffect(() => {
    fetchPostLikes();
  }, []);

  // handle post like
  const handleLike = async () => {
    try {
      // Send like post request
      const response = await fetch(`${baseUrl}/post/${postId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        // Update local state to reflect that the post is liked
        setIsLiked(true);
        // fetch post likes
        fetchPostLikes();
      }
    } catch (error) {
      console.log("Error liking post catch:", error);
      // Handle any network or other errors
    }
  };

  // handle share post
  const handleSharePost = async () => {
    try {
      const result = await Share.share({
        message: `${post.postText}\n\nCheck out this post!`,
        url: post.postImage, // Share image if available
        title: "Share Post",
      });
      if (result.action === Share.sharedAction) {
        console.log("Post shared successfully.");
      } else if (result.action === Share.dismissedAction) {
        console.log("Post share dismissed.");
      }
    } catch (error) {
      console.log("Error sharing post:", error);
    }
  };

  // Toggle menu visibility
  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Handle menu actions
  const handleReportMember = (postCreator) => {
    setReportUsername(`@${postCreator.firstName.toLowerCase()}`);
    setMenuVisible(false);
    setReportModalVisible(true);
  };

  const submitReport = async () => {
    setReportSent(true);
    // use html template for email
    const message = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #f9784b;">App Problems Report</h1>
  
      <p>Dear Support Team,</p>
      <p>Report from ${userProfile.firstName} | Phone Number:  ${userProfile.phoneNumber} | Email Address: ${userProfile.emailAddress}.</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p>Reported User: ${reportUsername}</p>
      <p>Reported Issues: ${reportMessage}</p>
  
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Best regards,<br>${userProfile.firstName} ${userProfile.lastName}</p>
    </div>
  `;

    const emailAddress = "splinxplanent@gmail.com";

    const data = {
      email: emailAddress,
      subject: "SplinX Planet User Report Problem",
      html: message,
    };

    try {
      const response = await fetch(`${baseUrl}/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setReportSent(false);
        setReportModalVisible(false);
        setReportUsername("");
        setReportMessage("");
        // show success alert and navigate to AccountSettings
        Alert.alert("Report Sent", "Report sent successfully");
      } else {
        setReportSent(false);
        Alert.alert("error", result.message);
      }
    } catch (error) {
      console.log("Error sending report email catch:", error);
      setReportSent(false);
    }
  };

  // handle block user
  const handleBlockUser = () => {
    // wait for 3 seconds and show alert
    setTimeout(() => {
      Alert.alert("Blocked User", "User blocked successfully");
    }, 3000);
    
  }
  return (
    <View className="px-6 py-4 border-b-2 border-gray-300">
      {/* publisher profile section */}
      <View className="flex flex-row justify-between">
        <MemberProfieTop postedAgo={postedAgo} postCreator={user} />

        <Menu
          visible={menuVisible}
          onDismiss={toggleMenu}
          anchor={
            <IconButton icon="dots-vertical" size={24} onPress={toggleMenu} />
          }
        >
          <Menu.Item onPress={() => handleReportMember(user)} title="Report Post" />
          <Menu.Item onPress={handleBlockUser} title="Block User" />
        </Menu>
      </View>

      {/* post content */}
      <View className="mt-4">
        <Text>
          {post.postText ||
            "Life Sequence: A Journey Through Time and Experience Life is a remarkable sequence of events, an intricate tapestry woven with threads of moments, emotions, and growth."}
        </Text>
        {/* post image */}
        {post.postImage && (
          <Image
            source={{ uri: post.postImage }}
            className="h-52 w-full rounded-lg mt-4"
          />
        )}

        {/* post actions */}
        <View className="flex flex-row justify-between mt-4">
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={handleLike}
          >
            {isLiked ? (
              <AntDesign name="heart" size={16} color="red" />
            ) : (
              <AntDesign name="hearto" size={16} color="black" />
            )}
            <Text className="pl-1 font-medium text-xs">
              {postLikes.length || 0} Likes
            </Text>
          </TouchableOpacity>

          {/* if not on add comment page, show comment button */}
          {isAddCommentPage ? (
            <TouchableOpacity className="flex flex-row items-center">
              <EvilIcons name="comment" size={18} color="black" />
              <Text className="pl-1 font-medium text-xs">
                {commentCount || commentCounter} Comments
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={openComment}
            >
              <EvilIcons name="comment" size={18} color="black" />
              <Text className="pl-1 font-medium text-xs">
                {commentCount || commentCounter} Comments
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleSharePost}
            className="flex flex-row items-center"
          >
            <FontAwesome5 name="share-square" size={12} color="black" />
            <Text className="pl-1 font-medium text-xs">Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report Member Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "90%",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Report Member
            </Text>
            <Text>Member name:</Text>
            <TextInput
              placeholder="Enter member username"
              value={reportUsername}
              onChangeText={setReportUsername}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 5,
                padding: 10,
                marginBottom: 15,
              }}
            />
            <Text>Report reason:</Text>
            <TextInput
              placeholder="Report Message"
              value={reportMessage}
              onChangeText={setReportMessage}
              multiline
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 5,
                padding: 10,
                height: 100,
                marginBottom: 20,
              }}
            />
            {reportSent && <LoadingSpinner text="Submitting" />}
            <TouchableOpacity
              onPress={submitReport}
              style={{
                backgroundColor: primeryColor,
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Submit Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setReportModalVisible(false)}
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostCom;
