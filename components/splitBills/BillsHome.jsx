import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useFetchWallet from "../../hooks/useFetchWallet";
import { AntDesign } from "@expo/vector-icons";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomButton from "../CustomButton";
import { primeryColor } from "../../utils/appstyle";
import GroupBillsCard from "./component/GroupBillsCard";
import EventBillCard from "./component/EventBillCard";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import LoadingSpinner from "../LoadingSpinner";
import { useLogin } from "../../context/LoginProvider";
import RequestMoneyCard from "./component/RequestMoneyCard";
import formatDate from "../../utils/formatDate";
import { ScrollView } from "react-native-virtualized-view";
import calculateRequestMoney from "./methods/calculateRequestMoney";
import fetchUserEvents from "../../utils/fetchUserEvents";

const BillsHome = ({ navigation }) => {
  const { userProfile, setUserProfile, token } = useLogin();
  const { isWalletCreated, phoneNumber, _id, currency, currencySymbol } =
    userProfile;

  // wallet data
  // call useFetchWallet
  const { wallet, fetchWallet } = useFetchWallet();
  const [requestBills, setRequestBills] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  // check wallet data and sort request bills
  useEffect(() => {
    if (wallet) {
      const { moneyRequests } = wallet;
      const sortedRequestBills = moneyRequests?.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRequestBills(sortedRequestBills);
      setLoading(false);
    }
  }, [wallet]);

  // re-fetch wallet on screen focus
  const fetchWalletData = useCallback(() => {
    fetchWallet(); // Call fetchWallet from the hook
  }, [fetchWallet]);

  useFocusEffect(fetchWalletData);

  // calculate money received and outstanding
  const { receivedAmount, pendingAmount } = calculateRequestMoney(
    wallet?.moneyRequests
  );

  const baseUrl = process.env.BASE_URL;

  // component state
  const [processing, setProcessing] = useState(false);

  // fetch user events
  const [userEvents, setUserEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState({});
  const [loadingEvents, setLoadingEvents] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      if (_id) {
        setLoadingEvents(true);
        const events = await fetchUserEvents(_id, token);
        // filter events that is isEventCostSplitted is true
        const filteredEvents = events.filter((event) => event.isEventCostSplitted === true);

        setUserEvents(filteredEvents);
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, [_id]);

  // Alert.alert("User Events", JSON.stringify(userEvents));
  // handle activate wallet
  const handleActivateWallet = async () => {
    setProcessing(true);
    // create new wallet account
    try {
      const response = await fetch(`${baseUrl}/wallet/create-wallet/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // update userProfile context
        setUserProfile({
          ...userProfile,
          isWalletCreated: true,
          walletAccountNumber: data.accountNumber,
        });

        Alert.alert("Success", "Wallet account activated successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("TransactionScreen"),
          },
        ]);
        // Alert.alert("Wallet ", JSON.stringify(data));
        setProcessing(false);
      } else {
        const error = await response.json();
        Alert.alert("Error yy", JSON.stringify(error));
        setProcessing(false);
      }
    } catch (error) {
      Alert.alert("Error xx", JSON.stringify(error.message));
      setProcessing(false);
      throw new Error(error.message);
    }
  };

  // handle create new bill
  const handleCreateNewBill = () => {
    // navigate to create new bill screen
    navigation.navigate("CreateNewBills");
  };

  // handle pay someone
  const handlePaySomeone = () => {
    navigation.navigate("TransferMoney");
  };

  // handle request money
  const handleRequestMoney = () => {
    navigation.navigate("RequestPay");
  };

  // handle view all recent bills
  const handleRecentBills = () => {
    Alert.alert("View all recent bills");
  };

  // handle accept request
  const handleAcceptRequest = async (requestId) => {
    const acceptRequest = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/wallet/accept-request/${_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ requestId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          Alert.alert("Success", "Request accepted successfully");
          // Update the requestBills state to reflect the accepted request
          setRequestBills((prevRequests) =>
            prevRequests.map((request) =>
              request._id === requestId
                ? { ...request, status: "accepted" }
                : request
            )
          );

          // fetch wallet data
          await fetchWallet();
        } else {
          const error = await response.json();
          Alert.alert("Error", error.error || "Failed to accept request");
        }
      } catch (error) {
        Alert.alert("Error", error.message || "Something went wrong");
      }
    };

    // Confirm the accept request
    Alert.alert(
      "Accept Request",
      "Are you sure you want to accept this request?",
      [
        {
          text: "Yes",
          onPress: acceptRequest,
        },
        {
          text: "No",
        },
      ]
    );
  };

  // handle decline request
  const handleDeclineRequest = async (requestId) => {
    const declineRequest = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/wallet/decline-request/${_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ requestId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          Alert.alert("Success", "Request declined successfully");
          // Update the requestBills state to reflect the declined request
          setRequestBills((prevRequests) =>
            prevRequests.map((request) =>
              request._id === requestId
                ? { ...request, status: "declined" }
                : request
            )
          );
        } else {
          const error = await response.json();
          Alert.alert("Error", error.error || "Failed to decline request");
        }
      } catch (error) {
        Alert.alert("Error", error.message || "Something went wrong");
      }
    };

    // Confirm the decline request
    Alert.alert(
      "Decline Request",
      "Are you sure you want to decline this request?",
      [
        {
          text: "Yes",
          onPress: declineRequest,
        },
        {
          text: "No",
        },
      ]
    );
  };

  // render item function for FlatList
  const renderItem = ({ item }) => (
    <RequestMoneyCard
      transactionName={item.description.slice(0, 20)}
      transactionAmount={`${currencySymbol}${item.amount}`}
      transactionDate={formatDate(item.date)}
      transactionStatus={item.status}
      onAccept={() => handleAcceptRequest(item._id)}
      onDecline={() => handleDeclineRequest(item._id)}
    />
  );

  // handle open event group
  const handleOpenGroup = () => {
    // navigate to BillsGroup screen with useEvent list
    navigation.navigate("BillsGroup", { userEvents });
  }

  // handle open single bill details
  const handleOpenBillDetails = (billId) => {
    // find the bill with the billId
    const event = userEvents.find((event) => event._id === billId);

    Alert.alert("Event", JSON.stringify(event));
    // navigate to BillsDetails screen with the event data
    // navigation.navigate("BillsDetails", { event });
  }

  // render event item function for FlatList
  const renderEventGroup = ({ item }) => (
    <GroupBillsCard
      eventName={item?.eventName}
      eventDate={formatDate(item?.eventDate)}
      eventCost={item.eventCost}
      currency={currencySymbol}
      func={() => handleOpenBillDetails(item._id)}
    />
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar headline="Split Bills" icon="" />

      {/* top card */}
      <View
        style={{ backgroundColor: primeryColor }}
        className="p-3 pb-0 my-4 rounded-xl"
      >
        <Text className="text-xl font-semibold pb-2 text-slate-600">
          Total Spent
        </Text>
        <Text className="text-2xl font-bold text-slate-600">
          {currencySymbol || "$"}
          {wallet?.totalSpent?.toFixed(2) || "0.00"}
        </Text>

        <View className="flex flex-row justify-end mt-6">
          {isWalletCreated ? (
            <CustomButton
              color="black"
              width={60}
              height={34}
              fSize={12}
              mr={12}
              backgroundColor="white"
              label="Wallet"
              buttonFunc={() => navigation.navigate("TransactionScreen")}
            />
          ) : !processing ? (
            <CustomButton
              color="black"
              width={120}
              height={34}
              fSize={12}
              mr={12}
              backgroundColor="white"
              label="Activate Wallet"
              buttonFunc={handleActivateWallet}
            />
          ) : (
            <LoadingSpinner text="" color="white" />
          )}

          <CustomButton
            color="black"
            width={120}
            height={34}
            fSize={12}
            backgroundColor="white"
            label="Transaction History"
            buttonFunc={() => navigation.navigate("TransactionHistory")}
          />
        </View>
      </View>

      <ScrollView>
        {/* top group section, title header  */}
        <HorizontalTitle
          title="Groups"
          action="View all"
          func={handleOpenGroup}
        />
        <View className="flex flex-row">
          <View className="h-24 w-24 bg-gray-200 rounded-2xl p-3 flex justify-center items-center">
            <TouchableOpacity
              onPress={handleCreateNewBill}
              className="bg-white p-3 rounded-full h-9 w-9 text-center mb-4"
            >
              <AntDesign
                name="plus"
                size={14}
                color="black"
                style={{ textAlign: "center", fontWeight: 900 }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10, fontWeight: 700 }}>
              Create new bill
            </Text>
          </View>

          {/* group bills card flatlist */}
          <View >
            {loadingEvents ? (
              <ActivityIndicator size="small" color={primeryColor} />
            ) : (
              <FlatList
                data={userEvents}
                renderItem={renderEventGroup}
                keyExtractor={(item) => item?._id.toString()}
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
              />
            )}
          </View>
          {/* <GroupBillsCard func={() => navigation.navigate("BillsDetails")} />
          <GroupBillsCard func={() => navigation.navigate("BillsDetails")} /> */}
        </View>

        {/* friends own section */}
        <View className="my-6 py-3 border rounded-md border-gray-300">
          <View className="flex flex-row px-4 justify-between content-center">
            <View>
              <Text className="text-xs leading-4 font-medium text-slate-500">
                Friends owe you
              </Text>
              <Text className="text-lg leading-7 font-medium -tracking-tighter text-slate-700">
                {currencySymbol || "$"}
                {receivedAmount.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View>
              <Text className="text-xs leading-4 font-medium text-slate-500">
                You own friends
              </Text>
              <Text className="text-lg leading-7 font-medium -tracking-tighter text-slate-700">
                {currencySymbol || "$"}
                {pendingAmount.toFixed(2) || "0.00"}
              </Text>
            </View>
          </View>
          {/* horizontal button section */}
          <View>
            <BillsHorizontalBtn func={handlePaySomeone} />
            <BillsHorizontalBtn
              text="Request money"
              iconLeft={
                <AntDesign name="arrowleft" size={24} color={primeryColor} />
              }
              func={handleRequestMoney}
            />
          </View>
        </View>

        {/* recent bills section */}
        <View>
          <HorizontalTitle
            title="Recent Bills"
            action="View all"
            func={handleRecentBills}
          />
          <View>
            <EventBillCard />
            <EventBillCard />
          </View>
        </View>

        {/* recent money request section */}
        <View>
          <HorizontalTitle title="Recent Request" />
          {/* Render the FlatList only if not loading */}
          {!loading && (
            <View className="my-8">
              <FlatList
                data={requestBills}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsHome;
