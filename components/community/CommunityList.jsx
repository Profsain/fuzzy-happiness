import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar } from "../home";
import { primeryColor } from "../../utils/appstyle";
import CommunityCard from "./CommunityCard";
import { useLogin } from "../../context/LoginProvider";
import LoadingSpinner from "../LoadingSpinner";

const CommunityList = ({ navigation }) => {
  const communitiesMock = [
    {
      id: 1,
      communityName: "Ballers Corner",
      createdBy: "John",
      description: "Community Description",
      createdAt: "14/05/2024",
      members: 100,
      posts: 200,
      coverImage:
        "https://img.freepik.com/free-photo/decorated-banquet-hall-with-served-round-table-with-hydrangea-centerpiece-chiavari-chairs_8353-10059.jpg?t=st=1714005008~exp=1714008608~hmac=808f01105efa63d0d81162d24a9046582dd11564e9c9f209c4e2a6d90ea88cf1&w=826",
    },
    {
      id: 2,
      communityName: "GMC Party Night",
      createdBy: "Profsain",
      description: "Community Description",
      createAt: "20/06/2024",
      members: 300,
      posts: 200,
      coverImage:
        "https://img.freepik.com/premium-photo/happy-friends-laughing-while-they-play-strategy-video-games-using-controller-tv-console-have-fun-together-young-people-enjoying-leisure-activity-with-beer-bottles-gaming-teamwork_482257-51859.jpg?w=826",
    },
    {
      id: 3,
      communityName: "Luxury Life",
      createdBy: "Paul",
      description: "Community Description",
      createAt: "08/04/2024",
      members: 160,
      posts: 200,
      coverImage:
        "https://img.freepik.com/free-photo/young-adults-having-fun-costumes-party_23-2149303831.jpg?t=st=1714005409~exp=1714009009~hmac=6c522380f75293dd39e56ddc5f79651f8686c66d8f3aad97a3c2ee48ce85a38c&w=826",
    },
    {
      id: 4,
      communityName: "Code Girls",
      createdBy: "Amanda",
      description: "Community Description",
      createAt: "12/06/2024",
      members: 500,
      posts: 200,
      coverImage:
        "https://img.freepik.com/free-photo/celebration-labour-day-with-3d-cartoon-portrait-working-woman_23-2151306578.jpg?t=st=1714005574~exp=1714009174~hmac=19eeb30c8cde1a22ebad54273269971f8901edc09c81d01488371dd60e250d50&w=826",
    },
    {
      id: 5,
      communityName: "Friday Vibes",
      description: "Community Description",
      createdBy: "Jose",
      createAt: "22/04/2024",
      members: 1500,
      posts: 200,
      coverImage:
        "https://img.freepik.com/free-photo/young-adults-having-fun-costumes-party_23-2149303855.jpg?t=st=1714005504~exp=1714009104~hmac=59293397c3270f71e690901eaeb25d3868eb7568e170abd2c9ed2a1062121e09&w=826",
    },
    {
      id: 6,
      communityName: "Techies Hub",
      createdBy: "Raymond",
      description: "Community Description",
      createAt: "18/05/2024",
      members: 350,
      posts: 200,
      coverImage:
        "https://img.freepik.com/free-photo/software-developers-sitting-desk-developing-functional-data-encryption-system-multiethnic-cyber-security-team-members-agency-office-writing-cloud-database-processing-algorithm_482257-40528.jpg?t=st=1714005643~exp=1714009243~hmac=93d88068cae3e5d23f420baa9bce18e05c691ad63fa58c22cd83e29be21ffefa&w=826",
    },
  ];
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
      data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLoading(false);
      // update communities context
      setCommunities(data);
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
      {filteredCommunities.length === 0 && (
        <Text className="text-center text-gray-500 text-lg">
          No community found
        </Text>
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
