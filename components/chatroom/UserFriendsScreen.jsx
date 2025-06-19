import {
	View,
	Text,
	SafeAreaView,
	Alert,
	FlatList,
	TextInput,
} from "react-native";
import { Fab, Box, FabIcon, FabLabel, EditIcon } from "@gluestack-ui/themed";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../context/LoginProvider";
import { secondaryColor, primeryColor } from "../../utils/appstyle";
import { BackTopBar, HorizontalTitle } from "../home";
import SearchBox from "../SearchBox";

import User from "./User";
import LoadingSpinner from "../LoadingSpinner";
import FriendsScreen from "./FriendsScreen";

const UserFriendsScreen = ({ navigation }) => {
	// base url
	const baseUrl = process.env.BASE_URL;

	// extract from useLogin context
	const { userProfile, token } = useLogin();

	// component state
	const [searchTerm, setSearchTerm] = useState("");
	const [userList, setUserList] = useState([]);
	const [loading, setLoading] = useState(false);
	// filter state
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [currentCity, setCurrentCity] = useState(userProfile?.city || "");
	const [currentCountry, setCurrentCountry] = useState(
		userProfile?.country || "",
	);
  const [filterAge, setFilterAge] = useState("");


	// handle fetch all users excluding logged in user
	const fetchAllUsers = async () => {
		setLoading(true);
		const userId = userProfile._id;

		try {
			const response = await fetch(
				`${baseUrl}/user/all-users/${userId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response) {
				const data = await response.json();
				// update state
				setLoading(false);
				setUserList(data);
			} else {
				console.log("Failed to fetch users");
				setLoading(false);
			}
		} catch (error) {
			console.log("An error occurred while fetching users", error);
		}
	};

	// call fetch
	useEffect(() => {
		fetchAllUsers();
	}, []);

	// handle search input change
	const handleSearchChange = (text) => {
		setSearchTerm(text);
	};

	// handle user card click
	const handleUserCardClick = () => {
		Alert.alert("User card clicked");
	};

	// Filtered user list based on searchTerm
	// const filteredUserList = userList.filter((user) => {
	// 	const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
	// 	return fullName.includes(searchTerm.toLowerCase());
	// });
	const filteredUserList = userList.filter((user) => {
		const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
		const matchesSearch = fullName.includes(searchTerm.toLowerCase());

		switch (selectedFilter) {
			case "city":
				return (
					matchesSearch &&
					user.city?.toLowerCase() === currentCity.toLowerCase()
				);
			case "country":
				return (
					matchesSearch &&
					user.country?.toLowerCase() === currentCountry.toLowerCase()
				);
			case "near me":
				return (
					matchesSearch &&
					user.homeAddress
						?.toLowerCase()
						.includes(
							userProfile?.homeAddress
								?.split(",")[0]
								?.toLowerCase(),
						)
				);
			case "age":
				const maxAge = filterAge || 30;
				return matchesSearch && user.age && user.age <= maxAge;
			default:
				return matchesSearch;
		}
	});

	// render user list
	const renderUser = ({ item }) => (
		<User item={item} setUserList={setUserList} userList={userList} />
	);

	// handle fab
	const handleFab = () => {
		// navigate to UserFriendsScreen
		navigation.navigate("ChatList");
	};

	// render
	return (
		<>
			<SafeAreaView className="flex-1 pt-14 bg-white">
				{/* top bar */}
				<BackTopBar headline="My Connect" icon="" />

				{/* search bar */}
				<View className="mt-4 px-8">
					<SearchBox
						searchTerm={searchTerm}
						handleSearch={handleSearchChange}
						placeholder="Search by name"
					/>

					{/* filter buttons */}
					<View className="flex-row justify-between mb-4">
						{["All", "City", "Country", "Near Me", "Age"].map(
							(filter) => (
								<Text
									key={filter}
									onPress={() =>
										setSelectedFilter(filter.toLowerCase())
									}
									style={{
										backgroundColor:
											selectedFilter ===
											filter.toLowerCase()
												? primeryColor
												: "#E0E0E0",
										color:
											selectedFilter ===
											filter.toLowerCase()
												? "white"
												: "black",
										paddingVertical: 8,
										paddingHorizontal: 12,
										borderRadius: 20,
										marginRight: 8,
									}}
								>
									{filter}
								</Text>
							),
						)}
					</View>

					{/* filter input fields */}
					<View className="mb-4">
						{/* Conditional inputs for custom filter values */}
						{selectedFilter === "city" && (
							<TextInput
								className="mt-2 p-2 border border-gray-300 rounded-md"
								placeholder="Enter city"
								value={currentCity}
								onChangeText={(text) => setCurrentCity(text)}
							/>
						)}

						{selectedFilter === "country" && (
							<TextInput
								className="mt-2 p-2 border border-gray-300 rounded-md"
								placeholder="Enter country"
								value={currentCountry}
								onChangeText={(text) => setCurrentCountry(text)}
							/>
						)}

						{selectedFilter === "near me" && (
							<TextInput
								className="mt-2 p-2 border border-gray-300 rounded-md"
								placeholder="Enter address"
								value={userProfile?.homeAddress}
								editable={false}
							/>
						)}

						{selectedFilter === "age" && (
							<TextInput
              className="mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter max age"
              keyboardType="numeric"
              value={filterAge}
              onChangeText={(age) => setFilterAge(age)}
            />
						)}
					</View>
				</View>

				<ScrollView className="px-8">
					{/* All connected friends list */}
					<View>
						{/* horizontal headings */}
						<HorizontalTitle
							title="Connected Friends"
							action=""
							icon=""
						/>
						{/* show loading spinner */}
						{loading && <LoadingSpinner />}

						{/* connected friends list */}
						<FriendsScreen userList={userList} />
					</View>

					{/* All users list */}
					<View>
						{/* horizontal headings */}
						<HorizontalTitle title="All Users" action="" icon="" />
						{/* show loading spinner */}
						{loading && <LoadingSpinner />}

						{/* user list */}
						{filteredUserList.length > 0 ? (
							<FlatList
								data={filteredUserList}
								renderItem={renderUser}
								keyExtractor={(item, index) => index.toString()}
								scroll={"vertical"}
								showsVerticalScrollIndicator={false}
							/>
						) : (
							!loading && <Text>No users found</Text>
						)}
					</View>
				</ScrollView>
				<Box
					w={320}
					bg={secondaryColor}
					$dark-bg="$backgroundDark900"
					borderRadius="$md"
				>
					<Fab
						bg={primeryColor}
						size="md"
						placement="bottom right"
						isHovered={false}
						isDisabled={false}
						isPressed={false}
						onPress={handleFab}
					>
						<FabLabel>Close</FabLabel>
					</Fab>
				</Box>
			</SafeAreaView>
		</>
	);
};

export default UserFriendsScreen;
