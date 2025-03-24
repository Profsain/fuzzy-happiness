import { View, Text, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { BackTopBar } from '../home';
import { primeryColor } from '../../utils/appstyle';
import CommunityCard from './CommunityCard';
import { useLogin } from '../../context/LoginProvider';
import LoadingSpinner from '../LoadingSpinner';
import CustomButton from '../CustomButton';

const ChatTerms = ({ onAccept }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Community Terms of Engagement
      </Text>
      <Text style={{ marginTop: 10, fontSize: 16, marginBottom: 40, textAlign: 'center' }}>
        By using Splinx Planet, you agree to not post or engage in objectionable content, including hate speech, harassment, or illegal activities. Violations may result in account suspension.
      </Text>
      <CustomButton buttonFunc={onAccept} label="Accept Terms & Proceed" />
    </View>
  );
};

const CommunityList = ({ navigation }) => {
  const baseUrl = process.env.BASE_URL;
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userProfile, token, communities, setCommunities } = useLogin();
  const userId = userProfile._id;

  const fetchAllCommunities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/community/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCommunities(sortedData);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token, setCommunities]);

  const handleAccept = async () => {
    await AsyncStorage.setItem('termsAccepted', 'true');
    setIsAccepted(true);
  };

  useEffect(() => {
    const checkTermsAccepted = async () => {
      try {
        const value = await AsyncStorage.getItem('termsAccepted');
        setIsAccepted(value === 'true');
      } catch (error) {
        console.error('Error retrieving terms acceptance status:', error);
      }
    };
    checkTermsAccepted();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllCommunities();
    }, [fetchAllCommunities])
  );

  const filteredCommunities = communities.filter(
    (community) => community.communityCreator === userId || community.communityMembers.includes(userId)
  );

  if (!isAccepted) return <ChatTerms onAccept={handleAccept} />;

  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      <View className="px-8">
        <BackTopBar
          headline="Community"
          icon=""
          icon2={<AntDesign name="search1" size={24} color="black" />}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCommunity')}
          style={{ backgroundColor: primeryColor }}
          className="flex justify-center items-center flex-row p-3 rounded-lg shadow-lg my-4"
        >
          <AntDesign name="pluscircleo" size={26} color="white" />
          <Text className="ml-6 font-medium text-white">Create New Community</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <LoadingSpinner />
      ) : filteredCommunities.length === 0 ? (
        <View className="px-8">
          <Text className="text-center text-gray-500 text-lg">No community found</Text>
          <TouchableOpacity
            onPress={fetchAllCommunities}
            className="flex justify-center items-center flex-row p-3 rounded-lg shadow-lg my-4 bg-slate-300 w-32 mx-auto"
          >
            <AntDesign name="reload1" size={26} color="white" />
            <Text className="ml-2 font-medium text-white">Reload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-8">
          <FlatList
            data={filteredCommunities}
            renderItem={({ item }) => <CommunityCard community={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CommunityList;
