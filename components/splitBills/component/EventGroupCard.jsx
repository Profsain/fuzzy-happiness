import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../../context/LoginProvider";
import AvatarStack from "./AvatarStack";
import { primeryColor, secondaryColor } from "../../../utils/appstyle";
import shortenValue from "../../../utils/shortenValue";
import CustomButton from "../../CustomButton";

const EventGroupCard = ({
  eventName,
  eventCreator,
  totalPaidByMembers,
  eventDate,
  eventCost,
  currency,
  eventLocation,
  eventId,
  func,
}) => {
  const { token } = useLogin();
  const baseUrl = process.env.BASE_URL;

  const [modalVisible, setModalVisible] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // convert date to dd/mm/yyyy
  const date = new Date(eventDate);
  const formattedEventDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  // Check if the event date has passed
  const currentDate = new Date();
  const isEventDatePassed = date < currentDate;

  // handle withdraw button
  const handleWithdraw = () => {
    setModalVisible(true);
  };

  // handle modal actions
  const handleSubmitRequest = async () => {
    setLoading(true);
    // Ensure required fields are filled
    if (!bankName || !accountNumber) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        eventName,
        creatorId: eventCreator,
        eventCost,
        totalPaidByMembers,
        bankName,
        accountNumber,
        eventId,
      };

      // Show request data for debugging (if needed)
      // Alert.alert("Request Data", JSON.stringify(requestData));

      // Make the API request
      const response = await fetch(`${baseUrl}/withdrawal/withdraw-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      // Alert.alert("Success", JSON.stringify(response));
      if (response.ok) {
        // Close the modal and show success alert
        setLoading(false);
        setBankName("");
        setAccountNumber("");
        setModalVisible(false);
        Alert.alert("Success", "Withdrawal request submitted successfully.");
      } else {
        // Handle non-200 responses
        const error = await response.json();
        Alert.alert("Request", "Withdrawal request already submitted.");
        setLoading(false);
        setBankName("");
        setAccountNumber("");
        setModalVisible(false);
      }
    } catch (error) {
      // Catch and handle any other errors
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleCancelRequest = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={func}>
        <View className="bg-gray-100 rounded-lg mb-4">
          <View
            className="flex flex-row content-center justify-between items-center py-2 px-4 rounded-t-lg"
            style={{ backgroundColor: primeryColor }}
          >
            <Text className="text-white font-medium text-base">
              {eventName.slice(0, 20) || ""}
            </Text>
            <Text className="text-white font-normal text-xs">
              {formattedEventDate || "dd/mm/yyyy"}
            </Text>
          </View>

          <View className="p-5">
            <View className="flex flex-row content-center items-center ">
              <Text className="font-normal pr-12">Bill Total</Text>
              <Text className="font-semibold text-base">
                {currency || "$"}
                {shortenValue(eventCost?.toFixed(2)) || "0.00"}
              </Text>
            </View>
            <View className="flex flex-row content-center items-center ">
              <Text className="font-normal pr-8">Total Paid</Text>
              <Text className="font-semibold text-base">
                {currency || "$"}
                {shortenValue(eventCost?.toFixed(2)) || "0.00"}
              </Text>
            </View>
            <View className="flex flex-row content-center items-center mt-3">
              <Text className="font-normal pr-8">Location</Text>
              <Text className="font-xm">
                {eventLocation.slice(0, 20) || ""}
              </Text>
            </View>

            <View className="flex flex-row justify-between mt-4 items-center">
              {isEventDatePassed ? (
                <CustomButton
                  width={90}
                  height={28}
                  label="Withdraw"
                  fSize={12}
                />
              ) : (
                <CustomButton
                  width={90}
                  height={28}
                  label="Can't Withdraw"
                  fSize={12}
                  backgroundColor={secondaryColor}
                  buttonFunc={handleWithdraw} // to be removed
                />
              )}

              <AvatarStack hw={28} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Withdraw Request Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Withdraw Request</Text>
            <Text style={styles.modalText}>Event: {eventName}</Text>
            <Text style={styles.modalText}>
              Withdraw Amount: {currency || "$"}
              {shortenValue(eventCost?.toFixed(2)) || "0.00"}
            </Text>

            {/* Bank Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter Bank Name"
              value={bankName}
              onChangeText={setBankName}
            />

            {/* Account Number Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />

            {loading && <ActivityIndicator size="small" color={primeryColor} />}
            <View style={styles.modalButtons}>
              <CustomButton
                width={120}
                height={40}
                label="Cancel"
                fSize={14}
                backgroundColor={secondaryColor}
                color="gray"
                buttonFunc={handleCancelRequest}
              />
              <CustomButton
                width={120}
                height={40}
                label="Submit Request"
                fSize={14}
                buttonFunc={handleSubmitRequest}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});

export default EventGroupCard;
