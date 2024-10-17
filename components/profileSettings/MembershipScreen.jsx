import React, { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  VStack,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
} from "@gluestack-ui/themed";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";
import { primeryColor, secondBgColor } from "../../utils/appstyle";
import convertCurrency from "../../utils/convertCurrency";

const MembershipScreen = ({ navigation }) => {
  const { userProfile, subscriptionPlans, isLocked } = useLogin();
  // Alert.alert("Locked", isLocked ? "Locked" : "Not Locked");

  const { currencySymbol, currency, subscriptionPlan, isSubscriber } = userProfile;
  const [subscriptionData, setSubscriptionData] = useState(subscriptionPlans);
  const [values, setValues] = useState(subscriptionData[0].type); // Set initial value to the first subscription type
  const [convertedAmounts, setConvertedAmounts] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rates = {};
      for (const item of subscriptionData) {
        if (currency !== "USD") {
          const convertedAmount = await convertCurrency(
            item.amount,
            "USD",
            currency
          );
          rates[item._id] = Math.ceil(convertedAmount) ;
        }
      }
      setConvertedAmounts(rates);
    };
    fetchExchangeRates();
  }, [currency]);

  // handle back button
  const handleBackBtn = () => {
    // isLocked return
    if (isLocked) {
      Alert.alert("Subscription", "You are not allowed to access this screen");
      return;
    }
    // navigate back
    navigation.goBack();
  };

  // handle subscription
  const handleSubscription = () => {
    // find subscription data
    const subscription = subscriptionData.find(
      (item) => item.planName === values
    );

    // check subscription data
    if (!subscription) {
      Alert.alert("Subscription", "Please select a subscription plan");
      return;
    }
    
    // navigate to subscription screen and pass data
    navigation.navigate("SubscriptionScreen", { subscription });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackTopBar headline="Select Plan" icon2="" func={handleBackBtn} />

      <ScrollView className="mt-16">
        <RadioGroup value={values} onChange={setValues}>
          <VStack space="sm">
            {subscriptionData.map((item) => (
              <Radio key={item._id} value={item.planName}>
                <View
                  style={styles.radioItem}
                  className="flex justify-center border border-slate-300 w-full p-4 rounded-lg"
                >
                  <View>
                    {/* Show active status */}
                    {isSubscriber && subscriptionPlan === item.planName && (
                      <View className="flex justify-start flex-row items-center">
                        <Text className="text-xs mr-4 font-bold text-orange-200">
                          Active
                        </Text>
                        <AntDesign
                          name="checkcircleo"
                          size={12}
                          color={primeryColor}
                        />
                      </View>
                    )}

                    <Text className="font-medium text-lg">{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>
                      {currency !== "USD" && convertedAmounts[item._id]
                        ? `${currencySymbol || ""} ${convertedAmounts[
                            item._id
                          ].toFixed(2)}`
                        : null}
                    </Text>
                  </View>
                  <RadioIndicator style={styles.radioIndicator}>
                    <RadioIcon style={styles.radioIcon} as={CircleIcon} />
                  </RadioIndicator>
                </View>
              </Radio>
            ))}
          </VStack>
        </RadioGroup>

        <View className="my-6">
          <CustomButton label="Subscribe Now" buttonFunc={handleSubscription} />
        </View>
      </ScrollView>
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
  radioContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 20,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  radioIndicator: {
    marginLeft: 10,
    borderColor: secondBgColor,
  },

  radioIcon: {
    backgroundColor: "white",
    color: primeryColor,
  },
});

export default MembershipScreen;
