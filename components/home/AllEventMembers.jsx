import { useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Alert } from "react-native";
import BackTopBar from "./BackTopBar";
import HorizontalTitle from "./HorizontalTitle";
import MemberCardHori from "./MemberCardHori";
import LoadingSpinner from "../LoadingSpinner";

import {
	handleAcceptMembershipRequest,
	handleDeclineMembershipRequest,
} from "./funcs/membershipOperation";

const AllEventMembers = ({ navigation, route }) => {
	// extract membership list
	const { memberList, option } = route.params;

	const [processing, setProcessing] = useState(false);

	// handle back button
	const handleBackBtn = () => navigation.goBack();

	return (
		<ScrollView className="flex-1 px-6 pt-14 bg-white">
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
											Alert.alert("Accept", {
												title: `Accept ${user.firstName}`,
												message: "Are you sure?",
												buttons: [
													{
														text: "Cancel",
														style: "cancel",
													},
													{
														text: "OK",
														onPress: () =>
															handleAcceptMembershipRequest(
																setProcessing,
																memberList._id,
																user._id,
																memberList.token,
															),
													},
												],
											})
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
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default AllEventMembers;
