import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { BackTopBar } from "../home";
import PasswordInput from "../PasswordInput";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import { secondaryColor } from "../../utils/appstyle";
import handlePasswordChange from "../../utils/handlePasswordChange";
import handleConfirmPasswordChange from "../../utils/handleConfirmPassword";
import handleEmailChange from "../../utils/handleEmailChange";
import { useLogin } from "../../context/LoginProvider";

const Label = ({ text }) => (
  <Text style={{ fontSize: 14, color: "#444", marginBottom: 4 }}>{text}</Text>
);

const EditProfile = ({ navigation }) => {
  const { userProfile, setUserProfile, token } = useLogin();
  const baseUrl = process.env.BASE_URL;

  const handleBackBtn = () => navigation.goBack();

  const [firstName, setFirstName] = useState(userProfile.firstName || "");
  const [lastName, setLastName] = useState(userProfile.lastName || "");
  const [age, setAge] = useState(userProfile.age?.toString() || "");
  const [bio, setBio] = useState(userProfile.bio || "");
  const [homeAddress, setHomeAddress] = useState(userProfile.homeAddress || "");
  const [city, setCity] = useState(userProfile.city || "");

  const [currentEmail, setCurrentEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    setProcessing(true);
    try {
      const profileData = {
        firstName,
        lastName,
        age: parseInt(age),
        bio,
        homeAddress,
        city,
      };
     
      const response = await fetch(
        `${baseUrl}/user/update-user/${userProfile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");

        // Update user profile in context
        const updatedProfile = {
          ...userProfile,
          firstName,
          lastName,
          age: parseInt(age),
          bio,
          homeAddress,
          city,
        };
        setUserProfile(updatedProfile);

        navigation.goBack();
      } else {
        throw new Error(result.error || "Failed to update profile");
      }
    } catch (error) {
      Alert.alert("Error", "Connection error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <BackTopBar headline="Edit Profile" icon2="" func={handleBackBtn} />

        <View className="mt-10 space-y-5">
          <View>
            <Label text="First Name" />
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
            />
          </View>

          <View className="mt-4">
            <Label text="Last Name" />
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
            />
          </View>

          <View className="mt-4">
            <Label text="Age" />
            <TextInput
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={age}
              onChangeText={setAge}
              placeholder="Enter age"
            />
          </View>

          <View className="mt-4">
            <Label text="Bio" />
            <TextInput
              multiline
              numberOfLines={3}
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={bio}
              onChangeText={setBio}
              placeholder="Short bio"
            />
          </View>

          <View className="mt-4">
            <Label text="City" />
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={city}
              onChangeText={setCity}
              placeholder="Enter city"
            />
          </View>

          <View className="mt-4 mb-24">
            <Label text="Home Address" />
            <TextInput
              multiline
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={homeAddress}
              onChangeText={setHomeAddress}
              placeholder="Enter address"
            />
          </View>
        </View>

        <View className="flex items-center justify-center">
            {processing && <LoadingSpinner />}

            <CustomButton
            label= "Save Changes"
            buttonFunc={handleSaveChanges}
            mt={32}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
