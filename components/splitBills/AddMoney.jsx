import { View, Text, SafeAreaView } from "react-native";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { toggleOpenTopUpScreen } from "../../store/openScreenSlice";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import SuccessBottomSheet from "./component/SuccessBottomSheet";

const AddMoney = () => {
  const dispatch = useDispatch();

  // handle back to prev screen when device back button press
  useBackHandler([() => dispatch(toggleOpenTopUpScreen())]);

  // component state
  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // handle add money
  const handleAddMoney = () => {
    toggleModal();
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar
          headline="Top up"
          func={() => dispatch(toggleOpenTopUpScreen())}
        />

        {/* wallet balance */}
        <Text className="font-semibold text-lg text-center my-8">
          Balance $200.00
        </Text>

        {/* add money section */}
        <CustomInput mb={24} placeholder="Amount" keyboardType="numeric" />
        <CustomInput placeholder="Note" />

        {/* add money button */}
        <View className="mt-28">
          <CustomButton label="Add Money" buttonFunc={handleAddMoney} />
        </View>
      </SafeAreaView>

      {/* bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet isVisible={isModalVisible} onClose={toggleModal} />
      )}
    </>
  );
};

export default AddMoney;
