import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useEffect, useState,  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from "../../store/eventSlice";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { primeryColor, secondaryColor } from "../../utils/appstyle";
import { Picker } from "@react-native-picker/picker";

const WithdrawaRequest = ({ navigation }) => {
	const { userProfile} = useLogin();
	const dispatch = useDispatch();

	const userId = userProfile._id;
	const events = useSelector((state) => state.events.events);

	useEffect(() => {
		dispatch(fetchUserEvents(userId));
	}, [userId]);

	const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventId, setEventId] = useState(null);
	const event = useMemo(() => {
	return events.find((event) => event._id === selectedEvent);
}, [selectedEvent]);

	const [eventBalance, setEventBalance] = useState("");
    const [balanceAmount, setBalanceAmount] = useState(0);
	const [eventName, setEventName] = useState("");
	

	useEffect(() => {
		if (event) {
			setEventBalance("$" + event.totalPaidByMembers || 0.0);
			setEventName(event.eventName);
            setBalanceAmount(event.totalPaidByMembers);
            setEventId(event._id);
		}
	}, [event]);

    // console.log("event", events);
	const handleWithdrawRequest = async () => {
        // navigate to WithdrawalDetails screen with event object
        if (!selectedEvent) {
            Alert.alert("Error", "Please select an event.");
            return;
        }
        
        navigation.navigate("WithdrawalDetails", {
            event: {
                eventId,
                eventName: eventName,
                eventBalance: eventBalance,
            },
        });
	};

	const eventItems = events
		.filter((event) => !event.iseventBalanceSplitted)
		.map((event) => ({
			label: event.eventName,
			value: event._id,
		}));

	return (
		<SafeAreaView className="flex-1 pt-14 bg-white">
			<View className="px-6">
				<BackTopBar
					headline="Withdrawal Request"
					func={() => navigation.goBack()}
				/>
			</View>
			<ScrollView className="px-6">
				<View className="my-8 ">
					{/* select event from eventItems */}
					<View className="mb-4">
						<Text className="mb-2 text-base font-semibold text-slate-600">
							Select Event
						</Text>

						<View
							style={{
								borderWidth: 1,
								borderColor: "lightgray",
								borderRadius: 8,
								overflow: "hidden",

								backgroundColor: "#f0f0f0",
							}}
						>
							<Picker
								selectedValue={selectedEvent}
								onValueChange={(itemValue, itemIndex) => {
									if (itemValue !== null)
										setSelectedEvent(itemValue);
								}}
							>
								<Picker.Item
									label="Choose an Event..."
									value={null}
								/>
								{eventItems?.map((item) => (
									<Picker.Item
										key={item.value}
										label={item.label}
										value={item.value}
									/>
								))}
							</Picker>
						</View>
						{/* show error if no event */}
						{eventItems.length === 0 && (
							<Text className="text-red-500 mt-2">
								No events available. Please create an event
								first or split an event bills.
							</Text>
						)}
					</View>
                    
					<CustomInput
						placeholder="Event Name"
						inputValue={eventName}
					/>

					<Text className="mb-2 text-base font-semibold text-slate-600">
						Event Balance
					</Text>
                    {selectedEvent && balanceAmount === 0 && (
                        <Text className="text-red-500 mb-2">
                            No balance available for withdrawal.
                            </Text>)}
                    {/* show event balance */}
					<View className="px-2 py-3 border border-slate-300 rounded-lg mb-4">
						<Text className="text-lg">{eventBalance || 0.0}</Text>
					</View>
					
				</View>

				<View className="flex justify-center items-center mt-8">
                    {/* remove not ! */}

					{!selectedEvent || !balanceAmount === 0 ? (
						<CustomButton
							label="Proceed"
							backgroundColor={secondaryColor}
						/>
					) : (
						<CustomButton
							label="Proceed"
							buttonFunc={handleWithdrawRequest}
						/>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		color: "black",
		paddingRight: 30,
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: "gray",
		borderRadius: 8,
		color: "black",
		paddingRight: 30,
	},
});

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		width: "100%",
		height: 150,
		paddingHorizontal: 10,
		paddingVertical: 10,
		fontSize: 18,
		textAlignVertical: "top",
	},
});

export default WithdrawaRequest;
