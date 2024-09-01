import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import SuccessBottomSheet from "./component/SuccessBottomSheet";
import { useLogin } from "../../context/LoginProvider";

const AddMoneySuccess = ({ navigation, route }) => {
  const { transactionId, data } = route.params; // Get transaction ID from route params
  const baseUrl = process.env.BASE_URL;
  const { userProfile } = useLogin();
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/verify-transaction/${transactionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userProfile.token}`,
            },
          }
        );
        const data = await response.json();
        // Handle transaction verification data here
        Alert.alert("Transaction Verification", JSON.stringify(data));
        console.log("Transaction Verification:", data);
      } catch (error) {
        console.error("Error verifying transaction:", error);
      }
    };

    if (transactionId) {
      verifyTransaction();
    }
  }, [transactionId]);

  const handleDoneBtn = () => {
    setIsModalVisible(!isModalVisible);
    navigation.navigate("TransactionScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <SuccessBottomSheet isVisible={isModalVisible} handleOk={handleDoneBtn} />
    </SafeAreaView>
  );
};

export default AddMoneySuccess;
