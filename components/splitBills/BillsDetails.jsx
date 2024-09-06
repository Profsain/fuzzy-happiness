// import React, { useState, useEffect } from "react";
// import { View, Text, SafeAreaView, Alert } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { Octicons } from "@expo/vector-icons";
// import { primeryColor } from "../../utils/appstyle";
// import { BackTopBar, HorizontalTitle } from "../home";
// import MemberProfileCard from "./component/MemberProfileCard";
// import BillsHorizontalBtn from "./component/BillsHorizontalBtn";

// const BillsDetails = ({ navigation, eventName = "Karaoke", eventId }) => {
//   const [membersInfo, setMembersInfo] = useState([]);

//   // Fetch event members info
//   useEffect(() => {
//     const fetchMembersInfo = async () => {
//       try {
//         const response = await fetch(`https://your-api-url/api/event/${eventId}/members-info`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch event members info');
//         }
//         const data = await response.json();
//         setMembersInfo(data);
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error', 'Could not fetch members info');
//       }
//     };

//     fetchMembersInfo();
//   }, [eventId]);

//   // Handle make transaction
//   const handleMakeTransaction = () => {
//     navigation.navigate("TransactionScreen");
//   };

//   // Handle set payment reminder
//   const handleSetPaymentReminder = () => {
//     Alert.alert("Set Payment reminder");
//   };

//   // Handle invite members
//   const handleInviteMembers = () => {
//     Alert.alert("Invite Members");
//   };

//   return (
//     <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
//       {/* top bar */}
//       <BackTopBar headline="" func={() => navigation.goBack()} />

//       {/* top card */}
//       <View
//         className="rounded-lg my-6 p-6"
//         style={{ backgroundColor: primeryColor }}
//       >
//         <View className="flex flex-row content-center justify-between items-center">
//           <Text className="text-white font-medium text-base">{eventName}</Text>
//           <Text className="text-white font-normal text-xs">14/11/2024</Text>
//         </View>

//         <View className="px-0">
//           <View className="flex flex-row content-center items-center ">
//             <Text className="font-normal pr-12">Bill Total</Text>
//             <Text className="font-semibold text-base">$2100</Text>
//           </View>
//           <View className="flex flex-row content-center items-center ">
//             <Text className="font-normal pr-8">Amount Due</Text>
//             <Text className="font-semibold text-base">$300</Text>
//           </View>
//           <View className="flex flex-row content-center items-center mt-3">
//             <Text className="font-xm">Plot 37, Kingsway Yaba</Text>
//           </View>
//         </View>
//       </View>

//       {/* group members section */}
//       <View>
//         <HorizontalTitle title="Members Expenses" action="" />

//         {/* group members */}
//         <View className="flex flex-row justify-between items-center mt-2">
//           {membersInfo.map((member, index) => (
//             <MemberProfileCard
//               key={index}
//               name={`${member.firstName} ${member.lastName}`}
//               imgUrl={member.profileImg}
//               status={member.paymentStatus}
//             />
//           ))}
//         </View>
//       </View>

//       {/* action button section */}
//       <View className="mt-6rs-7y">
//         <BillsHorizontalBtn
//           text="Make Withdraw"
//           iconLeft={
//             <FontAwesome
//               name="pencil-square-o"
//               size={18}
//               color={primeryColor}
//             />
//           }
//           func={handleMakeTransaction}
//         />
//         <BillsHorizontalBtn
//           text="Set Payment reminder"
//           iconLeft={
//             <AntDesign name="clockcircleo" size={18} color={primeryColor} />
//           }
//           func={handleSetPaymentReminder}
//         />
//         <BillsHorizontalBtn
//           text="Invite Members"
//           iconLeft={<Octicons name="share" size={18} color={primeryColor} />}
//           func={handleInviteMembers}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BillsDetails;

import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { primeryColor } from "../../utils/appstyle";
import { BackTopBar, HorizontalTitle } from "../home";
import MemberProfileCard from "./component/MemberProfileCard";
import BillsHorizontalBtn from "./component/BillsHorizontalBtn";
import { useLogin } from "../../context/LoginProvider";
import formatDate from "../../utils/formatDate";

