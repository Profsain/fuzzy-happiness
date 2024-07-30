import { View, Text, SafeAreaView } from "react-native";
import React, {useState} from "react";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import SuccessBottomSheet from "./component/SuccessBottomSheet";

const TransferMoney = ({navigation}) => {

  // handle back to prev screen when device back button press
  const handleBack = () => {
    navigation.goBack();
  }

  // component state
  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // handle add money
  const handleTransfer = () => {
    toggleModal();
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Transfer Money" func={handleBack} />

        {/* wallet balance */}
        <Text className="font-semibold text-lg text-center my-8">
          Balance $200.00
        </Text>

        {/* add money section */}
        <CustomInput mb={24} placeholder="Amount" keyboardType="numeric" />
        <CustomInput mb={24} placeholder="Receiver Splinx ID" />
        <CustomInput placeholder="Note" />

        {/* add money button */}
        <View className="mt-28">
          <CustomButton label="Transfer" buttonFunc={handleTransfer} />
        </View>
      </SafeAreaView>

      {/* bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          onClose={toggleModal}
          heading="Transfer Completed"
          message="Transfer successful: $50.00 sent to pascal"
        />
      )}
    </>
  );
};


export default TransferMoney