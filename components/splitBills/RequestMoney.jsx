import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import useFetchWallet from "../../hooks/useFetchWallet";
import useFetchAllUsers from "../../hooks/useFetchAllUser";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import { secondaryColor } from "../../utils/appstyle";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import MembersRowCard from "./component/MembersRowCard";
import { HorizontalTitle } from "../home";
import SuccessBottomSheet from "./component/SuccessBottomSheet";
import calculateRequestMoney from "./methods/calculateRequestMoney";
import sendPushNotification from "../../utils/sendPushNotification";
import LoadingSpinner from "../LoadingSpinner";

const RequestMoney = ({ navigation }) => {
  const wallet = useFetchWallet();

  // calculate money received and outstanding
  const { receivedAmount, pendingAmount } = calculateRequestMoney(
    wallet?.moneyRequest
  );

  const userList = useFetchAllUsers();
  const { userProfile, token } = useLogin();
  // base url
  const baseUrl = process.env.BASE_URL;

  // Handle back to previous screen when device back button is pressed
  const handleBack = () => {
    navigation.goBack();
  };

  // Component state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // handle validation
  useEffect(() => {
    if (userName && amount && note) {
      setIsAllFieldsFilled(true);
      setErrorMessages("");
    } else {
      setIsAllFieldsFilled(false);
      setErrorMessages("All fields are required");
    }
  }, [userName, amount, note]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setUserName(`@${user.firstName}`);
  };

  // update user name
  const handleUserName = (text) => {
    setUserName(text);
  };

  // update amount
  const handleAmount = (text) => {
    setAmount(`$${text}`);
  };

  // update note
  const handleNote = (text) => {
    setNote(text);
  };

  // handle request
  const handleRequest = async () => {
    setProcessing(true);
    // send request
    try {
      const requestData = {
        requesteeId: selectedUser._id,
        amount: Number(amount),
        description: note,
      };

      const response = await fetch(
        `${baseUrl}/wallet/request-money/${userProfile._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // send notification
        // send notification
        sendPushNotification({
          to: selectedUser._id,
          title: "Request Money",
          body: `You have received a request for $${amount} from ${userProfile.firstName}.`,
        });

        // send success notification to user
        sendPushNotification({
          to: userProfile._id,
          title: "Request Money",
          body: `You have sent a request for $${amount} to ${selectedUser.firstName}.`,
        });

        setProcessing(false);
        toggleModal();
      } else {
        setProcessing(false);
        Alert.alert("Warning", "This user has not activated their wallet yet and cannot receive money requests");
      }
    } catch (error) {
      setProcessing(false);
      Alert.alert(
        "Error",
        "Network error occurred while processing your request. Try again later"
      );
    }
  };

  // handle bottom sheet done
  const handleDone = () => {
    toggleModal();
    navigation.goBack();
  };

  // Render user item
  const renderUserItem = ({ item }) => (
    <MembersRowCard
      imgUrl={item.profileImg}
      memberName={item.firstName}
      memberId={item.id}
      isSelected={selectedUser?._id === item._id}
      onSelect={() => handleSelectUser(item)}
    />
  );

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* Top bar */}
        <BackTopBar headline="Request Money" func={handleBack} />
        <ScrollView>
          {/* Wallet balance */}
          <View className="my-4 flex flex-row justify-between items-center">
            <View className="flex content-center items-end">
              <Text className="font-semibold text-lg">Received</Text>
              <Text className="font-semibold text-xs">
                ${receivedAmount.toFixed(2) || "$0.00"}
              </Text>
            </View>
            <View className="flex content-center items-end">
              <Text className="font-semibold text-lg">Outstanding</Text>
              <Text className="font-semibold text-xs">
                ${pendingAmount.toFixed(2) || "$0.00"}
              </Text>
            </View>
          </View>

          {/* Add money section */}
          <Text className="font-xs text-orange-300">{errorMessages || ""}</Text>

          <CustomInput
            mb={24}
            placeholder="Username"
            inputValue={userName}
            handleTextChange={handleUserName}
          />
          <CustomInput
            mb={24}
            placeholder="Amount"
            keyboardType="numeric"
            inputValue={amount}
            handleTextChange={handleAmount}
          />
          <CustomInput
            placeholder="Note"
            inputValue={note}
            handleTextChange={handleNote}
          />

          {/* Member list section */}
          <View>
            <HorizontalTitle title="Select members" icon="" action="" />
            <FlatList
              data={userList}
              renderItem={renderUserItem}
              keyExtractor={(item) => item._id}
              extraData={selectedUser}
            />
          </View>

          {/* Request money button */}
          <View className="my-8">
            {processing && <LoadingSpinner />}
            {isAllFieldsFilled ? (
              <CustomButton label="Send Request" buttonFunc={handleRequest} />
            ) : (
              <CustomButton
                label="Send Request"
                color="#000"
                backgroundColor={secondaryColor}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          handleOk={handleDone}
          heading="Request Sent"
          message="Your request has been sent. We'll notify you once it's accepted or declined"
        />
      )}
    </>
  );
};

export default RequestMoney;
