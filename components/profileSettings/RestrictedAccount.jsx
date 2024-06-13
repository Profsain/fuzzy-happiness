import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BackTopBar } from "../home";
import { AntDesign } from "@expo/vector-icons";
import RemoveAccount from "./component/RemoveAccount";

const RestrictedAccount = ({ navigation }) => {
  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle remove account
  const removeAccount = () => {
    // remove account
    Alert.alert(
      "Account Removed",
      "Your account has been removed successfully"
    );
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Settings & Privacy" icon2="" func={handleBackBtn} />

      <View className="mt-14 flex">
        <RemoveAccount userName="Bimbo Joe" func={removeAccount} />
        <RemoveAccount userName="Mariam Ali" func={removeAccount} />
        <RemoveAccount userName="Adam Wallie" func={removeAccount} />
      </View>
    </SafeAreaView>
  );
};

export default RestrictedAccount;
