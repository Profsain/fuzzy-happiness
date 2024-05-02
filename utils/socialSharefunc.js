import { Share } from "react-native"; // assuming you are using React Native

const handleSocialShare = async (message) => {
  // share to social media
  try {
    const result = await Share.share({
      message: `${message}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("shared with activity type", result.activityType);
      } else {
        // shared
        console.log("shared");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("dismissed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default handleSocialShare;
