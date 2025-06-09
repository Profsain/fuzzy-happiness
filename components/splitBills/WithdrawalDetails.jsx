import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Alert,
    ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomButton from "../CustomButton";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import LoadingSpinner from "../LoadingSpinner";

const WithdrawalDetails = ({ navigation, route }) => {
    const { event } = route.params || {};

	const baseUrl = process.env.BASE_URL;
	const { userProfile, token } = useLogin();
	const userId = userProfile._id;

	const [accountNumber, setAccountNumber] = useState("");
	const [bankName, setBankName] = useState("");
	const [accountHolderName, setAccountHolderName] = useState("");
    const [withdrawalAmount, setWithdrawalAmount ] = useState("");
	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(false);

	// Enable button only if all fields are filled
	useEffect(() => {
		if (accountNumber && bankName && accountHolderName) {
			setValidated(true);
		} else {
			setValidated(false);
		}
	}, [accountNumber, bankName, accountHolderName]);

	const handleWithdrawRequest = async () => {
		setLoading(true);

		const requestBody = {
			accountName: accountHolderName,
			accountNumber,
			bankName,
			creatorId: userId,
            eventId: event ? event.eventId : null, // Include eventId if available
            amount: withdrawalAmount,
		};


		try {
			const response = await fetch(
				`${baseUrl}/withdrawal/withdraw-request`, // Change to correct endpoint
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				},
			);

			const data = await response.json();

			if (response.ok) {
				setLoading(false);
				Alert.alert("Success", "Withdrawal request sent!");
                // Optionally, you can reset the form fields
                setAccountNumber("");
                setBankName("");
                setAccountHolderName("");
                setValidated(false);
                // Navigate back to BillsHome after successful request
				navigation.navigate("BillsHome"); 
			} else {
				setLoading(false);
				Alert.alert("Error", data.message || "Something went wrong.");
			}
		} catch (error) {
			setLoading(false);
			Alert.alert("Error", "Failed to send withdrawal request.");
			console.error(error);
		}
	};

	return (
		<SafeAreaView className="flex-1 pt-14 bg-white">
			<View className="px-6">
				<BackTopBar
					headline="Withdrawal Request"
					func={() => navigation.goBack()}
				/>
			</View>

			<ScrollView className="px-6">
				<View className="my-8">
					<HorizontalTitle title="Withdrawal Details" action="" icon="" />
				</View>

				<View className="mb-4">
					<Text className="mb-2 text-base font-semibold text-gray-700">Amount</Text>
					<TextInput
						className="border border-gray-300 rounded-xl px-4 py-3 text-base"
						placeholder="Enter amount to withdraw"
						value={withdrawalAmount}
                        keyboardType="numeric"
						onChangeText={(text)  =>  setWithdrawalAmount(text)}
					/>
				</View>
				<View className="mb-4">
					<Text className="mb-2 text-base font-semibold text-gray-700">Account Holder Name</Text>
					<TextInput
						className="border border-gray-300 rounded-xl px-4 py-3 text-base"
						placeholder="John Doe"
						value={accountHolderName}
						onChangeText={(text)  =>  setAccountHolderName(text)}
					/>
				</View>

				<View className="mb-4">
					<Text className="mb-2 text-base font-semibold text-gray-700">Account Number</Text>
					<TextInput
						className="border border-gray-300 rounded-xl px-4 py-3 text-base"
						placeholder="1234567890"
						keyboardType="numeric"
						value={accountNumber}
						onChangeText={setAccountNumber}
					/>
				</View>

				<View className="mb-8">
					<Text className="mb-2 text-base font-semibold text-gray-700">Bank Name</Text>
					<TextInput
						className="border border-gray-300 rounded-xl px-4 py-3 text-base"
						placeholder="Bank of React"
						value={bankName}
						onChangeText={setBankName}
					/>
				</View>


				<View className="flex justify-center items-center mt-28">
				    {loading && <LoadingSpinner />}
					<CustomButton
						label="Send Request"
						buttonFunc={handleWithdrawRequest}
						
						disabled={!validated || loading}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default WithdrawalDetails;
