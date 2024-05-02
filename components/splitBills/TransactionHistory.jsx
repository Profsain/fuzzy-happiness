import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleOpenTransactionHistory } from '../../store/openScreenSlice'
import useBackHandler from '../../hooks/useDeviceBackBtn'
import { BackTopBar } from '../home'
import TransactionHistoryCard from './component/TransactionHistoryCard'

const TransactionHistory = () => {
  const dispatch = useDispatch();

  // handle back to prev screen when device back button press
  useBackHandler([() => dispatch(toggleOpenTransactionHistory())]);
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar
        headline="Transaction History"
        func={() => dispatch(toggleOpenTransactionHistory())}
      />

      {/* transaction history list */}
      
      <View className="my-8">
        <TransactionHistoryCard />
        <TransactionHistoryCard transactionName="Bills payment" transactionAmount="500"/>
        <TransactionHistoryCard />
        <TransactionHistoryCard transactionName="Transfer to Ekem" transactionAmount={500} transactionDate="23 March 2024"/>
        <TransactionHistoryCard />
        <TransactionHistoryCard />
        <TransactionHistoryCard />
        <TransactionHistoryCard />
 
      </View>
    </SafeAreaView>
  );
}

export default TransactionHistory