import { Text, SafeAreaView } from "react-native";

const ChangePassword = () => {
  const handleBackBtn = () => {
    console.log("back click");
  };
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar
        headline="Change Phone Number"
        icon2=""
        func={handleBackBtn}
      />
      <Text>Change ChangePassword</Text>
    </SafeAreaView>
  );
};

export default ChangePassword;
