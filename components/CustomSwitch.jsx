import { View, Text, Alert } from "react-native";
import { Switch } from "@gluestack-ui/themed";
import { primeryColor, secondaryColor } from "../utils/appstyle";

const CustomSwitch = ({ switchText, notification, setNotification }) => {
  // handle notification update
  const handleNotification = () => {
    setNotification(!notification);
  };

  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="font-md text-xl">{switchText || "notifications"}</Text>
      {/* toggle switch button */}
      <View>
        <Switch
          size="lg"
          isDisabled={false}
          value={notification}
          onToggle={handleNotification}
          trackColor={{ false: "#767577", true: secondaryColor }}
          thumbColor={notification ? primeryColor : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

export default CustomSwitch;
