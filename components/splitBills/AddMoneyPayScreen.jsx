import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const AddMoneyPayScreen = ({navigation, route}) => {
  const { paymentLink } = route.params;

  const handleNavigationStateChange = (navState) => {
    // check how to get and pass navState
    if (navState.url.includes("https://your-app.com/wallet-payment-success")) {
      // get id
      const id = paymentLink.split("/").pop();
      alert("Payment successful with id: " + id);
      // send id to Payment success screen to verify transaction
      navigation.navigate("AddMoneySuccess");
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

export default AddMoneyPayScreen;
