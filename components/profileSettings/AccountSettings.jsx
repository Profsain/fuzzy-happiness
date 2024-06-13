import { View, Text, SafeAreaView } from "react-native";
import { BackTopBar } from "../home";
import OptionButton from "./component/OptionButton";

const AccountSettings = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle open screen
  const handleOpenScreen = (screenName) => {
    // navigate to screen
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Settings & Privacy" icon2="" func={handleBackBtn} />

      <View className="mt-14 flex">
        <OptionButton
          btnText="Restricted Accounts"
          iconLeft=""
          btnFunc={() => handleOpenScreen("RestrictedAccount")}
        />
        <OptionButton
          btnText="Share Profile"
          iconLeft=""
          btnFunc={() => handleOpenScreen("ShareProfile")}
        />
        <OptionButton
          btnText="Location"
          iconLeft=""
          btnFunc={() => handleOpenScreen("Location")}
        />
        <OptionButton
          btnText="Report a Problem"
          iconLeft=""
          btnFunc={() => handleOpenScreen("ReportProblem")}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;
