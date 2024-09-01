import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const RequestMoneyCard = ({
  transactionName,
  transactionDate,
  transactionAmount,
  transactionStatus,
  onAccept,
  onDecline,
}) => {
  return (
    <View className="flex flex-row items-center justify-between my-2 border-b pb-2 border-gray-400">
      <View className="flex flex-row items-center">
        <View className="h-9 w-9 rounded-full bg-gray-300 mr-3"></View>
        <View>
          <Text className="font-medium">
            {transactionName || "New Request"}
          </Text>
          <View>
            <Text className="text-xs">
              {transactionDate || "12th Date 2024"}
            </Text>
            {/* Show accept and decline buttons if transactionStatus is pending */}
            {transactionStatus === "pending" && (
              <View className="flex flex-row mt-2">
                <TouchableOpacity
                  onPress={onAccept}
                  className="bg-slate-400 p-2 rounded mr-2"
                >
                  <Text className="text-white text-xs">Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onDecline}
                  className="bg-red-500 p-2 rounded"
                >
                  <Text className="text-white text-xs">Decline</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      <View>
        <Text className="font-medium">{transactionAmount || "-100.00"}</Text>
        <Text className="text-xs">{transactionStatus || "Pending"}</Text>
      </View>
    </View>
  );
};

export default RequestMoneyCard;
