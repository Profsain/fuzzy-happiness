import React from "react";
import { Alert, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import verifyTransaction from "../../utils/verifyTransaction";
import { useLogin } from "../../context/LoginProvider";

const PaymentScreen = ({navigation, route}) => {
  const { paymentLink } = route.params;
  const { userProfile, token } = useLogin

  const handleNavigationStateChange = async (navState) => {
    // const successURL = 'https://mysite.com/payment-success';
    // check how to get and pass navState
    try {
      if (navState.url.includes('https://mysite.com/payment-success')) {
        // get id
        const transactionId = paymentLink.split("/").pop();
        alert("Payment successful with id: " + id);
        // verify transaction
        const verifyPayment = await verifyTransaction(transactionId);
        if (verifyPayment.status === "success") {
          // update user subscription
          Alert.alert("Payment Successful", JSON.stringify(verifyPayment));
          // navigation.navigate("PaymentSuccessScreen");
        }
        navigation.navigate("PaymentSuccessScreen");
      }
    } catch (error) {
      console.log(error);
    }

    
  };
 
    return (
     <SafeAreaView className="flex-1 px-6 pt-16 bg-white">
        <WebView
          source={{ uri: paymentLink }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </SafeAreaView>
    );
};

export default PaymentScreen;
