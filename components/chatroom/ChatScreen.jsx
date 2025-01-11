import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity
} from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { useLogin } from "../../context/LoginProvider";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import EmojiPicker from "rn-emoji-keyboard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  primeryColor,
  secondaryColor,
  secondBgColor,
} from "../../utils/appstyle";

const ChatScreen = () => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recipientData, setRecipientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const route = useRoute();
  const { recipientId } = route.params;
  const [message, setMessage] = useState("");

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  // handle Emoji
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  // fetch users messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/message/messages/${userId}/${recipientId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messages", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const response = await fetch(`${baseUrl}/message/user/${recipientId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setRecipientData(data);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecipientData();
  }, []);

  // handle send message
  // const handleSend = async (messageType, imageUri) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("senderId", userId);
  //     formData.append("recipientId", recipientId);

  //     // check if message is empty
  //     if (!message && !imageUri) {
  //       return;
  //     }

  //     //if the message type id image or a normal text
  //     if (messageType === "image") {
  //       console.log("imageUri........", imageUri);
  //       formData.append("messageType", "image");
  //       formData.append("imageUrl", imageUri);
  //     } else {
  //       console.log("message.....", message);
  //       formData.append("messageType", "text");
  //       formData.append("messageText", message);
  //     }

  //     const response = await fetch(`${baseUrl}/message/messages`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("message sent");
  //       setMessage("");
  //       setSelectedImage("");

  //       fetchMessages();
  //     }
  //   } catch (error) {
  //     console.log("error in sending the message", error);
  //   }
  // };
  const handleSend = async (messageType, imageUri) => {
    try {
      const body = {
        senderId: userId,
        recipientId: recipientId,
      };

      // check if message is empty
      if (!message && !imageUri) {
        return;
      }

      //if the message type id image or a normal text
      if (messageType === "image") {
        body.messageType = "image";
        body.imageUrl = imageUri;
      } else {
        body.messageType = "text";
        body.messageText = message;
      }

      const response = await fetch(`${baseUrl}/message/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // specify content type as JSON
        },
        body: JSON.stringify(body), // stringify the body object
      });

      if (response.ok) {
        console.log("message sent", body);
        setMessage("");
        setSelectedImage("");

        fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recipientData?.profileImage }}
              />

              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {recipientData?.firstName}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null,
    });
  }, [recipientData, selectedMessages]);

  // handle delete messages
  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch(`${baseUrl}/message/deleteMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: messageIds }),
      });

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };

  // format time func
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  // load message image upload from device
  const handlePhotoSend = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // upload photo to cloudinary
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
      let data = {
        file: base64Img,
        upload_preset: "hwebe1a7",
      };

      uploadPhoto(data);
    }

    if (result.canceled) {
      console.log("cancelled")
    }
  };

  // upload photo to cloudinary and get url
  const uploadPhoto = async (data) => {
    let CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dvwxyofm2/image/upload";

    await fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();

        setSelectedImageUrl(data.secure_url);
           handleSend("image", data.secure_url);
      })
      .catch((err) => console.log("err", err));
  };

  // handle selected message
  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F0F0F0" }}
      className="flex-1 px-6 pt-14 bg-white"
    >
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-row items-center ml-8">
          <Image
            source={{ uri: recipientData?.profileImg }}
            className="h-10 w-10 rounded-full mr-6"
          />
          <Text>{recipientData?.firstName}</Text>
        </View>

        <View className="flex flex-row items-center gap-4">
          <Text></Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: secondBgColor,
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: secondaryColor,
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.createdAt)}
                </Text>
              </Pressable>
            );
          }

          if (item.messageType === "image") {
            const source = {
              uri:
                item.imageUrl ||
                "https://res.cloudinary.com/dvwxyofm2/image/upload/v1713992847/qijnsgcr13wjnyukuzfs.jpg",
            };
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={source}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      position: "absolute",
                      right: 10,
                      bottom: 7,
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item?.createdAt)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo
            onPress={handlePhotoSend}
            name="camera"
            size={24}
            color="gray"
          />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: primeryColor,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiPicker
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
