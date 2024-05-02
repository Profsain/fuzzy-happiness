import * as ImagePicker from "expo-image-picker";

 // load profile image from device
  const handlePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      // upload photo to cloudinary
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
      let data = {
        file: base64Img,
        upload_preset: "hwebe1a7",
      };

      const url = await uploadPhoto(data);
      return url;
    }

    if(result.canceled) {
        console.log("Image picker canceled");
    }
  };

// upload profile photo to Cloudinary
const uploadPhoto = async (data) => {
  let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvwxyofm2/image/upload";

  try {
    const response = await fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const responseData = await response.json();
    const url = responseData.secure_url;
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error 
  }
};

  
export default handlePhoto;