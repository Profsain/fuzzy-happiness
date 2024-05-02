import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import MemberProfieTop from "./MemberProfieTop";
import { Ionicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";

const UserCommentCom = () => {
  const [replyText, setReplyText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentTextError, setCommentTextError] = useState("");
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
        <MemberProfieTop />
        <View className="pl-16">
          <Text>
            The adult years bring about increased autonomy and responsibilities.
          </Text>

          {/* reply button */}
          <TouchableOpacity
            onPress={openReply}
            className="py-1 px-2 bg-gray-100 rounded-3xl mt-2 w-12"
          >
            <Text className="text-xs">Reply</Text>
          </TouchableOpacity>

          {/* reply text input */}
          {isReplyClicked && (
            <View
              className="flex flex-row items-center mt-2"
            >
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
