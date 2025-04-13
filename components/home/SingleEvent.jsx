import {
	View,
	Alert,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Platform,
	FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import useExplorerStatus from "../../hooks/useExplorerStatus";
import BackTopBar from "./BackTopBar";
import CustomButton from "../CustomButton";
import LoadingSpinner from "../LoadingSpinner";
import MemberCard from "./MemberCard";
// icons
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import formatDate from "../../utils/dateConverter";
import daysBetweenDates from "../../utils/getNumbersOfDays";
import handleSocialShare from "../../utils/socialSharefunc";
import { Feather } from "@expo/vector-icons";
import { secondBgColor } from "../../utils/appstyle";
import HorizontalTitle from "./HorizontalTitle";

import { handleOpenAllMembers } from "./funcs/membershipOperation";

const SingleEvent = ({ navigation, route }) => {
	// get login user from context
	const { userProfile, token } = useLogin();
	const { _id, emailAddress } = userProfile;

	// base url
	const baseUrl = process.env.BASE_URL;

	const isExplorer = useExplorerStatus(); // Use the custom hook to get explorer status

	// extract event details
	const { eventDetails } = route.params;

	// check if login user is an event members
	const [isEventMember, setIsEventMember] = useState(false);
	const [isRequestSent, setIsRequestSent] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const checkEventMember = () => {
		if (userProfile) {
			const { eventMembers, joinRequests } = eventDetails;
			if (eventMembers.includes(_id)) {
				setIsEventMember(true);
			}
			// check if user has sent request to join the event
			if (joinRequests) {
				if (joinRequests.includes(_id)) {
					setIsRequestSent(true);
				}
			}
		}
		return false;
	};
	useEffect(() => {
		checkEventMember();
	}, [isProcessing]);

	// handle back to prev screen when device back button press
	const handleSingleBack = () => {
		navigation.goBack();
	};

	const headlineText = `${eventDetails.eventCategory.substring(0, 20)} Event`;
	const inDays = `In ${daysBetweenDates(eventDetails.eventDate)} days`;

	// extract event details
	const {
		eventName,
		eventLocation,
		eventDate,
		eventTime,
		eventDescription,
		_id: eventId,
	} = eventDetails;

	// handle event registration
	const handleRegistration = async () => {
		// send request to join the event
		setIsProcessing(true);
		try {
			const requestBody = { userId: _id };
			const response = await fetch(
				`${baseUrl}/event/events/${eventId}/join-request`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(requestBody),
				},
			);

			const data = await response.json();
			if (response.ok) {
				setIsProcessing(false);
				setIsRequestSent(true);
				console.log("Event registration successful:", data);
				Alert.alert(
					"Request Sent",
					"Your request to join the event has been sent successfully.",
				);
			} else {
				setIsProcessing(false);
			}
		} catch (error) {
			setIsProcessing(false);
			console.log("Error registering for event:", error);
			Alert.alert(
				"Network Error",
				"There was an issue registering for the event.",
			);
		}
	};

	// check if event is over
	const [isEventClose, setIsEventClose] = useState(false);
	const eventClosed = () => {
		if (daysBetweenDates(eventDetails.eventDate) <= 0) {
			setIsEventClose(true);
		}
	};

	useEffect(() => {
		eventClosed();
	}, []);

	// handle invite to event
	const handleShareEvent = () => {
		// Base URL for deep linking
		const deepLinkBaseUrl = "splinx://event/";

		// URL to redirect to the app store if the app is not installed
		const appStoreUrl = Platform.select({
			ios: process.env.IOS_APP_DOWNLOAD_URL,
			android: process.env.APP_DOWNLOAD_URL,
		});

		// Event URL with deep link
		const eventUrl = `${deepLinkBaseUrl}${eventDetails._id}`;
		const message = `${userProfile.firstName} has invited you to ${eventName} event. Download the Splinx app to register and join the event: ${appStoreUrl}`;
		handleSocialShare(message);
	};

	// check if login user is an event member
	const isUserMember = eventDetails.eventMembers.some(
		(member) => member.user === userProfile._id,
	);

	// fetch membership
	const [membership, setMembership] = useState(null);
	const [isFetchingMembership, setIsFetchingMembership] = useState(false);
	const fetchMembership = async () => {
		try {
			setIsFetchingMembership(true);
			const response = await fetch(
				`${baseUrl}/event/events/${eventDetails._id}/membership`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const data = await response.json();
			if (response.ok) {
				setIsFetchingMembership(false);
				setMembership(data);
			} else {
				setIsFetchingMembership(false);
				console.error("Error fetching membership:", data);
			}
		} catch (error) {
			setIsFetchingMembership(false);
			console.error("Network error:", error);
		}
	};

	useEffect(() => {
		fetchMembership();
	}, [isUserMember]);

	return (
		<>
			<ScrollView className="flex-1 px-6 pt-14 bg-white">
				{/* top bar  */}

				<BackTopBar headline={headlineText} func={handleSingleBack} />
				<View className="mt-8">
					<ScrollView>
						<Image
							source={{
								uri: eventDetails.eventImage
									? eventDetails.eventImage
									: "https://img.freepik.com/free-photo/medium-shot-people-with-vr-glasses_23-2150433375.jpg?t=st=1708723420~exp=1708727020~hmac=9096dbce4e7a09ca0c3d54e14edff136a83b68c1bbceb01e22626488aa8ca9db&w=740",
							}}
							className="w-full h-40 rounded-2xl"
						/>

						{/* days left */}
						<View className="absolute right-4 top-32 bg-slate-50 px-2 py-1 rounded-lg">
							<Text className="text-sm">
								{isEventClose ? "Closed" : inDays}
							</Text>
						</View>

						{/* event name */}
						<View className="mt-4">
							<Text className="text-xl font-semibold">
								{eventName}
							</Text>
							{isProcessing && (
								<LoadingSpinner text="Processing..." />
							)}
						</View>

						{/* action button */}
						{isEventClose || isEventMember ? (
							<View className="mt-4 flex justify-start flex-row">
								<View>
									<CustomButton
										mr={14}
										width={110}
										label="Expired"
										backgroundColor={secondBgColor}
									/>
								</View>
								<View>
									<CustomButton
										width={50}
										height={50}
										label={
											<Feather
												name="share"
												size={24}
												color="white"
											/>
										}
										bradius={100}
										backgroundColor={secondBgColor}
									/>
								</View>
							</View>
						) : (
							<View className="mt-4 flex justify-start flex-row">
								{eventDetails.eventCreator !==
								userProfile._id ? (
									<View>
										{isUserMember || isRequestSent ? (
											<CustomButton
												mr={14}
												width={isUserMember ? 110 : 150}
												label={
													isUserMember
														? "Joined"
														: "Request Sent"
												}
												backgroundColor={secondBgColor}
											/>
										) : (
											<CustomButton
												mr={14}
												width={110}
												label="Join"
												buttonFunc={handleRegistration}
											/>
										)}
									</View>
								) : (
									<View>
										<CustomButton
											mr={14}
											width={170}
											label="Your Event Share"
											backgroundColor={secondBgColor}
										/>
									</View>
								)}

								<View>
									<CustomButton
										width={50}
										height={50}
										label={
											<Feather
												name="share"
												size={24}
												color="white"
											/>
										}
										bradius={100}
										buttonFunc={handleShareEvent}
									/>
								</View>
							</View>
						)}

						{/* event details */}

						<View className="mt-4">
							<View className="flex flex-row items-center">
								<View className="border p-2 rounded-lg border-gray-400 w-10 h-10 text-center">
									<Fontisto
										name="date"
										size={18}
										color="black"
									/>
								</View>
								<View>
									<Text className="ml-4">
										{formatDate(eventDate)}
									</Text>
									<Text className="ml-4">{eventTime}</Text>
								</View>
							</View>

							<View className="flex flex-row items-center mt-3">
								<View className="border p-2 rounded-lg border-gray-400 w-10 h-10 text-center">
									<Fontisto
										name="map-marker-alt"
										size={18}
										color="black"
									/>
								</View>
								<Text className="ml-6">{eventLocation}</Text>
							</View>

							<View className="flex flex-row items-center mt-3">
								<View className="border p-2 rounded-lg border-gray-400 w-10 h-10 text-center">
									<FontAwesome5
										name="rocketchat"
										size={18}
										color="black"
									/>
								</View>
								<TouchableOpacity className="ml-4">
									<Text>Register to Join Chat</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* event confirmation  */}
						{isUserMember && (
							<View className="mt-6 p-3 border-2 border-slate-200 rounded-xl">
								<Text className="font-semibold pb-2">
									You're In!
								</Text>
								<Text>
									A confirmation email has been sent{" "}
									{emailAddress}
								</Text>
								<View className="flex flex-row items-center bg-green-600 rounded-md p-2 mt-2">
									<AntDesign
										name="checkcircle"
										size={24}
										color="white"
									/>
									<Text className="text-white ml-3">
										Thank you for joining
									</Text>
								</View>
							</View>
						)}

						{/* about event  */}
						<View className="mt-4 mb-24">
							<Text className="text-lg font-semibold">
								About Event
							</Text>
							<Text className="mt-2">{eventDescription}</Text>
						</View>

						{/* event member request list and event members */}
						{eventDetails.eventCreator == userProfile._id && (
							<View>
								{/* event members */}
								{isFetchingMembership && (
									<LoadingSpinner text="" />
								)}
								<View>
									{membership &&
										membership.eventMembers?.length > 0 && (
											<>
												<HorizontalTitle
													title="Members"
													func={() =>
														handleOpenAllMembers(
															"membership",
															membership,
															eventIdnavigation,
														)
													}
												/>
												<FlatList
													data={
														membership.eventMembers
													}
													horizontal
													keyExtractor={(item) =>
														item._id
													}
													showsHorizontalScrollIndicator={
														false
													}
													contentContainerStyle={{
														paddingHorizontal: 10,
														paddingVertical: 10,
													}}
													renderItem={({ item }) => (
														<MemberCard
															user={item}
															showActions={false}
															onView={(user) =>
																Alert.alert(
																	"View",
																	`${user.firstName}'s profile`,
																)
															}
														/>
													)}
												/>
											</>
										)}
								</View>

								{/* event members request */}
								<View>
									{membership &&
										membership.joinRequests?.length > 0 && (
											<>
												<HorizontalTitle
													title="Join Requests"
													func={() =>
														handleOpenAllMembers(
															"request",
															membership,
															navigation,
														)
													}
												/>
												<FlatList
													data={
														membership.joinRequests
													}
													horizontal
													keyExtractor={(item) =>
														item._id
													}
													showsHorizontalScrollIndicator={
														false
													}
													contentContainerStyle={{
														paddingHorizontal: 10,
														paddingVertical: 10,
													}}
													renderItem={({ item }) => (
														<MemberCard
															user={item}
															showActions
															onView={(user) =>
																Alert.alert(
																	"View",
																	`${user.firstName}'s profile`,
																)
															}
															onAccept={(user) =>
																Alert.alert(
																	"Accept",
																	`Accepted ${user.firstName}`,
																)
															}
															onDecline={(user) =>
																Alert.alert(
																	"Decline",
																	`Declined ${user.firstName}`,
																)
															}
														/>
													)}
												/>
											</>
										)}
								</View>
							</View>
						)}
					</ScrollView>
				</View>
			</ScrollView>
		</>
	);
};

export default SingleEvent;
