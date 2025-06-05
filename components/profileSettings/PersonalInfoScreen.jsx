import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";
import { primeryColor } from "../../utils/appstyle";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import handlePhoto from "../../utils/uploadImage";
import LoadingSpinner from "../LoadingSpinner";

const PersonalInfoScreen = ({ navigation }) => {
	const [newProfileImg, setNewProfileImg] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [showProButton, setShowProButton] = useState(false);

	// extract context
	const { userProfile, setUserProfile, token } = useLogin();

	// base url
	const baseUrl = process.env.BASE_URL;

	// handle back button
	const handleBackBtn = () => {
		// navigate to ProfileHome
		navigation.navigate("ProfileHome");
	};

	// handle change profile picture
	const handleChangeProfilePic = async () => {
		try {
			setIsProcessing(true);

			// handle photo
			const newProfileImg = await handlePhoto();
			setNewProfileImg(newProfileImg);

			// update profile image in database
			const updateData = {
				profileImg: newProfileImg,
			};

			const response = await fetch(
				`${baseUrl}/user/update-user/${userProfile._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(updateData),
				},
			);

			const data = await response.json();

			if (response.ok) {
				// Update local user profile state
				const updatedProfile = {
					...userProfile,
					profileImg: newProfileImg,
				};
				setUserProfile(updatedProfile);

				setIsProcessing(false);
				Alert.alert("Success", data.message);
			} else {
				setIsProcessing(false);
				Alert.alert("Response Error", data.message);
			}
		} catch (error) {
			Alert.alert("Error during profile picture update", error.message);
			setIsProcessing(false);
			alert(error.message);
		}
	};

	// handle change email
	const handleChangeEmail = () => {
		// navigate to ChangeEmail
		console.log("Change Email");
	};

	// handle change number
	const handleChangeNumber = () => {
		// navigate to ChangeNumber
		navigation.navigate("ChangePhoneNumber");
	};

	// handle change password
	const handleChangePassword = () => {
		// navigate to ChangePassword
		navigation.navigate("ChangePassword");
	};

	// handle upload more profile images
	const handleUploadMoreProfileImages = () => {
		// navigate to UploadMoreProfileImages
		navigation.navigate("UploadMorePictures");
	};

	// handle add social media links
	const handleAddSocialMediaLinks = () => {
		// navigate to AddSocialMediaLinks
		navigation.navigate("AddSocialHandle");
	};

	const handlePro = () => {
		// navigate to MembershipScreen
		navigation.navigate("MembershipScreen");
	};

	// pro controller
	useEffect(() => {
		const checkInstallTime = async () => {
			try {
				const storedTime = await AsyncStorage.getItem("installTime");

				let installTime;

				if (!storedTime) {
					// First time app is opened, set the install time
					installTime = Date.now();
					await AsyncStorage.setItem(
						"installTime",
						installTime.toString(),
					);
				} else {
					installTime = parseInt(storedTime, 10);
				}

				const now = Date.now();
				const thirtyMinutes = 15 * 60 * 1000;

				if (now - installTime >= thirtyMinutes) {
					setShowProButton(true);
				} else {
					// Check again later if within 30 mins
					const delay = thirtyMinutes - (now - installTime);
					setTimeout(() => {
						setShowProButton(true);
					}, delay);
				}
			} catch (err) {
				console.error("Failed to check install time:", err);
			}
		};

		checkInstallTime();
	}, []);

	return (
		<SafeAreaView className="flex-1 pt-14 bg-white">
			<View className="px-6">
				<BackTopBar
					headline="Personal Details"
					icon2=""
					func={handleBackBtn}
				/>
			</View>

			{/* profile image */}
			<View className="my-8 px-6">
				<Image
					source={{
						uri:
							userProfile.profileImg ||
							"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
					}}
					className="w-24 h-24 rounded-full "
				/>

				{/* show loading spinner */}
				{/* change profile picture btn */}
				{isProcessing ? (
					<LoadingSpinner />
				) : (
					<TouchableOpacity onPress={handleChangeProfilePic}>
						<Text className="text-slate-500 mt-4 font-bold">
							Change Profile Picture
						</Text>
					</TouchableOpacity>
				)}
			</View>

			{/* profile details */}
			<View className="px-6">
				<OptionButton
					btnText="Edit Profile"
					btnFunc={() => navigation.navigate("EditProfile")}
					iconLeft={
						<AntDesign
							name="edit"
							size={24}
							color={primeryColor}
							style={{ marginRight: 14 }}
						/>
					}
				
				/>
				<OptionButton
					btnFunc={handleChangeEmail}
					btnText={
						userProfile.emailAddress
							? userProfile.emailAddress.slice(0, 20)
							: " user email "
					}
					iconLeft={
						<Fontisto
							name="email"
							size={24}
							color={primeryColor}
							style={{ marginRight: 14 }}
						/>
					}
					iconRight=""
				/>
				{/* pro button */}
				{showProButton && (
					<OptionButton
						btnFunc={handlePro}
						btnText="Go Pro"
						iconLeft={
							<FontAwesome
								name="money"
								size={24}
								color={primeryColor}
								style={{ marginRight: 14 }}
							/>
						}
					/>
				)}

				<OptionButton
					btnFunc={handleUploadMoreProfileImages}
					btnText="Upload Your Pictures"
					iconLeft={
						<AntDesign
							name="picture"
							size={24}
							color={primeryColor}
							style={{ marginRight: 14 }}
						/>
					}
				/>
				<OptionButton
					btnFunc={handleAddSocialMediaLinks}
					btnText="Link Social Media"
					iconLeft={
						<AntDesign
							name="link"
							size={24}
							color={primeryColor}
							style={{ marginRight: 14 }}
						/>
					}
				/>
				<OptionButton
					btnFunc={handleChangeNumber}
					btnText="Change Phone Number"
					iconLeft={
						<FontAwesome
							name="mobile-phone"
							size={24}
							color={primeryColor}
							style={{ marginRight: 14 }}
						/>
					}
				/>
				<OptionButton
					btnFunc={handleChangePassword}
					btnText="Change Password"
					iconLeft={
						<MaterialIcons
							name="password"
							size={24}
							color={primeryColor}
							style={{ marginRight: 14 }}
						/>
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default PersonalInfoScreen;
