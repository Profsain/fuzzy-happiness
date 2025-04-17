import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { View, TouchableOpacity } from "react-native";
import {
	CustomButton,
	CustomHeadings,
	CustomInput,
	LoadingSpinner,
} from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import useReceivedData from "../../hooks/useReceivedData";

const AddEmailScreen = ({ route, navigation }) => {
	// Extract data from the route params
	const { phoneNumber } = route.params;

	const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleEmailChange = (text) => {
		setEmail(text.trim().toLowerCase());
		const emailRegex = /\S+@\S+\.\S+/;
		// validate email
		if (text.length === 0) {
			setEmailError("Email is required");
		} else if (!emailRegex.test(text)) {
			setEmailError("Please enter a valid email");
		} else {
			setEmailError("");
			setIsValid(true);
		}
	};

	const handleNext = async () => {
		setLoading(true);
		// send data to next screen
		const data = {
			phoneNumber: phoneNumber,
			emailAddress: email,
		};

		// check if there is user with this email
		try {
			const response = await fetch(
				`${process.env.BASE_URL}/auth/check-email`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ emailAddress: email }),
				},
			);

			const checkData = await response.json();

			if (checkData.exists) {
				setEmailError(checkData.message);
			} else {
				// navigate to next screen
				navigationToScreen(navigation, "AddAddressScreen", data);
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box width="100%" justifyContent="center" p={24}>
			<CustomHeadings title="Add Your Email" />

			{/* form section */}
			<VStack space="xl" mt={15}>
				<Text fontSize={16}>
					Add the email address you'd like to use for your account.
					Receive important updates and notifications through this
					email.
				</Text>
				<CustomInput
					placeholder="Email Address"
					type="email"
					inputValue={email}
					handleTextChange={handleEmailChange}
					error={emailError}
				/>

				{/* next button */}
				<View>{loading && <LoadingSpinner />}</View>
				<View className="flex flex-row justify-center mt-28">
					{!isValid ? (
						<CustomButton
							label="Next"
							backgroundColor={secondaryColor}
							color="#000"
						/>
					) : (
						<CustomButton label="Next" buttonFunc={handleNext} />
					)}
				</View>

				{/* remember password? Login */}
				<Box mt={140}>
					<TouchableOpacity
						onPress={() =>
							navigationToScreen(navigation, "LoginUser")
						}
					>
						<Text
							size="sm"
							style={{
								color: "#000",
								textAlign: "center",
								marginTop: 6,
							}}
						>
							Already have an account?{" "}
							<Text
								size="sm"
								style={{
									color: "#000",
									textAlign: "center",
									marginTop: 6,
								}}
								onPress={() =>
									navigationToScreen(navigation, "LoginUser")
								}
							>
								Login
							</Text>
						</Text>
					</TouchableOpacity>
				</Box>
			</VStack>
		</Box>
	);
};

export default AddEmailScreen;
