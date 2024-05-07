import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import timeAgo from "../../utils/timeAgo";

const UserCommentCom = ({comment}) => {
  const [replyText, setReplyText] = useState("");
  const [isReplyClicked, setIsReplyClicked] = useState(false);

  const replyInputRef = useRef(null);

  // handle open reply
  const openReply = () => {
    // set isReplyClicked to true
    setIsReplyClicked(true);
  };

  // handle send reply
  const handleSendReply = () => {
    // set isReplyClicked to false
    setIsReplyClicked(false);
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

          {/* reply button */}
          <TouchableOpacity
            onPress={openReply}
            className="py-1 px-2 bg-gray-100 rounded-3xl mt-2 w-12"
          >
            <Text className="text-xs">Reply</Text>
          </TouchableOpacity>

          {/* reply text input */}
          {isReplyClicked && (
            <View className="flex flex-row items-center mt-2">
              <View className="flex-1 ml-2">
                <TextInput
                  placeholder="Write a reply..."
                  className="h-8 border px-2 rounded-3xl border-gray-300"
                />
              </View>
              <TouchableOpacity
                onPress={handleSendReply}
                className="p-2 rounded-full border border-cyan-50 h-8 w-8"
              >
                <Ionicons name="send" size={12} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserCommentCom;
