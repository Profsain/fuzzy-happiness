import { View, Text } from 'react-native'
import { primeryColor, secondaryColor } from '../../../utils/appstyle';

const WithdrawalHistoryCard = ({withdrawalName, withdrawalAmount, withdrawalDate, withdrawalStatus}) => {
  return (
    <View className="flex flex-row items-center justify-between my-2 border-b pb-2 border-gray-400">
      <View className="flex flex-row items-center">
        <View className="h-9 w-9 rounded-full bg-orange-100 mr-3"></View>
        <View>
          <Text className="font-medium">
            {withdrawalName || "Cool Event Withdrawal" }
          </Text>
          <Text className="text-xs">{withdrawalDate || "12th Date 2024"}</Text>
        </View>
      </View>
      <View>
        <Text className="font-medium">{withdrawalAmount || "100.00"}</Text>
        <Text className="text-xs" style={{color: primeryColor}}>{withdrawalStatus || "Default"}</Text>
      </View>
    </View>
  );
}

export default WithdrawalHistoryCard;