import {
  View,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useMemo } from "react";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import SuccessBottomSheet from "./component/SuccessBottomSheet";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import useFetchWallet from "../../hooks/useFetchWallet";
import useFetchAllUsers from "../../hooks/useFetchAllUser";
import sendPushNotification from "../../utils/sendPushNotification";
import { useLogin } from "../../context/LoginProvider";

const TransferMoney = ({ navigation }) => {
  const wallet = useFetchWallet();
  const userList = useFetchAllUsers();
  const { userProfile, token } = useLogin();
  // base url
  const baseUrl = process.env.BASE_URL;

  // Destructuring
  const { balance } = wallet;

  // Component state
  const [amount, setAmount] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [note, setNote] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Change to null to easily check for selected user
  const [processing, setProcessing] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [balanceError, setBalanceError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle set amount
  const handleAmount = (value) => {
    setAmount(value);

    // check if amount is less than balance
    if (Number(value) > Number(balance)) {
      setBalanceError("Insufficient balance");
      setCanProceed(false);
    } else {
      setBalanceError("");
      setCanProceed(true);
    }
  };

  // Handle set note
  const handleNote = (value) => {
    setNote(value);
  };

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle transfer
  const handleTransfer = async () => {
    setProcessing(true);

    // Make API call to transfer money
    try {
      const transferData = {
        toAccountNumber: receiverAccount,
        amount: amount,
        name: selectedUser.firstName,
        email: selectedUser.emailAddress,
        currency: "USD",
        note: note,
      };

      const response = await fetch(
        `${baseUrl}/wallet/transfer-funds/${userProfile._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transferData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // send notification
        sendPushNotification({
          to: selectedUser._id,
          title: "Money Transfer",
          body: `You have received $${amount} from ${userProfile.firstName}`,
        });

        // send success notification to user
        sendPushNotification({
          to: userProfile._id,
          title: "Money Transfer",
          body: `You have sent $${amount} to ${selectedUser.firstName}`,
        });

        setProcessing(false);
        toggleModal();
      } else {
        setProcessing(false);
        Alert.alert("Error", "An error occurred while processing your request");
      }
    } catch (error) {
      setProcessing(false);
      Alert.alert("Error", "An error occurred while processing your request");
    }
  };

  // Handle user selection
  const handleSelectUser = (user) => {
    setSelectedUser(user);

    if (user.walletAccountNumber) {
      setReceiverAccount(user.walletAccountNumber);
    } else {
      setReceiverAccount("");
      setMessage("User does not have a wallet account");
    }
  };

  // Filtered user list based on search query
  const filteredUsers = useMemo(() => {
    return userList.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.emailAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, userList]);

  // Render user item
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>@{item.firstName}</Text>
      <Text>{item.emailAddress.slice(0, 20)}</Text>
      <TouchableOpacity
        onPress={() => handleSelectUser(item)}
        style={[
          styles.selectButton,
          selectedUser?._id === item._id && styles.selectedButton, // Apply selected style if user is selected
        ]}
      >
        <Text
          style={selectedUser?._id === item._id && styles.selectedButtonText}
        >
          {selectedUser?._id === item._id ? "Selected" : "Select"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* Top bar */}
        <BackTopBar headline="Transfer Money" func={handleBack} />

        <ScrollView>
          {/* Wallet balance */}
          <Text style={styles.balanceText}>
            Balance {wallet ? `$${wallet?.balance?.toFixed(2)}` : "$0.00"}
          </Text>

          {/* Add money section */}
          <Text className="font-xs text-orange-300">{balanceError}</Text>
          <CustomInput
            mb={24}
            placeholder="Amount"
            keyboardType="numeric"
            inputValue={amount}
            handleTextChange={handleAmount}
          />

          {message ? (
            <Text className="font-xs text-orange-300">{message}</Text>
          ) : (
            <Text className="font-xs text-slate-400">
              Select user below to prefill wallet id.
            </Text>
          )}

          <CustomInput
            mb={24}
            placeholder="Receiver Splinx Wallet ID"
            inputValue={receiverAccount}
          />

          <CustomInput
            placeholder="Note"
            inputValue={note}
            handleTextChange={handleNote}
          />

          {/* Search bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search user..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* User list */}
          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.userList}
          />

          {/* Transfer button */}
          <View style={styles.buttonContainer}>
            {canProceed ? (
              <CustomButton label="Transfer" buttonFunc={handleTransfer} />
            ) : (
              <CustomButton
                label="Transfer"
                backgroundColor={secondaryColor}
                color="#000"
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          onClose={toggleModal}
          heading="Transfer Completed"
          message={`Transfer successful: $${amount} sent to ${selectedUser.firstName}`}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: "white",
  },
  balanceText: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 16,
  },
  searchBar: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  userList: {
    flexGrow: 1,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 4,
  },
  selectedButton: {
    backgroundColor: primeryColor, // Change background color for the selected button
  },
  selectedButtonText: {
    color: "#fff", // Change text color for the selected button
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default TransferMoney;
