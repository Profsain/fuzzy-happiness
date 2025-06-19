import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	Alert,
	Linking,
	ActivityIndicator,
	FlatList,
	ScrollView,
	Modal,
	Dimensions,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";

const { width } = Dimensions.get("window");

const User = ({ item, setUserList, userList }) => {
	const navigation = useNavigation();
	const baseUrl = process.env.BASE_URL;
	const { userProfile, token } = useLogin();
	const userId = userProfile._id;

	const [friendRequests, setFriendRequests] = useState([]);
	const [userFriends, setUserFriends] = useState([]);
	const [sentFriendRequests, setSentFriendRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		const fetchAll = async () => {
			try {
				const [pendingRes, friendsRes, sentReqRes] = await Promise.all([
					fetch(`${baseUrl}/user/friend-request/${userId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}),
					fetch(`${baseUrl}/user/friends/${userId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}),
					fetch(`${baseUrl}/user/sent-friend-request/${userId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}),
				]);

				if (pendingRes.ok) setFriendRequests(await pendingRes.json());
				if (friendsRes.ok) setUserFriends(await friendsRes.json());
				if (sentReqRes.ok)
					setSentFriendRequests(await sentReqRes.json());
			} catch (error) {
				console.log("Error fetching user connections", error);
			}
		};

		fetchAll();

		const interval = setInterval(() => {
			fetch(`${baseUrl}/user/sent-friend-request/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => setSentFriendRequests(data))
				.catch((err) => console.log(err));
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const handleLimit = (userId, item) => {
		if (!userProfile?.isSubscriber && sentFriendRequests.length >= 10) {
			return Alert.alert(
				"Free Plan Limit Reached",
				"You have reached the limit of 10 friend requests on the free plan. Please upgrade to send more.",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Upgrade",
						onPress: () => navigation.navigate("MembershipScreen"),
					},
				],
			);
		}
		sendFriendRequest(userId, item._id);
	};

	const sendFriendRequest = async (currentUserId, selectedUserId) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${baseUrl}/user/friend-request`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ currentUserId, selectedUserId }),
			});

			if (response.ok) {
				const updatedSentRequests = [
					...sentFriendRequests,
					{ _id: selectedUserId },
				];
				setSentFriendRequests(updatedSentRequests);
			}
		} catch (error) {
			console.log("Error sending friend request", error);
		} finally {
			setIsLoading(false);
		}
	};

	const acceptRequest = async (friendRequestId) => {
		try {
			const response = await fetch(
				`${baseUrl}/user/friend-request/accept`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						senderId: friendRequestId,
						recipientId: userId,
					}),
				},
			);

			if (response.ok) {
				setUserList(userList.filter((u) => u._id !== friendRequestId));
				setUserFriends([...userFriends, friendRequestId]);
			}
		} catch (error) {
			console.log("Error accepting request", error);
		}
	};

	const handleGoChatRoom = () => {
		const friend = {
			friendId: item._id,
			friendName: item.firstName,
			friendImage: item.profileImg,
		};
		navigation.navigate("ChatRoom", { user: friend });
	};

	const isFriend = useMemo(
		() => userFriends.includes(item._id),
		[userFriends],
	);
	const isRequestReceived = useMemo(
		() => friendRequests.some((f) => f._id === item._id),
		[friendRequests],
	);
	const isRequestSent = useMemo(
		() => sentFriendRequests.some((f) => f._id === item._id),
		[sentFriendRequests],
	);

	return (
		<>
			<Pressable
				style={styles.container}
				onPress={() => setModalVisible(true)}
			>
				<Image
					style={styles.image}
					source={{
						uri:
							item.profileImg ||
							"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg",
					}}
				/>
				<View style={{ marginLeft: 12, flex: 1 }}>
					<Text style={{ fontWeight: "bold" }}>
						{item?.firstName}
					</Text>
					<Text style={{ marginTop: 4, color: "gray" }}>
						{item?.emailAddress}
					</Text>
				</View>

				{isFriend ? (
					<Pressable
						onPress={handleGoChatRoom}
						style={styles.chatBtn}
					>
						<Text style={styles.chatText}>Chat</Text>
					</Pressable>
				) : isRequestReceived ? (
					<Pressable
						onPress={() => acceptRequest(item._id)}
						style={styles.acceptBtn}
					>
						<Text style={styles.acceptText}>Accept</Text>
					</Pressable>
				) : isRequestSent ? (
					<Pressable style={styles.sentBtn}>
						<Text style={styles.sentText}>Request Sent</Text>
					</Pressable>
				) : (
					<Pressable
						onPress={() => handleLimit(userId, item)}
						style={styles.connectBtn}
					>
						{isLoading ? (
							<ActivityIndicator color="#000" size="small" />
						) : (
							<Text style={styles.connectText}>Connect</Text>
						)}
					</Pressable>
				)}
			</Pressable>

			<ReactNativeModal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<Image
						style={styles.modalImage}
						source={{
							uri:
								item.profileImg ||
								"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg",
						}}
					/>
					<Text style={styles.modalName}>
						{item.firstName} {item.lastName}
					</Text>
					<Text style={styles.modalEmail}>{item.emailAddress}</Text>

					<View style={styles.socialIcons}>
						<Pressable onPress={() => Linking.openURL(item.instagram || "https://instagram.com")}>
							<FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
						</Pressable>
						<Pressable onPress={() => Linking.openURL(item.twitter || "https://twitter.com")}>
							<Entypo name="twitter" size={24} color="#1DA1F2" style={styles.icon} />
						</Pressable>
						<Pressable onPress={() => Linking.openURL(item.linkedin || "https://linkedin.com")}>
							<Entypo name="linkedin" size={24} color="#0A66C2" style={styles.icon} />
						</Pressable>
					</View>

					<Text style={{ fontWeight: "bold", marginBottom: 10 }}>Uploaded Photos:</Text>
					<FlatList
						data={item.uploadedPhotos}
						numColumns={3}
						keyExtractor={(uri, index) => `${uri}-${index}`}
						renderItem={({ item }) => (
							<Pressable onPress={() => setSelectedImage(item)}>
								<Image source={{ uri: item }} style={styles.photoCard} />
							</Pressable>
						)}
					/>

					{/* <Pressable onPress={() => handleLimit(userId, item)} style={styles.connectBtn}>
						<Text style={styles.connectText}>Send Friend Request</Text>
					</Pressable> */}
				</View>
			</ReactNativeModal>

			<Modal visible={!!selectedImage} transparent={true}>
				<Pressable style={styles.fullscreenOverlay} onPress={() => setSelectedImage(null)}>
					<Image source={{ uri: selectedImage }} style={styles.fullImage} />
				</Pressable>
			</Modal>
		</>
	);
};

export default User;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
		resizeMode: "cover",
	},
	chatBtn: {
		backgroundColor: "#f9784b",
		padding: 10,
		width: 105,
		borderRadius: 6,
	},
	chatText: {
		textAlign: "center",
		color: "white",
	},
	acceptBtn: {
		backgroundColor: "#FBCEB1",
		padding: 10,
		width: 105,
		borderRadius: 6,
	},
	acceptText: {
		textAlign: "center",
		color: "gray",
		fontSize: 13,
	},
	sentBtn: {
		backgroundColor: "#FEEEE8",
		padding: 10,
		width: 105,
		borderRadius: 6,
	},
	sentText: {
		textAlign: "center",
		color: "black",
		fontSize: 13,
	},
	connectBtn: {
		backgroundColor: "#FBCEB1",
		padding: 10,
		borderRadius: 6,
		width: 105,
		alignItems: "center",
		marginTop: 10,
	},
	connectText: {
		color: "black",
		fontSize: 13,
	},
	modalContainer: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
	},
	modalImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	modalName: {
		fontWeight: "bold",
		fontSize: 18,
	},
	modalEmail: {
		color: "gray",
		marginBottom: 10,
	},
	socialIcons: {
		flexDirection: "row",
		gap: 20,
		marginBottom: 10,
	},
	icon: {
		marginHorizontal: 8,
	},
	photoCard: {
		width: width / 4,
		height: width / 4,
		margin: 5,
		borderRadius: 8,
	},
	fullscreenOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.8)",
		justifyContent: "center",
		alignItems: "center",
	},
	fullImage: {
		width: "90%",
		height: "80%",
		resizeMode: "contain",
		borderRadius: 10,
	},
});
