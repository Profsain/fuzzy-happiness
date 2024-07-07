import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";
// mock data
import subscriptionData from "./subscriptionData";
import { primeryColor, secondBgColor } from "../../utils/appstyle";

const SubscriptionScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("Platinum");
  const receivedData = route.params.subscription;

  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle subscription
  const handleSubscription = () => {
    // navigate to subscription screen
    alert(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackTopBar headline="Subscribe Now" icon2="" func={handleBackBtn} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Platinum" && styles.activeTab]}
          onPress={() => setActiveTab("Platinum")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Platinum" && styles.activeTabText,
            ]}
          >
            Platinum
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Ballers" && styles.activeTab]}
          onPress={() => setActiveTab("Ballers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Ballers" && styles.activeTabText,
            ]}
          >
            Ballers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render content based on active tab */}
      <View style={styles.content}>
        {activeTab === "Platinum" ? (
          <Text>Platinum Plan Details...</Text>
        ) : (
          <Text>Ballers Plan Details...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: secondBgColors,
  },
  tabText: {
    fontSize: 16,
    color: "black",
  },
  activeTabText: {
    color: primeryColor,
    fontWeight: "bold",
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  content: {
    flex: 1,
    marginTop: 8,
  },
});

export default SubscriptionScreen;
