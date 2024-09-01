import { Text, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";

const ChooseNotificationType = () => {
  const handleBackBtn = () => {
    console.log("back click");
  };
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar
        headline="Choose Notification Type"
        icon2=""
        func={handleBackBtn}
      />
      <Text> Choose Notification Type</Text>
    </SafeAreaView>
  );
};

export default ChooseNotificationType;
