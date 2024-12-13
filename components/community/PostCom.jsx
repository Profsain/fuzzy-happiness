import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MemberProfieTop from "./MemberProfieTop";
import timeAgo from "../../utils/timeAgo";

const PostCom = ({ post, isAddCommentPage, commentCounter }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  const postId = post._id;
  const commentsLen = post.comments.length;
  const [commentCount, setCommentCount] = useState(commentsLen);

  // extract from useLogin context
  const { allUsers, userProfile, setCurrentPost } = useLogin();
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

  return (
    <View className="px-6 py-4 border-b-2 border-gray-300">
      {/* publisher profile section */}
      <MemberProfieTop postedAgo={postedAgo} postCreator={user} />

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
    </View>
  );
};

export default PostCom;
