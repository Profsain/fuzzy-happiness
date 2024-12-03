import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../../CustomButton";
import { primaryColor, secondaryColor } from "../../../utils/appstyle";
import shortenValue from "../../../utils/shortenValue";

const WithdrawalRequestModal = ({
  modalVisible,
  setModalVisible,
  eventName,
  eventCost,
  currency,
  eventId,
  eventCreator,
  onSubmitRequest,
}) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitRequest = async () => {
    setLoading(true);

    // Ensure required fields are filled
    if (!bankName || !accountNumber) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
      setLoading(false);
      return;
    }

    const requestData = {
      eventName,
      creatorId: eventCreator,
      eventCost,
      bankName,
      accountNumber,
      eventId,
    };

    // Pass the request data to the onSubmitRequest function
    await onSubmitRequest(requestData);

    setLoading(false);
    setBankName("");
    setAccountNumber("");
    setModalVisible(false);
  };

  const handleCancelRequest = () => {
    setModalVisible(false);
  };

  return (
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

          {loading && <ActivityIndicator size="small" color={primaryColor} />}

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

export default WithdrawalRequestModal;
