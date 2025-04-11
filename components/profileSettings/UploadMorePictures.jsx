import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { BackTopBar } from '../home';
import handlePhoto from "../../utils/uploadImage";
import LoadingSpinner from "../LoadingSpinner";


const UploadMorePictures = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackBtn = () => {
    navigation.goBack();
  };

  const pickImage = async (index = null) => {
    if (photos.length >= 6 && index === null) {
      Alert.alert('Limit Reached', 'You can only upload up to 6 pictures.');
      return;
    }

    try {
      setIsProcessing(true);
      const uploadedImageUrl = await handlePhoto();  // Call the handlePhoto function to upload the image
      if (uploadedImageUrl) {
        const newPhotos = [...photos];
        if (index !== null) {
          newPhotos[index] = uploadedImageUrl;  // Replace the existing photo if index is provided
        } else {
          newPhotos.push(uploadedImageUrl);  // Add the new image URL to the photos array
        }
        setPhotos(newPhotos);
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      console.log("Error uploading image:", error);
      Alert.alert('Error', 'There was an issue uploading the image.');
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
          onPress: () => {
            const updatedPhotos = [...photos];
            updatedPhotos.splice(index, 1);
            setPhotos(updatedPhotos);
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => pickImage(index)}
      onLongPress={() => confirmDelete(index)}
      className="w-[31%] aspect-square rounded-xl overflow-hidden mb-4"
      style={{ marginRight: (index + 1) % 3 === 0 ? 0 : '3%' }}
    >
      <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
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

        <View>
          {isProcessing && (
            <LoadingSpinner
              text="Uploading..."
            />
          )}
        </View>
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
