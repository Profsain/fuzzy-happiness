import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar } from "../home";
import { primeryColor } from "../../utils/appstyle";
import CommunityCard from "./CommunityCard";
import { useLogin } from "../../context/LoginProvider";
import LoadingSpinner from "../LoadingSpinner";

const CommunityList = ({ navigation }) => {
  const baseUrl = process.env.BASE_URL;

  const { userProfile, token, communities, setCommunities, setAllUsers } =
    useLogin();
  const userId = userProfile._id;

  const [loading, setLoading] = useState(false);

  // Fetch all communities and store them
  const fetchAllCommunities = useCallback(async () => {
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
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommunities(sortedData); // Update communities in context
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token, setCommunities]);

  // Fetch communities only if the list is empty
  useEffect(() => {
    if (communities.length === 0) {
      fetchAllCommunities();
    }
  }, [communities.length, fetchAllCommunities]);

  // Refetch communities when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchAllCommunities();
    }, [fetchAllCommunities])
  );

  // Filter communities for the current user
  const filteredCommunities = communities.filter(
    (community) =>
      community.communityCreator === userId ||
      community.communityMembers.includes(userId)
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top section */}
      <View>
        <BackTopBar
          headline="Community"
          icon=""
          icon2={<AntDesign name="search1" size={24} color="black" />}
        />
        {/* create community button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateCommunity")}
          style={{ backgroundColor: primeryColor }}
          className="flex justify-center items-center flex-row p-3 rounded-lg shadow-lg my-4 "
        >
          <AntDesign name="pluscircleo" size={26} color="white" />
          <Text className="ml-6 font-medium text-white">
            Create New Community
          </Text>
        </TouchableOpacity>
      </View>

      {/* community list */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredCommunities.length === 0 ? (
        <View>
          <Text className="text-center text-gray-500 text-lg">
            No community found
          </Text>
          <TouchableOpacity
            onPress={fetchAllCommunities}
            className="flex justify-center items-center flex-row p-3 rounded-lg shadow-lg my-4 bg-slate-300 w-32 mx-auto"
          >
            <AntDesign name="reload1" size={26} color="white" />
            <Text className="ml-2 font-medium text-white">Reload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredCommunities}
          renderItem={({ item }) => <CommunityCard community={item} />}
          keyExtractor={(item) => item._id} // No need to use toString(), _id is unique
        />
      )}
    </SafeAreaView>
  );
};

export default CommunityList;
