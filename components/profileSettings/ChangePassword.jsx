import { Text, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";

const ChangePassword = ({ navigation }) => {
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Change Password" icon2="" func={handleBackBtn} />
      <Text>Change ChangePassword</Text>
    </SafeAreaView>
  );
};

export default ChangePassword;
