import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";

import SuccessBottomSheet from "./component/SuccessBottomSheet";
import { useLogin } from "../../context/LoginProvider";

const AddMoneySuccess = ({ navigation }) => {
  // base URL
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const {_id, emailAddress, firstName, lastName, phoneNumber} = userProfile;

  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);

  // verify funding payment and update user database

  // handle bottom sheet done btn
  const handleDoneBtn = () => {
    setIsModalVisible(!isModalVisible);
    navigation.navigate("TransactionScreen")
  }

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        <SuccessBottomSheet isVisible={isModalVisible} onClose={handleDoneBtn} />
      </SafeAreaView>
    </>
  );
};

export default AddMoneySuccess;
