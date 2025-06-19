import React, { useState, useEffect } from 'react';
import { useLogin } from "../../context/LoginProvider";
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator } from 'react-native';
import { BackTopBar } from '../home';
import handlePhoto from "../../utils/uploadImage";
import LoadingSpinner from "../LoadingSpinner";

const UploadMorePictures = ({ navigation }) => {
  const { userProfile, setUserProfile, token } = useLogin();
  const baseUrl = process.env.BASE_URL;
// console.log(userProfile.uploadedPhotos)
  const [photos, setPhotos] = useState(userProfile?.uploadedPhotos || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingImages, setLoadingImages] = useState({}); // To track loading per image

  // set initial photos value from userProfile.uploadedPhotos
  useEffect(() => {
    if (userProfile) {
      setPhotos(userProfile.uploadedPhotos || []);
    }
  }, [userProfile]);

  const handleBackBtn = () => navigation.goBack();

  // handle upload picture to backend
  const pickImage = async (index = null) => {
    if (photos.length >= 6 && index === null) {
      Alert.alert('Limit Reached', 'You can only upload up to 6 pictures.');
      return;
    }

    try {
      setIsProcessing(true);
      const uploadedImageUrl = await handlePhoto();

      if (uploadedImageUrl) {
        const newPhotos = [...photos];
        if (index !== null) {
          newPhotos[index] = uploadedImageUrl;
        } else {
          newPhotos.push(uploadedImageUrl);
        }

        setPhotos(newPhotos);
        await updateUserPhotos(newPhotos);
      }

      setIsProcessing(false);
    } catch (error) {
      console.log("Error uploading image:", error);
      Alert.alert('Network Error', 'There was an issue uploading the image.');
      setIsProcessing(false);
    }
  };

  const updateUserPhotos = async (updatedPhotos) => {
    try {
      const response = await fetch(
        `${baseUrl}/user/update-user/${userProfile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uploadedPhotos: updatedPhotos }),
        }
      );

      if (response.ok) {
        setUserProfile((prev) => ({
          ...prev,
          uploadedPhotos: updatedPhotos,
        }));
      } else {
        Alert.alert('Error', 'Failed to update your photos on the server.');
      }
    } catch (err) {
      console.error("Update error:", err);
      Alert.alert('Error', 'Could not update user profile.');
    }
  };

  const confirmDelete = (index) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedPhotos = [...photos];
            updatedPhotos.splice(index, 1);
            setPhotos(updatedPhotos);
            await updateUserPhotos(updatedPhotos); // 🔁 Update backend after delete
          },
        },
      ]
    );
  };

  const handleImageLoadStart = (index) => {
    setLoadingImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageLoadEnd = (index) => {
    setLoadingImages((prev) => ({ ...prev, [index]: false }));
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => pickImage(index)}
      onLongPress={() => confirmDelete(index)}
      className="w-[31%] aspect-square rounded-xl overflow-hidden mb-4 relative"
      style={{ marginRight: (index + 1) % 3 === 0 ? 0 : '3%' }}
    >
      {loadingImages[index] && (
        <View className="absolute inset-0 justify-center items-center bg-white/60 z-10">
          <ActivityIndicator size="small" color="#f9784b" />
        </View>
      )}
      <Image
        source={{ uri: item }}
        className="w-full h-full"
        resizeMode="cover"
        onLoadStart={() => handleImageLoadStart(index)}
        onLoadEnd={() => handleImageLoadEnd(index)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-14">
      <View className="px-6">
        <BackTopBar headline="Upload Pictures" icon2="" func={handleBackBtn} />
      </View>

      <View className="px-6 mt-6 flex-1">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          Add or update your personal photos (Max 6)
        </Text>

        <FlatList
          data={photos}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {isProcessing && <LoadingSpinner text="Uploading..." />}

        {photos.length < 6 && (
          <TouchableOpacity
            className="my-16 bg-[#f9784b] py-4 rounded-xl items-center"
            onPress={() => pickImage()}
          >
            <Text className="text-white font-bold text-lg">Upload New Photo</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadMorePictures;
