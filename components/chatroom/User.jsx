import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	Alert,
	ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

const User = ({ item, setUserList, userList }) => {
	const navigation = useNavigation();
	const baseUrl = process.env.BASE_URL;
	const { userProfile, token } = useLogin();
	const userId = userProfile._id;

	const [friendRequests, setFriendRequests] = useState([]);
	const [userFriends, setUserFriends] = useState([]);
	const [sentFriendRequests, setSentFriendRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
				if (sentReqRes.ok) setSentFriendRequests(await sentReqRes.json());
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
					{ text: "Upgrade", onPress: () => navigation.navigate("MembershipScreen") },
				]
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
				const updatedSentRequests = [...sentFriendRequests, { _id: selectedUserId }];
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
			const response = await fetch(`${baseUrl}/user/friend-request/accept`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ senderId: friendRequestId, recipientId: userId }),
			});

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

	const isFriend = useMemo(() => userFriends.includes(item._id), [userFriends]);
	const isRequestReceived = useMemo(
		() => friendRequests.some((f) => f._id === item._id),
		[friendRequests]
	);
	const isRequestSent = useMemo(
		() => sentFriendRequests.some((f) => f._id === item._id),
		[sentFriendRequests]
	);

	return (
		<Pressable style={styles.container}>
			<Image
				style={styles.image}
				source={{
					uri: item.profileImg || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg",
				}}
			/>

			<View style={{ marginLeft: 12, flex: 1 }}>
				<Text style={{ fontWeight: "bold" }}>{item?.firstName}</Text>
				<Text style={{ marginTop: 4, color: "gray" }}>{item?.emailAddress}</Text>
			</View>

			{/* Dynamic Button */}
			{isFriend ? (
				<Pressable onPress={handleGoChatRoom} style={styles.chatBtn}>
					<Text style={styles.chatText}>Chat</Text>
				</Pressable>
			) : isRequestReceived ? (
				<Pressable onPress={() => acceptRequest(item._id)} style={styles.acceptBtn}>
					<Text style={styles.acceptText}>Accept</Text>
				</Pressable>
			) : isRequestSent ? (
				<Pressable style={styles.sentBtn}>
					<Text style={styles.sentText}>Request Sent</Text>
				</Pressable>
			) : (
				<Pressable onPress={() => handleLimit(userId, item)} style={styles.connectBtn}>
					{isLoading ? (
						<ActivityIndicator color="#000" size="small" />
					) : (
						<Text style={styles.connectText}>Connect</Text>
					)}
				</Pressable>
			)}
		</Pressable>
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
	},
	connectText: {
		color: "black",
		fontSize: 13,
	},
});
