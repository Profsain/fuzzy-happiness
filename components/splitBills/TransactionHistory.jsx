import { View, Text, SafeAreaView, FlatList, Alert } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import useFetchWallet from "../../hooks/useFetchWallet";
import TransactionHistoryCard from "./component/TransactionHistoryCard";
import LoadingSpinner from "../LoadingSpinner";
import formatDate from "../../utils/formatDate";

const TransactionHistory = ({ navigation }) => {
  // handle back to prev screen when device back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // base URL
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const { currency, currencySymbol } = userProfile;

  // call useFetchWallet
  const { wallet, fetchWallet } = useFetchWallet();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  // fetch and process wallet data
  useEffect(() => {
    const fetchAndProcessWalletData = async () => {
      setLoading(true);
      try {
        await fetchWallet(); // Await fetchWallet to ensure data is fetched
        if (wallet) {
          const sortedTransactionHistory = wallet?.transactions?.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setTransactionHistory(sortedTransactionHistory);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch wallet data.");
      } finally {
        setLoading(false); // Set loading to false once processing is complete
      }
    };

    fetchAndProcessWalletData();
  }, [wallet, fetchWallet]);

  // re-fetch wallet on screen focus
  const fetchWalletData = useCallback(() => {
    fetchWallet(); // Call fetchWallet from the hook
  }, [fetchWallet]);

  useFocusEffect(fetchWalletData);

  // render item function for FlatList
  const renderItem = ({ item }) => (
    <TransactionHistoryCard
      transactionName={item.description.slice(0, 20)}
      transactionAmount={`${currencySymbol}${item.amount}`}
      transactionDate={formatDate(item.date)}
      transactionStatus={item.paymentStatus}
      transactionType={item.type}
    />
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar headline="Transaction History" func={handleBack} />

      {/* show loading spinner */}
      {loading && <LoadingSpinner />}

      {/* Render the FlatList only if not loading */}
      {!loading && (
        <View className="my-8">
          <FlatList
            data={transactionHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionHistory;