const BillsDetails = ({ navigation, route }) => {
  const { userProfile, setUserProfile, token, allUsers } = useLogin();
  const {currencySymbol} = userProfile;

  const baseUrl = process.env.BASE_URL;
  const [membersInfo, setMembersInfo] = useState([]);
  const { eventDetails } = route.params;
  const {
    eventName,
    eventLocation,
    eventId,
    eventDate,
    eventCost,
    eventMembers,
  } = eventDetails;

  // Fetch event members info
  useEffect(() => {
    // Create new array with member information
    const updatedMembersInfo = eventMembers?.map((member) => {
      // Find user information based on userId
      const user = allUsers.find((user) => user._id === member.user);

      return {
        userId: member.user,
        splitCost: member.splitCost,
        paymentStatus: member.paymentStatus,
        firstName: user?.firstName || "Unknown",
        lastName: user?.lastName || "",
        profileImg: user?.profileImg || "default_profile_img_url",
      };
    });

    setMembersInfo(updatedMembersInfo);
  }, [eventMembers, allUsers]);

  // Alert.alert("Event Members", JSON.stringify(membersInfo));

  // Handle make transaction
  const handleMakeTransaction = () => {
    navigation.navigate("TransactionScreen");
  };

  // Handle set payment reminder
  const handleSetPaymentReminder = () => {
    Alert.alert("Set Payment reminder");
  };

  // Handle invite members
  const handleInviteMembers = () => {
    Alert.alert("Invite Members");
  };

  // Render each member in FlatList
  const renderMember = ({ item }) => (
    <MemberProfileCard
      name={`${item.firstName}`}
      imgUrl={item.profileImg}
      status={item.paymentStatus}
      amount={item.splitCost}
      currency={currencySymbol}
    />
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar headline="" func={() => navigation.goBack()} />

      {/* top card */}
      <View
        className="rounded-lg my-6 p-6"
        style={{ backgroundColor: primeryColor }}
      >
        <View className="flex flex-row content-center justify-between items-center">
          <Text className="text-white font-medium text-base">
            {eventName || ""}
          </Text>
          <Text className="text-white font-normal text-xs">
            {formatDate(eventDate) || "14/11/2024"}
          </Text>
        </View>

        <View className="px-0">
          <View className="flex flex-row content-center items-center ">
            <Text className="font-normal pr-12">Bill Total</Text>
            <Text className="font-semibold text-base">${eventCost}</Text>
          </View>
          <View className="flex flex-row content-center items-center ">
            <Text className="font-normal pr-8">Amount Paid</Text>
            <Text className="font-semibold text-base">$300</Text>
          </View>
          <View className="flex flex-row content-center items-center mt-3">
            <Text className="font-xm">{eventLocation || ""}</Text>
          </View>
        </View>
      </View>

      {/* group members section */}
      <View>
        <HorizontalTitle title="Members Expenses" action="" />

        {/* group members */}
        {/* Horizontal FlatList for members */}
        <FlatList
          data={membersInfo}
          horizontal={true}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={renderMember}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>

      {/* action button section */}
      <View className="mt-6rs-7y">
        <BillsHorizontalBtn
          text="Make Withdraw"
          iconLeft={
            <FontAwesome
              name="pencil-square-o"
              size={18}
              color={primeryColor}
            />
          }
          func={handleMakeTransaction}
        />
        <BillsHorizontalBtn
          text="Set Payment reminder"
          iconLeft={
            <AntDesign name="clockcircleo" size={18} color={primeryColor} />
          }
          func={handleSetPaymentReminder}
        />
        <BillsHorizontalBtn
          text="Invite Members"
          iconLeft={<Octicons name="share" size={18} color={primeryColor} />}
          func={handleInviteMembers}
        />
      </View>
    </SafeAreaView>
  );
};

export default BillsDetails;
