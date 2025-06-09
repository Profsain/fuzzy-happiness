import { View, Text, SafeAreaView, FlatList, Alert } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import WithdrawalHistoryCard from "./component/WithdrawalHistoryCard";
import LoadingSpinner from "../LoadingSpinner";
import formatDate from "../../utils/formatDate";
import { th } from "react-native-paper-dates";

const WithdrawalHistory = ({ navigation }) => {
  // handle back to prev screen when device back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // base URL
  const baseUrl = process.env.BASE_URL;
  const { userProfile, token } = useLogin();
  const { currency, currencySymbol } = userProfile;

  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true


  // fetch and process withdrawal history data
  const fetchAndProcessWithdrawalData = async () => {
    console.log("Fetching withdrawal history for user:", userProfile._id);
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/withdrawal/withdrawal-history/${userProfile._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
        if (response.ok) {
            const sortedWithdrawalHistory = data?.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            setWithdrawalHistory(sortedWithdrawalHistory);
            }
        else {
            // Alert.alert("Connect Error", "Failed to fetch withdrawal history.");
        }
    } catch (error) {
      throw new Error("Error fetching withdrawal history: " + error.message);
    } finally {
      setLoading(false); // Set loading to false once processing is complete
    }
  };

    useEffect(() => {
        fetchAndProcessWithdrawalData();
    }, []);


  // re-fetch wallet on screen focus
  const fetchWithdrawalData = useCallback(() => {
    fetchAndProcessWithdrawalData(); // Call fetchAndProcessWithdrawalData to refresh data
  }, []);

  useFocusEffect(fetchWithdrawalData);

  // render item function for FlatList
  const renderItem = ({ item }) => (
    <WithdrawalHistoryCard
      withdrawalName={item.eventName}
        withdrawalAmount={`${currencySymbol}${item.amount}`}
        withdrawalDate={formatDate(item.createdAt)}
        withdrawalStatus={item.status}
      
    />
  );

  return (
    <SafeAreaView className="flex-1 pt-14 bg-white">
      {/* top bar */}
      <View className="px-6">
        <BackTopBar headline="Withdrawal History" func={handleBack} />
      </View>

      {/* show loading spinner */}
      {loading && <LoadingSpinner />}

      {withdrawalHistory?.length === 0 && !loading && (
        <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-lg">
                No withdrawal history found.
                </Text>
                </View>
            )}

      {/* Render the FlatList only if not loading */}
      {!loading && (
        <View className="my-8 px-6">
          <FlatList
            data={withdrawalHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WithdrawalHistory;
