// import React from "react";
// import { SafeAreaView } from "react-native";
// import { WebView } from "react-native-webview";

// const AddMoneyPayScreen = ({navigation, route}) => {
//   const { paymentLink, data } = route.params;

//   const handleNavigationStateChange = (navState) => {
//     // check how to get and pass navState
//     if (navState.url.includes("https://your-app.com/wallet-payment-success")) {
//       // get id
//       const transactionId = paymentLink.split("/").pop();

//       // send id to Payment success screen to verify transaction
//       navigation.navigate("AddMoneySuccess", {data, transactionId});
//     }
//   };

//     return (
//      <SafeAreaView className="flex-1 px-6 pt-16 bg-white">
//         <WebView
//           source={{ uri: paymentLink }}
//           onNavigationStateChange={handleNavigationStateChange}
//         />
//       </SafeAreaView>
//     );
// };

// export default AddMoneyPayScreen;

import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const AddMoneyPayScreen = ({ navigation, route }) => {
  const { paymentLink, data } = route.params;

  const handleNavigationStateChange = (navState) => {
    // Check for the redirect URL in the WebView navigation state
    if (
      navState.url ===
      "com.splinxplanet.app/wallet-payment-success"
    ) {
      // Extract transaction ID from the URL if needed
      const transactionId = new URL(navState.url).searchParams.get(
        "transaction_id"
      );

      // Send transaction ID and data to AddMoneySuccess screen
      navigation.navigate("AddMoneySuccess", { data, transactionId });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <WebView
        source={{ uri: paymentLink }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default AddMoneyPayScreen;
