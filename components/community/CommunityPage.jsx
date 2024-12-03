import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  BackHandler,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import { Fab, FabIcon } from "@gluestack-ui/themed";
import { EditIcon } from "lucide-react-native";
import { Provider, Menu, IconButton } from "react-native-paper"; // Import Provider here
import TopComPageCard from "./TopComPageCard";
import PostCom from "./PostCom";
import { primeryColor } from "../../utils/appstyle";
import LoadingSpinner from "../LoadingSpinner";

const CommunityPage = ({ navigation, route }) => {
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const { community, creatorUser, membersProfileImg } = route.params;
  const {
    communityName,
    communityDescription,
    communityMembers,
    coverImage,
    posts,
    _id,
  } = community;

  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportUsername, setReportUsername] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [reportSent, setReportSent] = useState(false);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/post/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommunityPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPosts();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("CommunityList");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const openCreatePost = () => {
    navigation.navigate("CreatePost", { communityId: _id });
  };

  const renderPost = ({ item }) => {
    return <PostCom post={item} />;
  };

  // Toggle menu visibility
  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Handle menu actions
  const handleReportMember = () => {
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
      Alert.alert("error", error);
    }
  };

  // handle exit group
  const exitGroup = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/community/${_id}/remove-member`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            member: userProfile._id,
          }),
        }
      );

      if (response.ok) {
        // After exiting the group, navigate to the community list screen
        navigation.navigate("CommunityList");
      }
    } catch (error) {
      Alert.alert("Exit Group Error", error);
    }
  };

  const handleExitGroup = () => {
    setMenuVisible(false);
    // Call exitGroup function
    Alert.alert("Exit Group", "Are you sure you want to exit this group?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Exit",
        style: "destructive",
        onPress: async () => {
          try {
            await exitGroup();
          } catch (error) {
            Alert.alert("Exit Group Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <Provider>
      <SafeAreaView className="flex-1 bg-white">
        {/* Top menu with vertical dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Menu
            visible={menuVisible}
            onDismiss={toggleMenu}
            anchor={
              <IconButton icon="dots-vertical" size={24} onPress={toggleMenu} />
            }
          >
            <Menu.Item onPress={handleReportMember} title="Report Member" />
            <Menu.Item onPress={handleExitGroup} title="Exit Group" />
          </Menu>
        </View>

        {/* Top Community Card */}
        <TopComPageCard
          communityName={communityName}
          communityDescription={communityDescription}
          communityMembers={communityMembers}
          coverImage={coverImage}
          createdBy={creatorUser}
          images={membersProfileImg}
          noOfPosts={communityPosts.length}
        />

        {loading && <LoadingSpinner />}

        {communityPosts.length === 0 && !loading && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">No posts available</Text>
          </View>
        )}

        <FlatList
          data={communityPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item._id.toString()}
          vertical={true}
        />

        <View>
          <Fab bg={primeryColor} size="lg" onPress={openCreatePost}>
            <FabIcon as={EditIcon} />
          </Fab>
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
      </SafeAreaView>
    </Provider>
  );
};

export default CommunityPage;
