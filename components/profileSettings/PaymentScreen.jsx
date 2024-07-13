import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const PaymentScreen = ({navigation, route}) => {
  const { paymentLink } = route.params;

  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes("https://your-app.com/payment-success")) {
      navigation.navigate("PaymentSuccessScreen");
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
