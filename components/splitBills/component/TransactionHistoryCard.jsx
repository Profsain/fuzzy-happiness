import { View, Text } from 'react-native'
import React from 'react'

const TransactionHistoryCard = ({transactionName, transactionDate, transactionAmount, transactionStatus}) => {
  return (
    <View className="flex flex-row items-center justify-between my-2 border-b pb-2 border-gray-400">
      <View className="flex flex-row items-center">
        <View className="h-9 w-9 rounded-full bg-gray-300 mr-3"></View>
        <View>
          <Text className="font-medium">
            {transactionName || "Transfer to Pascal"}
          </Text>
          <Text className="text-xs">{transactionDate || "12th Date 2024"}</Text>
        </View>
      </View>
      <View>
        <Text className="font-medium">${transactionAmount || "-100.00"}</Text>
        <Text className="text-xs">{transactionStatus || "Successful"}</Text>
      </View>
    </View>
  );
}

export default TransactionHistoryCard;