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
import { useLogin } from "../../context/LoginProvider";

const ChangePassword = ({ navigation }) => {
  // extract from useLogin context
  const { userProfile, token } = useLogin();

  // base url
  const baseUrl = process.env.BASE_URL;

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
  const handleChangePassword = async () => {
    setProcessing(true);

    // Prepare data to be sent
    const data = {
      newPassword: password,
      emailAddress: currentEmail,
    };

    // Send data to server
    try {
      const response = await fetch(
        `${baseUrl}/user/change-password/${userProfile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert("Success", "Password changed successfully");
        setProcessing(false);
        navigation.goBack();
      } else {
        Alert.alert("Error", result.error || result.message);
        setProcessing(false);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again");
      setProcessing(false);
    }
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
