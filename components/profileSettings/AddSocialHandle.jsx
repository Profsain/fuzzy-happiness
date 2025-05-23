import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import LoadingSpinner from "../LoadingSpinner";
import { set } from "@gluestack-style/react";

const SocialInput = ({ label, icon, value, onChangeText, placeholder }) => (
	<View className="mb-4">
		<Text className="mb-1 font-semibold text-gray-700">{label}</Text>
		<View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
			{icon}
			<TextInput
				className="ml-3 flex-1 text-base text-gray-800"
				placeholder={placeholder}
				placeholderTextColor="#999"
				value={value}
				onChangeText={onChangeText}
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="url"
			/>
		</View>
	</View>
);

const AddSocialHandle = ({ navigation }) => {
	// extract context
	const { userProfile, setUserProfile, token } = useLogin();

	// base url
	const baseUrl = process.env.BASE_URL;

	// social handles
	const [instagram, setInstagram] = useState("");
	const [facebook, setFacebook] = useState("");
	const [tiktok, setTiktok] = useState("");
	const [snapchat, setSnapchat] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const handleBackBtn = () => navigation.goBack();

	// set initial values
	useEffect(() => {
		if (userProfile) {
			const extractUsername = (url, platform) => {
				try {
					if (!url) return "";
					const pathname = new URL(url).pathname;
					const parts = pathname.split("/").filter(Boolean);
					const lastPart = parts[parts.length - 1];
					return platform === "tiktok" && lastPart.startsWith("@")
						? lastPart.slice(1)
						: lastPart;
				} catch (err) {
					return "";
				}
			};

			setInstagram(extractUsername(userProfile.instagram, "instagram"));
			setFacebook(extractUsername(userProfile.facebook, "facebook"));
			setTiktok(extractUsername(userProfile.tiktok, "tiktok"));
			setSnapchat(extractUsername(userProfile.snapchat, "snapchat"));
		}
	}, [userProfile]);

	const handleSave = async () => {
		// validate inputs
		if (!instagram && !facebook && !tiktok && !snapchat) {
			Alert.alert("Warning", "Please enter at least one social handle");
			return;
		}
		const handles = {
			instagram: `https://instagram.com/${instagram}`,
			facebook: `https://facebook.com/${facebook}`,
			tiktok: `https://tiktok.com/@${tiktok}`,
			snapchat: `https://snapchat.com/add/${snapchat}`,
		};
		// update user profile
		try {
			setIsProcessing(true);
			const response = await fetch(
				`${baseUrl}/user/update-user/${userProfile._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(handles),
				},
			);

			if (response.ok) {
				setUserProfile((prevUserProfile) => ({
					...prevUserProfile,
					...handles,
				}));
				Alert.alert("Success", "Social handles updated successfully");
				setIsProcessing(false);
			} else {
				const data = await response.json();
				Alert.alert("Network Error", "Unable to update social handles");
				setIsProcessing(false);
			}
		} catch (error) {
			setIsProcessing(false);
			console.error("Error saving social handles:", error);
		}
	};

	return (
		<SafeAreaView className="flex-1 pt-14 bg-white">
			<View className="px-6">
				<BackTopBar
					headline="Add Social Handle"
					icon2=""
					func={handleBackBtn}
				/>
			</View>

			<ScrollView className="px-6 pt-16">
				<SocialInput
					label="Instagram"
					icon={
						<AntDesign name="instagram" size={20} color="#E1306C" />
					}
					value={instagram}
					onChangeText={setInstagram}
					placeholder="username"
				/>

				<SocialInput
					label="Facebook"
					icon={<Entypo name="facebook" size={20} color="#3b5998" />}
					value={facebook}
					onChangeText={setFacebook}
					placeholder="username"
				/>

				<SocialInput
					label="TikTok"
					icon={<FontAwesome5 name="tiktok" size={20} color="#000" />}
					value={tiktok}
					onChangeText={setTiktok}
					placeholder="username"
				/>

				<SocialInput
					label="Snapchat"
					icon={
						<FontAwesome5
							name="snapchat-ghost"
							size={20}
							color="#FFFC00"
						/>
					}
					value={snapchat}
					onChangeText={setSnapchat}
					placeholder="username"
				/>

				<View>{isProcessing && <LoadingSpinner />}</View>
				<TouchableOpacity
					className="mt-6 bg-[#f9784b] py-4 rounded-xl items-center"
					onPress={handleSave}
				>
					<Text className="text-white text-lg font-bold">
						Save Links
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddSocialHandle;
