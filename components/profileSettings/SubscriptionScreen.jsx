import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import { WebView } from "react-native-webview";
import sendPushNotification from "../../utils/sendPushNotification";
import SuccessBottomSheet from "../splitBills/component/SuccessBottomSheet";
import { primeryColor, secondBgColor } from "../../utils/appstyle";
import { AntDesign } from "@expo/vector-icons";
import convertCurrency from "../../utils/convertCurrency";

const SubscriptionScreen = ({ navigation, route }) => {
  // base url
  const baseUrl = process.env.BASE_URL;
  const fwPublicKey = process.env.FW_PUBLIC_KEY;

  // extract from useLogin context
  const { userProfile, token, promoCodes } = useLogin();
  const {
    emailAddress,
    firstName,
    lastName,
    phoneNumber,
    currencySymbol,
    currency,
  } = userProfile;
  const receivedData = route.params.subscription;
  const { price, amount, description, planName, interval, title, id } =
    receivedData;

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [activeTab, setActiveTab] = useState("Platinum");
  const [planData, setPlanData] = useState({});
  const [processing, setProcessing] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promoCode, setPromoCode] = useState(null);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // check if currency is not USD and convert amount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (currency !== "USD") {
        const convertedAmount = await convertCurrency(amount, "USD", currency);
        setConvertedAmount(Math.ceil(convertedAmount));
      } else {
        setConvertedAmount(null);
      }
    };

    fetchExchangeRates();
  }, [currency]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle bottom sheet done
  const handleDone = () => {
    toggleModal();
    navigation.navigate("ProfileHome");
  };

  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
    // set active tab to null
    setActiveTab("Platinum");
  };

  // handle create-plan request
  const handleCreatePlan = async (planName, amount, interval) => {
    // call create-plan and get the plan id
    try {
      const data = {
        name: planName,
        amount,
        interval,
        currency: currency || "USD",
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

  // new implementation
  // Handle plan update
  const handleUpdatePlan = async () => {
    // Make API call
    try {
      // update isSubscriber and subscriptionPlan
      const updateData = {
        isSubscriber: true,
        subscriptionPlan: planData.data.name,
      };

      const response = await fetch(
        `${baseUrl}/user/update-user/${userProfile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();
    } catch (error) {
      Alert.alert("Network Error", JSON.stringify(error));
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
        // update subscription plan balance
        await handleUpdatePlan();
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
          Complete your payment to subscribe to: ${planData?.data?.name}
        </div>
        <div class="order-details">
         Amount to be paid : ${currencySymbol} ${convertedAmount || amount}
        </div>
        <button type="button" id="start-payment-button" onclick="makePayment()">Pay Now with Flutterwave</button>
      </form>
      <script>
        function makePayment() {
          FlutterwaveCheckout({
            public_key: "${fwPublicKey}",
            tx_ref: "${generateTxRef()}",
            amount: "${planData?.data?.amount}",
            currency: "${currency || "USD"}",
            payment_plan: "${planData?.data?.id}",
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

  // Handle apply promo code
  const handleApplyPromoCode = async () => {
    // Check if the promoCode and amount are valid
    if (!promoCode) {
      Alert.alert("Please enter a promo code");
      return;
    }

    if (!amount || amount <= 0) {
      Alert.alert("Invalid amount");
      return;
    }

    // Find the matching promo code from the available promo codes
    const promo = promoCodes.find((item) => item.promoCode === promoCode);

    // Check if the promo code exists and is active
    if (!promo) {
      Alert.alert("Invalid promo code");
      return;
    }

    if (promo.status !== "active") {
      Alert.alert("This promo code is inactive");
      return;
    }

    // Apply the promo code and calculate the new discounted amount
    const discount = promo.discountPercent;
    const newAmount = amount - (amount * discount) / 100;

    // convert amount if currency is not USD
    if (currency !== "USD") {
      const convertedAmount = await convertCurrency(newAmount, "USD", currency);
      setConvertedAmount(Math.ceil(convertedAmount));
      setIsPromoApplied(true);
    } else {
      setConvertedAmount(newAmount);
      setIsPromoApplied(true);
    }
    setPromoCode(null);

    Alert.alert("Promo code applied successfully!", "Discount applied");
  };

  // handle subscription
  const handleSubscription = async () => {
    setProcessing(true);
    setIsPromoApplied(false);
    try {
      //check activeTab is Baller
      // pass planName, amount, interval direct
      let plan = null;
      if (activeTab === "Platinum") {
        const planAmount = convertedAmount ? convertedAmount : amount;
        plan = await handleCreatePlan(planName, planAmount, interval);
      } else if (activeTab === "Ballers") {
        const planName =
          "Splinx-Planet yearly subscription plan: Ballers upgrade 14.99 usd/month";
        const amount = 14.99;
        const interval = "monthly";
        plan = await handleCreatePlan(planName, amount, interval);
      }

      if (plan && plan.data.id) {
        setWebViewVisible(true);
      } else {
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
    <>
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
              Your Plan
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
            ></Text>
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
                <Text className="text-xl font-bold text-white">{title}</Text>
                {convertedAmount ? (
                  <Text className="text-xs font-bold text-white">
                    {currencySymbol}
                    {convertedAmount?.toFixed(2)}/month
                  </Text>
                ) : (
                  <Text className="text-xs font-bold text-white">{price}</Text>
                )}

                <View className="mt-12">
                  <View className="flex flex-row items-center">
                    <AntDesign name="gift" size={14} color="white" />
                    <Text className="text-xs text-white ml-2">
                      {description}
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
                    <Text className="text-sm font-bold">Bill Splitting</Text>
                    <Text className="text-xs">
                      Platinum members can split bills seamlessly with an
                      extended grace period, allowing for more flexibility in
                      managing shared expenses.
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
                      on preferences, location, and past activity within the
                      app.
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

                {/* promo code input and button */}
                <View className="my-8">
                  <Text className="text-sm font-bold">Promo Code</Text>
                  {/* new price after promo code */}
                  {isPromoApplied && (
                    <Text className="text-sm font-bold my-2">
                      {currencySymbol} {convertedAmount}
                    </Text>
                  )}
                  <View className="flex flex-row items-center">
                    <TextInput
                      className="border-2 border-gray-300 rounded-lg p-2 w-3/4 mr-1"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChangeText={(text) => setPromoCode(text)}
                    />
                    <CustomButton
                      label="Apply"
                      width={70}
                      mt={4}
                      buttonFunc={handleApplyPromoCode}
                    />
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
                    This is a 12 month plan. By proceeding you have read and
                    agree to the Terms and Conditions.
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
                <Text className="text-xs font-bold text-white">
                  $14.99/month
                </Text>

                <View className="mt-12">
                  <View className="flex flex-row items-center">
                    <AntDesign name="gift" size={14} color="white" />
                    <Text className="text-xs text-white ml-2">
                      {description}
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
                      Join and create elite, invitation-only communities,
                      ensuring a highly curated and exclusive social circle
                      within the app.
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
                      Ballers to showcase their status with unique badges,
                      premium backgrounds, and exclusive profile elements.
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

                {/* promo code input and button */}
                <View className="my-8">
                  <Text className="text-sm font-bold">Promo Code</Text>
                  <View className="flex flex-row items-center">
                    <TextInput
                      className="border-2 border-gray-300 rounded-lg p-2 w-3/4 mr-2"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChangeText={(text) => setPromoCode(text)}
                    />
                    <CustomButton
                      label="Apply"
                      width={60}
                      mt={4}
                      buttonFunc={handleApplyPromoCode}
                    />
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
                    This is a 12 month plan. By proceeding you have read and
                    agree to the Terms and Conditions.
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>

        {/* modal screen */}
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

      {/* success bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          onClose={handleDone}
          handleOk={handleDone}
          heading="Subscription Successful"
          message={`Enjoy Splinx premium features!`}
        />
      )}
    </>
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
