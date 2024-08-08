import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";

import SuccessBottomSheet from "./component/SuccessBottomSheet";
import { useLogin } from "../../context/LoginProvider";

const AddMoneySuccess = ({ navigation }) => {
  // base URL
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const {_id, emailAddress, firstName, lastName, phoneNumber} = userProfile;

  // component state
  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        <SuccessBottomSheet isVisible={isModalVisible} onClose={toggleModal} />
      </SafeAreaView>

      {/* bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet isVisible={isModalVisible} onClose={toggleModal} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paymentButton: {
    backgroundColor: "#FF5C01",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddMoneySuccess;
