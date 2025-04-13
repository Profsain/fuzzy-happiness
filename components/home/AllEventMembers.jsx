import { useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Alert } from "react-native";
import { useLogin } from "../../context/LoginProvider";
import BackTopBar from "./BackTopBar";
import HorizontalTitle from "./HorizontalTitle";
import MemberCardHori from "./MemberCardHori";
import LoadingSpinner from "../LoadingSpinner";

import {
	handleAcceptMembershipRequest,
	handleDeclineMembershipRequest,
} from "./funcs/membershipOperation";

const AllEventMembers = ({ navigation, route }) => {
	const { userProfile, token } = useLogin();
	// extract membership list
	const { memberList, option, eventId } = route.params;

	const [processing, setProcessing] = useState(false);

	// handle back button
	const handleBackBtn = () => navigation.goBack();

	return (
		<View className="flex-1 px-6 pt-14 bg-white">
			<BackTopBar headline="Membership" icon2="" func={handleBackBtn} />
			{/* loading spinner */}
			<View>{processing && <LoadingSpinner />}</View>

			{option === "membership" ? (
				<View className="mt-4">
					{memberList && memberList.eventMembers?.length > 0 && (
						<>
							<HorizontalTitle
								title="Event Members"
								icon=""
								action=""
							/>
							<FlatList
								data={memberList.eventMembers}
								vertical
								keyExtractor={(item) => item._id}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{
									paddingHorizontal: 10,
									paddingVertical: 10,
								}}
								renderItem={({ item }) => (
									<MemberCardHori
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
			) : (
				<View className="mt-4">
					{/* event members request */}
					{memberList && memberList.joinRequests?.length > 0 && (
						<>
							<HorizontalTitle
								title="Join Requests"
								icon=""
								action=""
							/>
							<FlatList
								data={memberList.joinRequests}
								vertical
								keyExtractor={(item) => item._id}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{
									paddingHorizontal: 10,
									paddingVertical: 10,
								}}
								renderItem={({ item }) => (
									<MemberCardHori
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
												`Accept ${user.firstName}`,
												"Are you sure?",
												[
													{
														text: "Cancel",
														style: "cancel",
													},
													{
														text: "OK",
														onPress: () =>
															handleAcceptMembershipRequest(
																setProcessing,
																eventId,
																user._id,
																token,
															),
													},
												],
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
			)}
		</View>
	);
};

const styles = StyleSheet.create({});

export default AllEventMembers;
