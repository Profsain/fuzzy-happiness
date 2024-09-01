import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

const ConnectedFriend = ({ item }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;

  const navigation = useNavigation();

  // handle navigate to chat room
  const handleGoChatRoom = () => {
    const user = {
      friendId: item._id,
      friendName: item.name,
      friendImage: item.image,
    };
    navigation.navigate("ChatRoom", { user });
  };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{
          uri:
            item.image ||
            "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1713381212~exp=1713384812~hmac=9db911ae74ca122c7bdd2eb2310c4a51f167567423c4aebcf59cf8b9a7c9f2f6&w=740",
        }}
      />

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>

      <Pressable
        onPress={handleGoChatRoom}
        style={{ backgroundColor: "#f9784b", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Chat Now</Text>
      </Pressable>
    </Pressable>
  );
};

export default ConnectedFriend;

const styles = StyleSheet.create({});
