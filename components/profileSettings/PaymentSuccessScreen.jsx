import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";
import { AntDesign } from "@expo/vector-icons";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import CustomButton from "../CustomButton";

const PaymentSuccessScreen = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.navigate("ProfileHome");
  };

  // verify successful payment transaction

  const verifyPayment = () => {
  };


  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View style={styles.container}>
        <View>
          <AntDesign name="checkcircle" size={90} color={primeryColor} />
        </View>
        <Text style={styles.successText}>Payment Successful!</Text>

        <View className="mt-16">
          <CustomButton label="Done" buttonFunc={handleBackBtn}/>
        </View>
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
    marginTop: 40,
  },
});

export default PaymentSuccessScreen;
