import React, { useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import verifyTransaction from "../../utils/verifyTransaction";
import { useLogin } from "../../context/LoginProvider";
import SuccessBottomSheet from "../splitBills/component/SuccessBottomSheet";

const PaymentScreen = ({ navigation, route }) => {
  const { paymentLink } = route.params;
  const { userProfile, token } = useLogin();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle bottom sheet done
  const handleDone = () => {
    toggleModal();
    navigation.navigate("ProfileHome");
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;
    Alert.alert("URL Link", JSON.stringify(navState))
    // Check if the WebView is redirected to the success URL
    if (url && url.startsWith("myapp://payment-success")) {
      toggleModal();

      // Extract transaction_id and other params from the URL
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const transactionId = urlParams.get("transaction_id");
      const txRef = urlParams.get("tx_ref");

      try {
        if (transactionId) {
          // Verify the transaction using the transaction_id
          const verifyPayment = await verifyTransaction(transactionId);
          if (verifyPayment.status === "success") {
            Alert.alert(
              "Payment Successful",
              `Transaction ID: ${transactionId}`
            );
            navigation.navigate("PaymentSuccessScreen", {
              transactionId,
              txRef,
            });
          } else {
            Alert.alert(
              "Payment Verification Failed",
              "Please contact support."
            );
          }
        }
      } catch (error) {
        console.error("Verification Error:", error);
      }
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-16 bg-white">
        <WebView
          source={{ uri: paymentLink }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </SafeAreaView>

      {/* Bottom sheet */}
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
