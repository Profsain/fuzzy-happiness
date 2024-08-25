import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackTopBar } from "../home";
import sendPushNotification from "../../utils/sendPushNotification";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import SuccessBottomSheet from "./component/SuccessBottomSheet";
import useFetchWallet from "../../hooks/useFetchWallet";
import { useLogin } from "../../context/LoginProvider";
import { secondaryColor } from "../../utils/appstyle";
import LoadingSpinner from "../LoadingSpinner";
import { WebView } from "react-native-webview";

const AddMoney = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const baseUrl = process.env.BASE_URL;
  const fwPublicKey = process.env.FW_PUBLIC_KEY;
  const { userProfile, token } = useLogin();
  const {
    emailAddress,
    firstName,
    lastName,
    phoneNumber,
    currencySymbol,
    currency,
  } = userProfile;

  // call useFetchWallet
  const { wallet, fetchWallet } = useFetchWallet();
  // re-fetch wallet on screen focus
  const fetchWalletData = useCallback(() => {
    fetchWallet(); // Call fetchWallet from the hook
  }, [fetchWallet]);

  useFocusEffect(fetchWalletData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [note, setNote] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");

  // set user currency symbol if available or

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle bottom sheet done
  const handleDone = () => {
    toggleModal();
    navigation.navigate("TransactionScreen");
  };

  const handleAmount = (text) => {
    setAmount(text);
    if (text < 1) {
      setAmountError("Amount must be greater than 0");
      setIsValid(false);
    } else {
      setAmountError("");
      setIsValid(true);
    }
  };

  const handleNote = (text) => {
    setNote(text);
  };

  const initiatePayment = async (
    amount,
    email,
    name,
    phonenumber,
    description
  ) => {
    try {
      const response = await fetch(`${baseUrl}/flw-api/fund-wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          email,
          name,
          phonenumber,
          description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { link } = data.data;
        setPaymentLink(link);
        setProcessing(false);
        setWebViewVisible(true);
      } else {
        Alert.alert("Funding Error", "Transaction failed. Please try again");
        setProcessing(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Transaction failed. Please try again");
      setProcessing(false);
    }
  };

  const handleAddMoney = async () => {
    setProcessing(true);
    setWebViewVisible(true);
    // await initiatePayment(
    //   Number(amount),
    //   emailAddress,
    //   `${firstName} ${lastName}`,
    //   phoneNumber,
    //   `${firstName} ${lastName} fund wallet with ${amount}. Note: ${note || ""}`
    // );
  };

  // Handle balance update
  const handleUpdateWalletBalance = async () => {
    // Make API call 
    try {
      const fundingData = {
        amount: Number(amount),
        name: firstName,
        email: emailAddress,
        currency: currency || "USD",
      };

      const response = await fetch(
        `${baseUrl}/wallet/fund-wallet/${userProfile._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fundingData),
        }
      );
      const data = await response.json();
  
      if (response.ok) {

        // send success notification to user
        sendPushNotification({
          to: userProfile._id,
          title: "Wallet Funding",
          body: `You have funded your wallet with ${
            currencySymbol || "$"
          }${amount}`,
        });

        // Alert.alert("Funding Successful", "Your wallet has been funded successfully");
      } else {
        Alert.alert("Funding Error", data.error);
      }
    } catch (error) {
      Alert.alert(
        "Network Error",
        JSON.stringify(error)
      );
    }
  };

  const handleMessage = async (event) => {
    const data = event.nativeEvent.data;

    if (data === "Payment cancelled!") {
      alert("Payment was cancelled!");
      setWebViewVisible(false);
      setProcessing(false);
    } else {
      const paymentData = JSON.parse(data);
      if (paymentData.status === "successful") {
        
        setWebViewVisible(false);
        // update wallet balance
        await handleUpdateWalletBalance();
        // fetchWallet();
        // show success modal
        setIsModalVisible(true);

        setProcessing(false);
      } else {
        alert("Payment failed. Please try again.");
      }
    }
  };

  const generateTxRef = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 32; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const flutterwaveHTML = `
  <html>
    <head>
      <script src="https://checkout.flutterwave.com/v3.js"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
          background-color: #f8f8f8;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          margin: 0;
          box-sizing: border-box;
        }
        form {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        #start-payment-button {
          background-color: #f15a22;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1.2rem;
          width: 100%;
          max-width: 300px;
          margin-top: 20px;
        }
        #start-payment-button:hover {
          background-color: #d14c1b;
        }
        .order-details {
          font-size: 1.5rem;
          margin: 20px 0;
          width: 100%;
        }
        @media (max-width: 600px) {
          .order-details {
            font-size: 1.2rem;
          }
          #start-payment-button {
            font-size: 1rem;
            padding: 10px;
          }
        }
      </style>
    </head>
    <body>
      <form>
        <div class="order-details">
          You want to fund your Wallet with:
        </div>
        <div class="order-details">
          Amount ${currencySymbol || "$"} ${amount}
        </div>
        <button type="button" id="start-payment-button" onclick="makePayment()">Pay Now with Flutterwave</button>
      </form>
      <script>
        function makePayment() {
          FlutterwaveCheckout({
            public_key: "${fwPublicKey}",
            tx_ref: "${generateTxRef()}",
            amount: ${amount},
            currency: "${currency || "USD"}",
            payment_options: "card",
            meta: {
              source: "docs-inline-test",
              consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
              email: "${emailAddress}",
              phone_number: "${phoneNumber}",
              name: "${firstName} ${lastName}",
            },
            customizations: {
              title: "Splinx Wallet",
              description: "Fund Wallet",
              logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
            },
            callback: function (data){
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            },
            onclose: function() {
              window.ReactNativeWebView.postMessage("Payment cancelled!");
            }
          });
        }
      </script>
    </body>
  </html>
`;

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        <BackTopBar headline="Top up" func={handleBack} />

        <Text className="font-semibold text-lg text-center my-8">
          Balance {currencySymbol || "$"}
          {wallet?.balance?.toFixed(2) || "0.00"}
        </Text>

        <View>
          <CustomInput
            mb={24}
            placeholder="Amount"
            error={amountError}
            keyboardType="numeric"
            inputValue={amount}
            handleTextChange={handleAmount}
          />
          <CustomInput
            placeholder="Note"
            inputValue={note}
            handleTextChange={handleNote}
          />

          <View className="mt-28">
            {processing && <LoadingSpinner />}
            {isValid ? (
              <CustomButton label="Add Money" buttonFunc={handleAddMoney} />
            ) : (
              <CustomButton
                label="Add Money"
                backgroundColor={secondaryColor}
              />
            )}
          </View>
        </View>

        <Modal visible={webViewVisible} animationType="slide">
          <WebView
            originWhitelist={["*"]}
            source={{ html: flutterwaveHTML }}
            onMessage={handleMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </Modal>
      </SafeAreaView>

      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          onClose={handleDone}
          handleOk={handleDone}
          heading="Transaction Completed"
          message={`You have successfully fund your Wallet with: ${
            currencySymbol || "$"
          }${amount}. Enjoy your Splinx Wallet.`}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paymentButton: {
    backgroundColor: "#FF5C01",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddMoney;
