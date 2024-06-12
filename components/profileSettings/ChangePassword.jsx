import { useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { BackTopBar } from "../home";
import PasswordInput from "../PasswordInput";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import { secondaryColor } from "../../utils/appstyle";
// functions
import handlePasswordChange from "../../utils/handlePasswordChange";
import handleConfirmPasswordChange from "../../utils/handleConfirmPassword";
import handleEmailChange from "../../utils/handleEmailChange";

const ChangePassword = ({ navigation }) => {
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [isAllValid, setIsAllValid] = useState(false); // to check if all inputs are valid
  const [currentEmail, setCurrentEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [processing, setProcessing] = useState(false); // to check if form is processing

  // handle change password
  const handleChangePassword = () => {
    setProcessing(true);

    // update password
    const data = {
      password,
      email: currentEmail,
    };

    Alert.alert(
      "Password Changed",
      "Your password has been changed successfully",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );

    // reset processing
    setProcessing(false);

    // navigate to next screen
    // navigation.navigate("PersonalInfoScreen", data);
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Change Password" icon2="" func={handleBackBtn} />

      {/* input field section */}
      <View className="mt-14">
        <CustomInput
          placeholder="Enter current email"
          mb={28}
          type="email"
          handleTextChange={(text) =>
            handleEmailChange(
              text,
              setCurrentEmail,
              setEmailError,
              setIsAllValid
            )
          }
          error={emailError}
        />

        <PasswordInput
          mb={28}
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Enter new password"
          inputValue={password}
          handleTextChange={(text) =>
            handlePasswordChange(text, setPassword, setPasswordError)
          }
          error={passwordError}
        />

        <PasswordInput
          showPassword={showPassword}
          handleState={handleState}
          placeholder="Confirm Password"
          inputValue={confirmPassword}
          handleTextChange={(text) =>
            handleConfirmPasswordChange(
              text,
              password,
              setConfirmPassword,
              setConfirmPasswordError,
              setIsAllValid
            )
          }
          error={confirmPasswordError}
        />
      </View>

      {/* change password button */}
      <View className="mt-14">
        {/* loading spinner */}
        {processing && <LoadingSpinner />}
        
        {!isAllValid ? (
          <CustomButton
            label="Change Password"
            backgroundColor={secondaryColor}
            color="#000"
          />
        ) : (
          <CustomButton
            label="Change Password"
            buttonFunc={handleChangePassword}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
