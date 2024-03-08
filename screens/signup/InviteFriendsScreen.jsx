import { useState, useEffect } from "react";
import * as Contacts from "expo-contacts";
import { Box, VStack, set } from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomHeadings,
  SearchBox,
  InviteCard,
} from "../../components";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Share,
} from "react-native";
import { secondaryColor, textColor, secondBgColor } from "../../utils/appstyle";
import initialToUpperCase from "../../utils/firstCharToUpperCase";
import navigationToScreen from "../../utils/navigationUtil";

const PAGE_SIZE = 20; // Number of contacts to fetch per page

const InviteFriendsScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  // fetch contacts from phone
  // const fetchContacts = async () => {
  //   const { status } = await Contacts.requestPermissionsAsync();
  //   if (status === "granted") {
  //     const { data } = await Contacts.getContactsAsync({
  //       fields: [Contacts.Fields.PhoneNumbers],
  //     });

  //     if (data.length > 0) {
  //       setLoading(true);
  //       setContacts(data);
  //       console.log(data[22]);
  //     }
  //   }
  // };
  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      setLoading(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        pageSize: PAGE_SIZE,
        offset: offset,
      });

      if (data.length > 0) {
        // Store unique contact IDs in a Set
        const uniqueContactIds = new Set(contacts.map((contact) => contact.id));

        // Filter out duplicates from the fetched data
        const filteredData = data.filter(
          (contact) => !uniqueContactIds.has(contact.id)
        );

        setContacts((prevContacts) => [...prevContacts, ...filteredData]);
        setOffset((prevOffset) => prevOffset + PAGE_SIZE);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // handle social media share
  const appUrl = "https://www.google.com";
  const handleSocialShare = async () => {
    // share to social media
    try {
      const result = await Share.share({
        message: `Hey! I'm using this cool app, you should check it out: ${appUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type", result.activityType);  
        } else {
          // shared
          console.log("shared");
        } 
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle search
  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleFinishInvite = () => {
    // send data to backend database
    // navigate to home Screen if login
    navigationToScreen(navigation, "LoginScreen");
  };

  // render contact list
  const keyExtractor = (item, idx) => {
    return item?.id?.toString() || idx.toString();
  };
  const renderContactList = ({ item }) => {
    const name = item?.name || "No Name";
    const phoneNumber = item?.phoneNumbers?.[0]?.number || "No Number";
    // const nameChar = name[0].toUpperCase();

    if (
      name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      phoneNumber.length > 10
    ) {
      return (
        <InviteCard
          name={name}
          phoneNumber={phoneNumber}
          btnColor={secondaryColor}
        />
      );
    }
  };

  return (
      <Box width="100%" justifyContent="center" p={24} pt={28}>
        {/* search box  */}
        <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
        <Box height={500}>
          {/* contact list section  */}
          {loading && <Text>Loading</Text>}
          <FlatList
              data={contacts}
              renderItem={renderContactList}
              keyExtractor={keyExtractor}
              onEndReached={fetchContacts} // Load more contacts when reaching the end
              onEndReachedThreshold={0.5} // Load more contacts when reaching the end
            />
        
        {/* action button */}
        <Box mt={20}>
          <CustomButton
            label="Share"
            buttonFunc={handleSocialShare}
          />
          <CustomButton
            label="Skip for now"
            buttonFunc={handleFinishInvite}
            color={textColor}
            backgroundColor={secondBgColor}
          />
        </Box>
        </Box>
      </Box>

  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default InviteFriendsScreen;
