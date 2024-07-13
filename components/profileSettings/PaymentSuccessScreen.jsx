import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";

const PaymentSuccessScreen = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View style={styles.container}>
        <Text style={styles.successText}>Payment Successful!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});

export default PaymentSuccessScreen;
