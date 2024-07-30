import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { BackTopBar } from '../home'
import TransactionHistoryCard from './component/TransactionHistoryCard'

const TransactionHistory = ({navigation}) => {
  // handle back to prev screen when device back button press
  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar headline="Transaction History" func={handleBack} />

      {/* transaction history list */}

      <View className="my-8">
        <TransactionHistoryCard />
        <TransactionHistoryCard
          transactionName="Bills payment"
          transactionAmount="500"
        />
        <TransactionHistoryCard />
        <TransactionHistoryCard
          transactionName="Transfer to Ekem"
          transactionAmount={500}
          transactionDate="23 March 2024"
        />
        <TransactionHistoryCard />
        <TransactionHistoryCard />
        <TransactionHistoryCard />
        <TransactionHistoryCard />
      </View>
    </SafeAreaView>
  );
}

export default TransactionHistory