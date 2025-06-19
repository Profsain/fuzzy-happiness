import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
	Linking,
	ActivityIndicator,
} from "react-native";
import { useState } from "react";
import BackTopBar from "./BackTopBar";
import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";


const MemberDetails = ({ navigation, route }) => {
	const { user } = route.params;

	const [selectedImage, setSelectedImage] = useState(user.profileImg);
	const [loading, setLoading] = useState(false);

	const handleBackBtn = () => navigation.goBack();

	const openLink = async (url) => {
		if (await Linking.canOpenURL(url)) {
			await Linking.openURL(url);
		} else {
			alert("Can't open this link.");
		}
	};

	const handleThumbnailPress = (photo) => {
		setLoading(true);
		setSelectedImage(photo);
	};

	return (
		<ScrollView className="flex-1 px-6 pt-14 bg-white">
			<BackTopBar headline="Member Details" icon2="" func={handleBackBtn} />

			<View className="mt-6 items-center">
				<View style={styles.imageContainer}>
					{loading && (
						<ActivityIndicator
							size="large"
							color="#666"
							style={styles.spinner}
						/>
					)}
					<Image
						source={{ uri: selectedImage }}
						style={styles.largeImage}
						resizeMode="cover"
						onLoadStart={() => setLoading(true)}
						onLoadEnd={() => setLoading(false)}
					/>
				</View>

				<View className="flex-row flex-wrap gap-3 mt-4 justify-center">
					{user.uploadedPhotos?.map((photo, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => handleThumbnailPress(photo)}
						>
							<Image
								source={{ uri: photo }}
								style={styles.thumbnail}
								resizeMode="cover"
							/>
						</TouchableOpacity>
					))}
				</View>

				<View className="mt-6 w-full">
					<Text className="text-2xl font-bold text-center text-gray-800">
						{user.firstName} {user.lastName}
					</Text>
					<Text className="text-sm text-gray-500 text-center mt-1">
						{user.city}, {user.country}
					</Text>
					<Text className="text-base text-gray-700 text-center mt-3 px-4">
						{user.bio}
					</Text>
				</View>

				<View className="mt-6 w-full px-6">
					<Text className="text-lg font-semibold text-gray-700 mb-3 text-center">
						Find on Social Media
					</Text>

					<View className="flex-row justify-center gap-6 flex-wrap">
						{user.instagram && (
							<TouchableOpacity onPress={() => openLink(user.instagram)}>
								<AntDesign name="instagram" size={34} color="#C13584" />
							</TouchableOpacity>
						)}
						{user.facebook && (
							<TouchableOpacity onPress={() => openLink(user.facebook)}>
								<FontAwesome name="facebook-square" size={34} color="#1877F2" />
							</TouchableOpacity>
						)}
						{user.tiktok && (
							<TouchableOpacity onPress={() => openLink(user.tiktok)}>
								<FontAwesome6 name="tiktok" size={28} color="black" />
							</TouchableOpacity>
						)}
						{user.snapchat && (
							<TouchableOpacity onPress={() => openLink(user.snapchat)}>
								<FontAwesome name="snapchat-square" size={34} color="orange" />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		width: "100%",
		height: 250,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#ddd",
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	largeImage: {
		width: "100%",
		height: "100%",
	},
	spinner: {
		position: "absolute",
		zIndex: 1,
	},
	thumbnail: {
		width: 60,
		height: 60,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		marginHorizontal: 3,
	},
});

export default MemberDetails;
