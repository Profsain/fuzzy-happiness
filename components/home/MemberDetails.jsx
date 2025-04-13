
import { StyleSheet, View, ScrollView, Text,  } from "react-native";
import BackTopBar from "./BackTopBar";

const MemberDetails = ({ navigation }) => {
	// handle back button
	const handleBackBtn = () => navigation.goBack();

	return (
		<ScrollView className="flex-1 px-6 pt-14 bg-white">
			<BackTopBar
				headline="Member Details"
				icon2=""
				func={handleBackBtn}
			/>
			<View className="flex-1 mt-6">
				<Text className="text-lg font-semibold mb-4 text-gray-700">
					Member Details
				</Text>
				{/* Add member details here */}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default MemberDetails;
