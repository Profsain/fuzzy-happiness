import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Alert, Share } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import { BackTopBar, HorizontalTitle } from "../home";
import MemberProfileCard from "./component/MemberProfileCard";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import WithdrawRequestModal from "./component/WithdrawalRequestModal";
import { useLogin } from "../../context/LoginProvider";
import formatDate from "../../utils/formatDate";

const BillsDetails = ({ navigation, route }) => {
  const { userProfile, setUserProfile, token, allUsers } = useLogin();
  const { currencySymbol, currency } = userProfile;

  const baseUrl = process.env.BASE_URL;
  const [membersInfo, setMembersInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { eventDetails } = route.params;
  const {
    eventName,
    eventLocation,
    eventId,
    eventCreator,
    eventDate,
    eventCost,
    totalPaidByMembers,
    eventMembers,
  } = eventDetails;

  // Fetch event members info
  useEffect(() => {
    // Create new array with member information
    const updatedMembersInfo = eventMembers?.map((member) => {
      // Find user information based on userId
      const user = allUsers.find((user) => user._id === member.user);

      return {
        userId: member.user,
        splitCost: member.splitCost,
        paymentStatus: member.paymentStatus,
        firstName: user?.firstName || "Unknown",
        lastName: user?.lastName || "",
        profileImg: user?.profileImg || "default_profile_img_url",
      };
    });

    setMembersInfo(updatedMembersInfo);
  }, [eventMembers, allUsers]);

  // Handle make transaction
  const handleOpenModal = () => {
    // navigation.navigate("TransactionScreen");
    setModalVisible(true);
  };

  const handleSubmitRequest = async (requestData) => {
    try {
      const response = await fetch(`${baseUrl}/withdrawal/withdraw-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        Alert.alert("Success", "Withdrawal request submitted successfully.");
      } else {
        const error = await response.json();
        Alert.alert("Request", "Withdrawal request already submitted.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Handle send payment reminder
  const handleSendPaymentReminder = async () => {
    try {
      const requestData = {
        eventId,
        eventMembers, // Array of event members with payment statuses
      };

      const response = await fetch(`${baseUrl}/event/send-payment-reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the user's token if needed
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        Alert.alert("Success", "Payment reminders sent successfully.");
      } else {
        const error = await response.json();
        Alert.alert(
          "Error",
          error.message || "Failed to send payment reminders."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Handle invite members
  const handleInviteMembers = async () => {
    try {
      const message = `
      You're invited to join the event: ${eventName}!
      Location: ${eventLocation}
      Date: ${formatDate(eventDate)}
      Cost: ${currencySymbol}${eventCost}
      Join us and help split the costs!
    `;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with specific activity type
          console.log("Shared with activity type: ", result.activityType);
        } else {
          // Shared successfully
          Alert.alert("Success", "Event details shared successfully.");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        Alert.alert("Cancelled", "Event sharing cancelled.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Render each member in FlatList
  const renderMember = ({ item }) => (
    <MemberProfileCard
      name={`${item.firstName}`}
      imgUrl={item.profileImg}
      status={item.paymentStatus}
      amount={item.splitCost}
      currency={currencySymbol}
    />
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar headline="" func={() => navigation.goBack()} />

      {/* top card */}
      <View
        className="rounded-lg my-6 p-6"
        style={{ backgroundColor: primeryColor }}
      >
        <View className="flex flex-row content-center justify-between items-center">
          <Text className="text-white font-medium text-base">
            {eventName || ""}
          </Text>
          <Text className="text-white font-normal text-xs">
            {formatDate(eventDate) || "14/11/2024"}
          </Text>
        </View>

        <View className="px-0">
          <View className="flex flex-row content-center items-center ">
            <Text className="font-normal pr-12">Bill Total</Text>
            <Text className="font-semibold text-base">${eventCost}</Text>
          </View>
          <View className="flex flex-row content-center items-center ">
            <Text className="font-normal pr-8">Amount Paid</Text>
            <Text className="font-semibold text-base">
              ${totalPaidByMembers.toFixed(2)}
            </Text>
          </View>
          <View className="flex flex-row content-center items-center mt-3">
            <Text className="font-xm">{eventLocation || ""}</Text>
          </View>
        </View>
      </View>

      {/* group members section */}
      <View>
        <HorizontalTitle title="Members Expenses" action="" />

        {/* group members */}
        {/* Horizontal FlatList for members */}
        <FlatList
          data={membersInfo}
          horizontal={true}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={renderMember}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>

      {/* action button section */}
      <View className="mt-6rs-7y">
        <BillsHorizontalBtn
          text="Make Withdraw"
          iconLeft={
            <FontAwesome
              name="pencil-square-o"
              size={18}
              color={primeryColor}
            />
          }
          func={handleOpenModal}
        />
        <BillsHorizontalBtn
          text="Send Payment reminder"
          iconLeft={
            <AntDesign name="clockcircleo" size={18} color={primeryColor} />
          }
          func={handleSendPaymentReminder}
        />
        <BillsHorizontalBtn
          text="Invite Members"
          iconLeft={<Octicons name="share" size={18} color={primeryColor} />}
          func={handleInviteMembers}
        />
      </View>

      {/* Reuseable Withdraw Request Modal */}
      <WithdrawRequestModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        eventName={eventName}
        eventCost={eventCost}
        currency={currency}
        eventId={eventId}
        eventCreator={eventCreator}
        onSubmitRequest={handleSubmitRequest}
      />
    </SafeAreaView>
  );
};

export default BillsDetails;
