import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { BackTopBar } from "../home";
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import LoadingSpinner from "../LoadingSpinner";

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
	const [instagram, setInstagram] = useState("");
	const [facebook, setFacebook] = useState("");
	const [tiktok, setTiktok] = useState("");
	const [snapchat, setSnapchat] = useState("");

	const handleBackBtn = () => navigation.goBack();

	const handleSave = () => {
		const handles = {
			instagram: `https://instagram.com/${instagram}`,
			facebook: `https://facebook.com/${facebook}`,
			tiktok: `https://tiktok.com/@${tiktok}`,
			snapchat: `https://snapchat.com/add/${snapchat}`,
		};
		console.log("Saved Handles:", handles);
		// You can also send this to your backend here
		console.log(handles);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
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
