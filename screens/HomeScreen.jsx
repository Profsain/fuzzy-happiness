import { Image, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import { Box } from "@gluestack-ui/themed";
import { SearchBox } from "../components";
import { EventCard, HomeCarousel, HorizontalTitle } from "../components/home";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* Top bar */}
      <Box>
        <View className="flex flex-row justify-between ">
          <Text className="font-4xl font-semibold">Hello Pascal</Text>
          <View>
            <Ionicons name="notifications" size={24} color="black" />
          </View>
        </View>
        {/* search bar */}
        <SearchBox mt={14} mb={18} />
      </Box>

      <ScrollView>
        {/* carousel section */}
        <Box mt={8}>
          <HomeCarousel />
        </Box>

        {/* Event section */}
        <Box mt={24}>
          {/* upcoming events */}
          <Box>
            <HorizontalTitle />
            <View>
              <EventCard />
              <EventCard />
            </View>
          </Box>
        </Box>

        <Text>Home Screen </Text>
        <Image
          className="w-24 h-24"
          source={require("../assets/images/WorkInProgress.png")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
