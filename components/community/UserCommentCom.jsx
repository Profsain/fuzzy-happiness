import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import timeAgo from "../../utils/timeAgo";

const UserCommentCom = ({ comment, setShowCommentBox, postId }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplyClicked, setIsReplyClicked] = useState(false);

  // base url
  const baseUrl = process.env.BASE_URL;

  // comment id
  const commentId = comment._id;

  // handle open reply
  const openReply = () => {
    // set isReplyClicked to true
    setIsReplyClicked(true);
    setShowCommentBox(false);
  };

  // handle close reply
  const closeReply = () => {
    // set isReplyClicked to false
    setIsReplyClicked(false);
    setShowCommentBox(true);
  };

  // handle fetch all comment replies
  const [commentReplies, setCommentReplies] = useState([]); // [reply1, reply2, reply3]

  const fetchCommentReplies = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/post/${postId}/comment/${commentId}/replies`, {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error("Error fetching comment replies", data.error);
        return;
      }
      setCommentReplies(data); // [reply1, reply2, reply3]
      console.log("Comment replies", data);
    } catch (error) {
      console.error("Error fetching comment replies", error);
    }
  };

  // fetch comment replies on component mount
  useEffect(() => {
    fetchCommentReplies();
  }, []);

  // handle send reply
  const handleSendReply = async () => {
    // send reply to server
    try {
      const response = await fetch(
        `${baseUrl}/post/${postId}/comment/${commentId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            replyBy: comment.commenterName,
            replyText: replyText,
          }),
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error("Error sending reply", data.error);
      }
      
      // update comment replies
      setCommentReplies([...commentReplies, data]);

      // clear reply text
      setReplyText("");
      // close reply
      closeReply();
    } catch (error) {
      throw new Error("Error sending reply", error);
    }
  };


  return (
    <View className="px-6 py-2">
      <View>
        <View className="flex flex-row items-center">
          <View>
            <Image
              source={{
                uri:
                  comment.commenterProfileImage ||
                  "https://res.cloudinary.com/dvwxyofm2/image/upload/v1714869565/senjhz3dfuxl6bjsburq.jpg",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
          </View>
          <View className="ml-2">
            <Text>{comment.commenterName}</Text>
            <Text>{timeAgo(comment.createdAt)}</Text>
          </View>
        </View>
        <View className="pl-16">
          <Text>{comment.commentText}.</Text>

          {/* reply open and close button */}
          <View className="my-2">
            {!isReplyClicked ? (
              <TouchableOpacity onPress={openReply}>
                <Text style={{ color: primeryColor }}>Reply</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={closeReply}>
                <Text style={{ color: primeryColor }}>Close</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* reply text list in FlatList*/}
          {commentReplies.length > 0 && (
            <View>
              {commentReplies.map((reply) => (
                <View key={reply._id} className="flex flex-row items-center">
                  <View>
                    <Image
                      source={{
                        uri:
                          reply.replyProfileImage ||
                          "https://res.cloudinary.com/dvwxyofm2/image/upload/v1714869565/senjhz3dfuxl6bjsburq.jpg",
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                      }}
                    />
                  </View>
                  <View className="ml-2 mt-3">
                    <Text className="text-xs text-slate-400">By @{reply.replyBy.toLowerCase()}</Text>
                    <Text className="text-sm pl-2">{reply.replyText}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* reply text input */}
          {isReplyClicked && (
            <View className="flex flex-row items-center mt-4">
              <View className="flex-1 ml-2">
                <TextInput
                  value={replyText}
                  onChangeText={(text) => setReplyText(text)}
                  placeholder="Write a reply..."
                  className="h-8 border px-2 rounded-3xl border-gray-300"
                />
              </View>
              <TouchableOpacity
                onPress={handleSendReply}
                className="p-2 bg-gray-100 rounded-full"
              >
                <Ionicons name="send" size={16} color={primeryColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserCommentCom;
