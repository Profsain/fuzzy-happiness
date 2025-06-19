import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import verifyTransaction from "../../utils/verifyTransaction";
import { useLogin } from "../../context/LoginProvider";
import SuccessBottomSheet from "../splitBills/component/SuccessBottomSheet";

const PaymentScreen = ({ navigation, route }) => {
  const { paymentLink } = route.params;
  const { userProfile, token } = useLogin();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDone = () => {
    toggleModal();
    navigation.navigate("ProfileHome");
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCancelPayment = () => {
    Alert.alert(
      "Cancel Payment",
      "Are you sure you want to cancel this payment?",
      [
        { text: "No" },
        {
          text: "Yes, Cancel",
          onPress: () => navigation.goBack(),
          style: "destructive",
        },
      ]
    );
  };

  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;
    Alert.alert("URL Link", JSON.stringify(navState));

    if (url && url.startsWith("myapp://payment-success")) {
      toggleModal();

      const urlParams = new URLSearchParams(url.split("?")[1]);
      const transactionId = urlParams.get("transaction_id");
      const txRef = urlParams.get("tx_ref");

      try {
        if (transactionId) {
          const verifyPayment = await verifyTransaction(transactionId);
          if (verifyPayment.status === "success") {
            Alert.alert("Payment Successful", `Transaction ID: ${transactionId}`);
            navigation.navigate("PaymentSuccessScreen", {
              transactionId,
              txRef,
            });
          } else {
            Alert.alert("Payment Verification Failed", "Please contact support.");
          }
        }
      } catch (error) {
        console.error("Verification Error:", error);
      }
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-16 bg-black">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <WebView
            source={{ uri: paymentLink }}
            onNavigationStateChange={handleNavigationStateChange}
            style={{
              width: Dimensions.get("window").width * 0.9,
              height: Dimensions.get("window").height * 0.7,
            }}
          />

          {/* Cancel Payment Button */}
          <TouchableOpacity
            onPress={handleCancelPayment}
            style={{
              marginTop: 20,
              backgroundColor: "#ff4d4d",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Cancel Payment
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          onClose={handleDone}
          handleOk={handleDone}
          heading="Transaction Completed"
          message="Your subscription is now active. Enjoy unlimited access to our premium features."
        />
      )}
    </>
  );
};

export default PaymentScreen;
