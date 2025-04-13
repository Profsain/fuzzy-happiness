import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const MemberCardHori = ({ user, showActions = false, onAccept, onDecline, onView }) => {
    return (
      <View className="flex flex-row justify-between items-center mx-2 p-3 border border-gray-300 rounded-xl w-full bg-gray-50">
        <Image
          source={{ uri: user.profileImg }}
          className="w-14 h-14 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-xs mt-1 text-center">{user.firstName}</Text>
        <View className="flex flex-row mt-1 space-x-2">
          <TouchableOpacity onPress={() => onView(user)}>
            <Feather name="eye" size={18} color="black" />
          </TouchableOpacity>
          {showActions && (
            <>
              <TouchableOpacity onPress={() => onDecline(user)} className="mx-6">
                <AntDesign name="closecircleo" size={18} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onAccept(user)}>
                <AntDesign name="checkcircleo" size={18} color="green" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

export default MemberCardHori;