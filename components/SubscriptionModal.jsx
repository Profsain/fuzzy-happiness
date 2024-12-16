import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { secondaryColor } from "../navigation/utils/appstyle";

const SubscriptionModal = ({ visible, daysLeft, onSubscribe, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Free Trial</Text>
          {daysLeft > 0 ? (
            <View>
              <Text style={{ marginVertical: 10 }}>
                You have {daysLeft} day(s) left on your free trial.
              </Text>

              <View className="flex items-center pt-8">
                <CustomButton
                  width={180}
                  height={40}
                  label="Close"
                  fSize={14}
                  backgroundColor={secondaryColor}
                  color="gray"
                  buttonFunc={onClose}
                />
              </View>
            </View>
          ) : (
            <View>
              <Text style={{ marginVertical: 10 }}>
                Your free trial has expired. Please subscribe to continue.
              </Text>
              <View className="flex items-center pt-8">
                <CustomButton
                  width={180}
                  height={40}
                  label="Subscribe Now"
                  fSize={14}
                  buttonFunc={onSubscribe}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SubscriptionModal;
