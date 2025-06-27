import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	Pressable,
	Image,
	TouchableOpacity,
	Platform,
	Alert,
} from "react-native";
import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useLogin } from "../../context/LoginProvider";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
	primeryColor,
	secondaryColor,
	secondBgColor,
} from "../../utils/appstyle";
import { set } from "@gluestack-style/react";

const ChatScreen = () => {
	// base url
	const baseUrl = process.env.BASE_URL;

	// extract from useLogin context
	const { userProfile, token } = useLogin();
	const userId = userProfile._id;

	const [showEmojiSelector, setShowEmojiSelector] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedMessages, setSelectedMessages] = useState([]);
	const [messages, setMessages] = useState([]);
	const [recipientData, setRecipientData] = useState();
	const navigation = useNavigation();
	const [selectedImage, setSelectedImage] = useState("");
	const [selectedImageUrl, setSelectedImageUrl] = useState("");
	const route = useRoute();
	const { recipientId } = route.params;
	const [message, setMessage] = useState("");

	const scrollViewRef = useRef(null);

	useEffect(() => {
		scrollToBottom();
	}, []);

	const scrollToBottom = () => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollToEnd({ animated: false });
		}
	};

	const handleContentSizeChange = () => {
		scrollToBottom();
	};

	// handle Emoji
	const handleEmojiPress = () => {
		setShowEmojiSelector(!showEmojiSelector);
	};

	// fetch users messages
	const fetchMessages = async () => {
		try {
			const response = await fetch(
				`${baseUrl}/message/messages/${userId}/${recipientId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = await response.json();

			if (response.ok) {
				const sortedMessages = data.sort(
					(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
				);
				setMessages(sortedMessages);

				// Get all unread messages received by the current user
				const unreadMessages = sortedMessages.filter(
					(msg) => msg.recipientId === userId && !msg.read,
				);

				// Mark each unread message as read
				for (const msg of unreadMessages) {
					await markMessagesAsRead(msg._id);
				}
			} else {
				console.log("error showing messages", response.status.message);
			}
		} catch (error) {
			console.log("error fetching messages", error);
		}
	};

	// console.log("Messages:", messages);

	// mark messages as read
	const markMessagesAsRead = async (messageId) => {
		try {
			const response = await fetch(
				`${baseUrl}/message/readMessage/${messageId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);
			if (response.ok) {
				// Optionally, you can refetch messages to update the UI
				// fetchMessages();
			} else {
				console.log("Error marking messages as read", response.status);
			}
		} catch (error) {
			console.log("Error marking messages as read", error);
		}
	};

	useEffect(() => {
		fetchMessages();

		// Poll for new messages every 30 seconds
		const intervalId = setInterval(fetchMessages, 30000);

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, []);

	// fetch recipient data
	const fetchRecipientData = async () => {
		try {
			const response = await fetch(
				`${baseUrl}/message/user/${recipientId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await response.json();

			setRecipientData(data);
		} catch (error) {
			console.log("error retrieving details", error);
		}
	};
	useEffect(() => {
		fetchRecipientData();

		// Poll for recipient data (like online status) every 35 seconds
		const intervalId = setInterval(fetchRecipientData, 35000);

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, []);

	// handle send message
	const handleSend = async (messageType, imageUri) => {
		try {
			const body = {
				senderId: userId,
				recipientId: recipientId,
			};

			// check if message is empty
			if (!message && !imageUri) {
				return;
			}

			//if the message type id image or a normal text
			if (messageType === "image") {
				body.messageType = "image";
				body.imageUrl = imageUri;
			} else {
				body.messageType = "text";
				body.messageText = message;
			}

			const response = await fetch(`${baseUrl}/message/messages`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json", // specify content type as JSON
				},
				body: JSON.stringify(body), // stringify the body object
			});
			console.log("body", body);
			console.log("response", response);

			if (response.ok) {
				console.log("message sent", body);
				setMessage("");
				setSelectedImage("");

				fetchMessages();
			}
		} catch (error) {
			console.log("error in sending the message", error);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerLeft: () => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Ionicons
						onPress={() => navigation.goBack()}
						name="arrow-back"
						size={24}
						color="black"
					/>

					{selectedMessages.length > 0 ? (
						<View>
							<Text style={{ fontSize: 16, fontWeight: "500" }}>
								{selectedMessages.length}
							</Text>
						</View>
					) : (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Image
								style={{
									width: 30,
									height: 30,
									borderRadius: 15,
									resizeMode: "cover",
								}}
								source={{ uri: recipientData?.profileImage }}
							/>

							<Text
								style={{
									marginLeft: 5,
									fontSize: 15,
									fontWeight: "bold",
								}}
							>
								{recipientData?.firstName}
							</Text>
						</View>
					)}
				</View>
			),
			headerRight: () =>
				selectedMessages.length > 0 ? (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 10,
						}}
					>
						<Ionicons
							name="md-arrow-redo-sharp"
							size={24}
							color="black"
						/>
						<Ionicons
							name="md-arrow-undo"
							size={24}
							color="black"
						/>
						<FontAwesome name="star" size={24} color="black" />
						<MaterialIcons
							onPress={() => handleDeleteConfirmation()}
							name="delete"
							size={24}
							color="black"
						/>
					</View>
				) : null,
		});
	}, [recipientData]);

	// handle delete messages
	// show a confirmation dialog before deleting messages
	// and delete single message
	const handleDeleteConfirmation = (messageId) => {
		// Show a confirmation dialog before deleting the message
		Alert.alert(
			"Delete Message",
			"Are you sure you want to delete this message?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => deleteMessage(messageId),
					style: "destructive",
				},
			],
			{ cancelable: true },
		);
	};

	// delete messages
	const deleteMessage = async (messageId) => {
		try {
			const response = await fetch(
				`${baseUrl}/message/deleteMessage/${messageId}`,
				{
					method: "Delete",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (response.ok) {
				// console.log("messages deleted successfully");

				fetchMessages();
			} else {
				console.log("error deleting messages", response.status);
			}
		} catch (error) {
			console.log("error deleting messages", error);
		}
	};

	// format time func
	const formatTime = (time) => {
		const options = { hour: "numeric", minute: "numeric" };
		return new Date(time).toLocaleString("en-US", options);
	};

	// load message image upload from device
	const handlePhotoSend = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			// mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			// upload photo to cloudinary
			let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
			let data = {
				file: base64Img,
				upload_preset: "hwebe1a7",
			};

			uploadPhoto(data);
		}

		if (result.canceled) {
			console.log("cancelled");
		}
	};

	// upload photo to cloudinary and get url
	const uploadPhoto = async (data) => {
		let CLOUDINARY_URL =
			"https://api.cloudinary.com/v1_1/dvwxyofm2/image/upload";

		await fetch(CLOUDINARY_URL, {
			body: JSON.stringify(data),
			headers: {
				"content-type": "application/json",
			},
			method: "POST",
		})
			.then(async (r) => {
				let data = await r.json();

				setSelectedImageUrl(data.secure_url);
				handleSend("image", data.secure_url);
			})
			.catch((err) => console.log("err", err));
	};

	// handle selected message
	const handleSelectMessage = (message) => {
		//check if the message is already selected
		const isSelected = selectedMessages.includes(message._id);

		if (isSelected) {
			setSelectedMessages((previousMessages) =>
				previousMessages.filter((id) => id !== message._id),
			);
		} else {
			setSelectedMessages((previousMessages) => [
				...previousMessages,
				message._id,
			]);
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={90} // Adjust based on header height
		>
			<View style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
				{/* Header */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingHorizontal: 20,
						paddingTop: 50,
						paddingBottom: 10,
						borderBottomWidth: 1,
						borderColor: "#ccc",
					}}
				>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ marginRight: 10 }}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
						<Image
							source={{ uri: recipientData?.profileImg }}
							style={{ width: 30, height: 30, borderRadius: 20 }}
						/>
						<Text
							style={{
								marginLeft: 10,
								fontSize: 18,
								fontWeight: "bold",
							}}
						>
							{recipientData?.firstName}
						</Text>
					</View>

					<Text>
						{recipientData?.isOnline ? "🟢 Online" : "⚪ Offline"}
					</Text>
				</View>
				{/* Messages ScrollView */}

				<ScrollView
					ref={scrollViewRef}
					onContentSizeChange={handleContentSizeChange}
					contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
				>
					{/* Render messages here */}
					<View className="flex-1 mt-20">
						{messages.map((item, index) => {
							if (item.messageType === "text") {
								const isSelected = selectedMessages.includes(
									item._id,
								);
								return (
									<Pressable
										onLongPress={() =>
											handleDeleteConfirmation(item._id)
										}
										key={index}
										style={[
											item?.senderId?._id === userId
												? {
														alignSelf: "flex-end",
														backgroundColor:
															secondBgColor,
														padding: 8,
														maxWidth: "60%",
														borderRadius: 7,
														margin: 10,
												  }
												: {
														alignSelf: "flex-start",
														backgroundColor:
															secondaryColor,
														padding: 8,
														margin: 10,
														borderRadius: 7,
														maxWidth: "60%",
												  },

											isSelected && {
												width: "100%",
												backgroundColor: "#F0FFFF",
											},
										]}
									>
										<Text
											style={{
												fontSize: 13,
												textAlign: isSelected
													? "right"
													: "left",
											}}
										>
											{item?.message}
										</Text>

										<View className="flex-row justify-between items-center pt-1">
											<Text
												style={{
													textAlign: "right",
													fontSize: 9,
													color: "gray",
												}}
											>
												{formatTime(item.createdAt)}
											</Text>

											{/* read indicator */}
											<View>
												{item.read ? (
													<Text
														style={{
															marginTop: 5,
														}}
													>
														<AntDesign
															name="check"
															size={12}
															color="black"
														/>
														<AntDesign
															name="check"
															size={12}
															color="black"
														/>
													</Text>
												) : (
													<Text
														style={{
															marginTop: 5,
														}}
													>
														<AntDesign
															name="check"
															size={12}
															color="black"
														/>
													</Text>
												)}
											</View>
										</View>
									</Pressable>
								);
							}

							if (item.messageType === "image") {
								const source = {
									uri:
										item.imageUrl ||
										"https://res.cloudinary.com/dvwxyofm2/image/upload/v1713992847/qijnsgcr13wjnyukuzfs.jpg",
								};
								return (
									<Pressable
										key={index}
										style={[
											item?.senderId?._id === userId
												? {
														alignSelf: "flex-end",
														backgroundColor:
															"#DCF8C6",
														padding: 8,
														maxWidth: "60%",
														borderRadius: 7,
														margin: 10,
												  }
												: {
														alignSelf: "flex-start",
														backgroundColor:
															"white",
														padding: 8,
														margin: 10,
														borderRadius: 7,
														maxWidth: "60%",
												  },
										]}
									>
										<View>
											<Image
												source={source}
												style={{
													width: 200,
													height: 200,
													borderRadius: 7,
												}}
											/>
											<Text
												style={{
													textAlign: "right",
													fontSize: 9,
													position: "absolute",
													right: 10,
													bottom: 7,
													color: "white",
													marginTop: 5,
												}}
											>
												{formatTime(item?.createdAt)}
											</Text>
										</View>
									</Pressable>
								);
							}
						})}
					</View>
				</ScrollView>

				{/* Chat Input */}
				<View
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: "white",
						padding: 10,
						flexDirection: "row",
						alignItems: "center",
						borderTopWidth: 1,
						borderColor: "#ccc",
					}}
				>
					{/* Emoji Toggle */}
					<TouchableOpacity
						onPress={handleEmojiPress}
						style={{ marginRight: 5 }}
					>
						<Entypo name="emoji-happy" size={24} color="gray" />
					</TouchableOpacity>

					{/* Input */}
					<TextInput
						value={message}
						onChangeText={setMessage}
						placeholder="Type a message..."
						style={{
							flex: 1,
							height: 40,
							borderWidth: 1,
							borderColor: "#ccc",
							borderRadius: 20,
							paddingHorizontal: 15,
						}}
					/>

					{/* Image Picker */}
					<TouchableOpacity
						onPress={handlePhotoSend}
						style={{ marginLeft: 5 }}
					>
						<Feather name="image" size={24} color="gray" />
					</TouchableOpacity>

					{/* Send */}
					<TouchableOpacity
						onPress={() => handleSend("text", null)}
						style={{ marginLeft: 10 }}
					>
						<Ionicons name="send" size={24} color={primeryColor} />
					</TouchableOpacity>
				</View>

				{/* Emoji Selector */}
				{showEmojiSelector && (
					<EmojiSelector
						onEmojiSelected={(emoji) => {
							setMessage((prev) => prev + emoji);
							setShowEmojiSelector(false);
						}}
						showSearchBar={false}
						showTabs={true}
						showSectionTitles={false}
						columns={8}
						style={{ height: 250 }}
					/>
				)}
			</View>
		</KeyboardAvoidingView>
	);
};

export default ChatScreen;
