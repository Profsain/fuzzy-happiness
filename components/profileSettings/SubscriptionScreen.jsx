import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
// flutterwave integration
import { WebView } from "react-native-webview";

import { primeryColor, secondBgColor } from "../../utils/appstyle";
import { AntDesign } from "@expo/vector-icons";

const SubscriptionScreen = ({ navigation, route }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile } = useLogin();
  const { emailAddress, firstName, lastName, phoneNumber } = userProfile;

  const [activeTab, setActiveTab] = useState("Platinum");
  const [planData, setPlanData] = useState({});
  const [processing, setProcessing] = useState(false);

  const receivedData = route.params.subscription;
  const { price, amount, description, planName, interval, id } = receivedData;

  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle create-plan request
  const handleCreatePlan = async (planName, amount, interval) => {
    // call create-plan and get the plan id
    try {
      const data = {
        name: planName,
        amount,
        interval,
        currency: "USD",
      };

      const response = await fetch(`${baseUrl}/flw-api/create-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        // update state
        setPlanData(data);
        console.log("Plan created successfully");
        return data;
      } else {
        console.log("Failed to create plan");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const initiatePayment = async (
    amount,
    email,
    name,
    phonenumber,
    description,
    payment_plan
  ) => {

    try {
      const response = await fetch(`${baseUrl}/flw-api/create-payment`, {
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
          payment_plan,
        }),
      });

      const data = await response.json();
      const { link } = data.data;
      // alert("Payment link: " + link);
      // const id = link.split("/").pop();
      navigation.navigate("PaymentScreen", { paymentLink: link });
    } catch (error) {
      console.error(error);
    }
  };

  // handle subscription
  const handleSubscription = async () => {
    setProcessing(true);
    try {
      //check activeTab is Baller
      // pass planName, amount, interval direct
      let plan = null;
      if (activeTab === "Platinum") {
        plan = await handleCreatePlan(planName, amount, interval);
      } else {
        const planName =
          "Splinx-Planet yearly subscription plan: Ballers upgrade 29.99 usd/month";
        const amount = 26.99;
        const interval = "monthly"
        plan = await handleCreatePlan(planName, amount, interval);
      }
      // const plan = await handleCreatePlan(planName, amount, interval);

      if (plan && plan.data.id) {
      
        await initiatePayment(
          plan.data.amount,
          emailAddress,
          `${firstName} ${lastName}`,
          phoneNumber,
          plan.data.name, // get planName from plan.data
          plan.data.id
        );
      } else {
        console.log("Failed to create payment");
        setProcessing(false);
      }
    } catch (error) {
      Alert.alert("Failed to subscribe");
      setProcessing(false);
    }

    // set processing to false
    setProcessing(false);
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
          <ScrollView>
            <View
              style={{ backgroundColor: primeryColor }}
              className="p-3 pb-0 my-4 rounded-xl h-40"
            >
              <Text className="text-xl font-bold text-white">Platinum</Text>
              <Text className="text-xs font-bold text-white">{price}</Text>

              <View className="mt-12">
                <View className="flex flex-row items-center">
                  <AntDesign name="gift" size={14} color="white" />
                  <Text className="text-xs text-white ml-2">{description}</Text>
                </View>
                <Image
                  source={require("../../assets/Vector.png")}
                  style={styles.overlayImage}
                />
              </View>
            </View>

            <View>
              <Text className="my-2 font-bold text-lg">Top Features</Text>

              <View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">Bill Splitting</Text>
                  <Text className="text-xs">
                    Platinum members can split bills seamlessly with an extended
                    grace period, allowing for more flexibility in managing
                    shared expenses.
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">Event Creation</Text>
                  <Text className="text-xs">
                    Platinum members can create events with advanced
                    customization options, including exclusive themes, custom
                    invitations, and event branding.
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">Recommendation</Text>
                  <Text className="text-xs">
                    Receive personalized event and venue recommendations based
                    on preferences, location, and past activity within the app.
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">Customer Support</Text>
                  <Text className="text-xs">
                    Access a priority support hotline with 24/7 assistance for
                    immediate and personalized problem resolution.
                  </Text>
                </View>
              </View>

              {/* subscribe button */}
              <View className="mt-8 mb-16">
                {/* show loading spinner */}
                {processing ? (
                  <LoadingSpinner />
                ) : (
                  <CustomButton
                    label="Subscribe Now"
                    buttonFunc={handleSubscription}
                  />
                )}

                <Text className="mt-8">
                  This is a 12 month plan. By proceeding you have read and agree
                  to the Terms and Conditions.
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View
              style={{ backgroundColor: primeryColor }}
              className="p-3 pb-0 my-4 rounded-xl h-40"
            >
              <Text className="text-xl font-bold text-white">Ballers</Text>
              <Text className="text-xs font-bold text-white">$29.99/month</Text>

              <View className="mt-12">
                <View className="flex flex-row items-center">
                  <AntDesign name="gift" size={14} color="white" />
                  <Text className="text-xs text-white ml-2">
                    3 days trial then $29.99/month.
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Vector.png")}
                  style={styles.overlayImage}
                />
              </View>
            </View>

            <View>
              <Text className="my-2 font-bold text-lg">Top Features</Text>

              <View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">
                    Elite Community Access
                  </Text>
                  <Text className="text-xs">
                    Join and create elite, invitation-only communities, ensuring
                    a highly curated and exclusive social circle within the app.
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">Media</Text>
                  <Text className="text-xs">
                    Experience the ability to not only view but also download
                    images and videos whenever you want as a Baller.
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">
                    Profile Enhancement Tools
                  </Text>
                  <Text className="text-xs">
                    Access tools for enhanced profile customization, allowing
                    Ballers to showcase their status with unique badges, premium
                    backgrounds, and exclusive profile elements.
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-sm font-bold">
                    Early Product Testing
                  </Text>
                  <Text className="text-xs">
                    Get early access to beta features and product testing,
                    allowing Ballers to influence the direction of the app.
                  </Text>
                </View>
              </View>

              {/* subscribe button */}
              <View className="my-8">
                {/* show loading spinner */}
                {processing ? (
                  <LoadingSpinner />
                ) : (
                  <CustomButton
                    label="Subscribe Now"
                    buttonFunc={handleSubscription}
                  />
                )}

                <Text>
                  This is a 12 month plan. By proceeding you have read and agree
                  to the Terms and Conditions.
                </Text>
              </View>
            </View>
          </ScrollView>
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
    borderBottomColor: secondBgColor,
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
  overlayImage: {
    position: "absolute",
    width: 50,
    height: 50,
    left: 250,
  },
});

export default SubscriptionScreen;
