import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const RemoveAccount = ({ userName, func }) => {
  return (
    <View className="flex flex-row justify-between items-center py-2 mt-2 border-b-2 border-slate-300">
      <Text>{userName || "Bam-bam 2020"}</Text>
      <TouchableOpacity onPress={func}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default RemoveAccount;
