import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  VStack,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
} from "@gluestack-ui/themed";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { BackTopBar } from "../home";
import CustomButton from "../CustomButton";
// mock data
import subscriptionData from "./subscriptionData";
import { primeryColor, secondBgColor } from "../../utils/appstyle";

const MembershipScreen = ({navigation}) => {
  const [values, setValues] = useState("monthly");

  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle subscription
  const handleSubscription = () => {
    // find subscription data
    const subscription = subscriptionData.find((item) => item.type === values);
    
    // navigate to subscription screen and pass data
    navigation.navigate("SubscriptionScreen", { subscription });
    alert(subscription.description);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackTopBar headline="Select Plan" icon2="" func={handleBackBtn} />

      <View className="mt-16">
        <RadioGroup value={values} onChange={setValues}>
          <VStack space="sm">
            <Radio value="monthly">
              <View
                style={styles.radioItem}
                className="flex justify-center border border-slate-300 w-full p-4 rounded-lg"
              >
                <View>
                  <Text className="font-medium text-lg">Platinum</Text>
                  <Text>3 days trial then £9.99/month.</Text>
                </View>
                <RadioIndicator style={styles.radioIndicator}>
                  <RadioIcon style={styles.radioIcon} as={CircleIcon} />
                </RadioIndicator>
              </View>
            </Radio>
            <Radio value="six-months">
              <View
                style={styles.radioItem}
                className="flex justify-center border border-slate-300 w-full p-4 rounded-lg"
              >
                <View>
                  <Text className="font-medium text-lg">Platinum</Text>
                  <Text>3 days trial then £53.94/6 months.</Text>
                </View>
                <RadioIndicator style={styles.radioIndicator}>
                  <RadioIcon style={styles.radioIcon} as={CircleIcon} />
                </RadioIndicator>
              </View>
            </Radio>
            <Radio value="one-year">
              <View
                style={styles.radioItem}
                className="flex justify-center border border-slate-300 w-full p-4 rounded-lg"
              >
                <View>
                  <Text className="font-medium text-lg">Platinum</Text>
                  <Text>3 days trial then £95.88/1 year.</Text>
                </View>
                <RadioIndicator style={styles.radioIndicator}>
                  <RadioIcon style={styles.radioIcon} as={CircleIcon} />
                </RadioIndicator>
              </View>
            </Radio>
          </VStack>
        </RadioGroup>

        <View className="mt-28">
          <CustomButton
            label="Start 3 days trial"
            buttonFunc={handleSubscription}
          />
        </View>
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
