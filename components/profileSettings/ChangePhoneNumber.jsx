import { useState } from "react";
import { Text, SafeAreaView, View, Alert } from "react-native";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { secondaryColor } from "../../utils/appstyle";

const ChangePhoneNumber = ({ navigation }) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle phone number validation
  const handlePhoneValidation = () => {
    if (newPhoneNumber.length < 10) {
      setPhoneNumberError("Phone number must be at least 10 digits");
    } else if (newPhoneNumber === "") {
      setPhoneNumberError("Phone number is required");
    } else {
      setPhoneNumberError("");
      setIsValid(true);
    }
  };

  // handle phone number change
  const handlePhoneNumberChange = (text) => {
    setNewPhoneNumber(text);
    handlePhoneValidation();
  };

  // handle confirm changes
  const handleConfirmChanges = () => {
    if (isValid) {
      // navigate to verification screen
      navigation.navigate("VerifyNumber", { newPhoneNumber });
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar
        headline="Change Phone Number"
        icon2=""
        func={handleBackBtn}
      />

      <View className="my-16">
        <CustomInput
          type="tel"
          keyboardType={"phone-pad"}
          error={phoneNumberError}
          handleTextChange={handlePhoneNumberChange}
          placeholder="Enter new number"
          mb={48}
        />

        <View className="flex justify-center items-center">
          <Text className="text-sm text-gray-400 mb-12">
            A verification code will be sent to your new number
          </Text>

          {isValid ? (
            <CustomButton
              label="Confirm Changes"
              buttonFunc={handleConfirmChanges}
            />
          ) : (
            <CustomButton
              label="Confirm Changes"
              backgroundColor={secondaryColor}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePhoneNumber;
