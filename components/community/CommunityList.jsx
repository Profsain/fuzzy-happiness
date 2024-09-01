import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar } from "../home";
import { primeryColor } from "../../utils/appstyle";
import CommunityCard from "./CommunityCard";
import { useLogin } from "../../context/LoginProvider";
import LoadingSpinner from "../LoadingSpinner";

const CommunityList = ({ navigation }) => {

  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token, communities, setCommunities, setAllUsers } =
    useLogin();
  const userId = userProfile._id;

  // fetch all users and update allUsers context
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/get-all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // update allUsers context
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // fetch all communities
  const [communitiesList, setCommunitiesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCommunities = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/community/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // Sort communities by createdAt field
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLoading(false);
      // update communities context
      setCommunities(sortedData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // check if communities is empty and fetch all communities
  useEffect(() => {
    if (communities.length === 0) {
      fetchAllCommunities();
    } else {
      setCommunitiesList(communities);
    }
  }, []);

  // Fetch all posts when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAllCommunities();
    }, [])
  );

  // Filter communities based on whether the user created them or belongs to them
  const filteredCommunities = communities.filter((community) => {
    return (
      community.communityCreator === userId ||
      community.communityMembers.includes(userId)
    );
  });

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top section */}
      <View>
        <BackTopBar
          headline="Community"
          icon=""
          icon2={<AntDesign name="search1" size={24} color="black" />}
        />
        {/* create community full button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateCommunity")}
          style={{ backgroundColor: primeryColor }}
          className="flex justify-center items-center flex-row p-3 rounded-lg shadow-lg my-4 "
        >
          <AntDesign name="pluscircleo" size={26} color="white" />
          <View className="">
            <Text className="ml-6 font-medium text-white">
              Create New Community
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* community list */}
      {loading && <LoadingSpinner />}
      {/* use FlatList to render Communities */}
      {!loading && filteredCommunities.length === 0 && (
        <View>
          <Text className="text-center text-gray-500 text-lg">
            No community found
          </Text>
          {/* reload community */}
          <TouchableOpacity
            onPress={fetchAllCommunities}
            className="flex justify-center items-center flex-row p-3 rounded-lg shadow-lg my-4 bg-slate-300 w-32 mx-auto"
          >
            <AntDesign name="reload1" size={26} color="white" />
            <View className="">
              <Text className="ml-2 font-medium text-white">Reload</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredCommunities}
        renderItem={({ item }) => <CommunityCard community={item} />}
        keyExtractor={(item) => item._id.toString()} // Use _id instead of id for MongoDB ObjectIDs
        vertical={true}
      />
    </SafeAreaView>
  );
};

export default CommunityList;
