// import React, { useState, useEffect, useCallback } from "react";
// import { View, Alert, Linking } from "react-native";
// import { useLogin } from "../../context/LoginProvider";
// import Carousel from "react-native-snap-carousel";
// import CarouselCard from "./CarouselCard";

// const TopAdvertCarousel = () => {
//   const { adverts } = useLogin();
//   const baseUrl = process.env.BASE_URL;

// //   const [adverts, setAdverts] = useState([]);
//   const [topAdverts, setTopAdverts] = useState([]);


//   // filter adverts that is active and top position
//   useEffect(() => {
//     // if (!adverts) return;
//     const topAdverts = adverts.filter(
//       (advert) =>
//         advert.adsStatus === "active" && advert.adsPosition === "homeTop"
//     );
//     setTopAdverts(topAdverts);
//   }, [adverts]);

//   // function to call business
//   const callBusiness = (phoneNumber) => {
//     if (!phoneNumber) {
//       Alert.alert("No phone number available for this business.");
//       return;
//     }

//     // Open the phone dialer
//     Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
//       console.error("Failed to open dialer", err)
//     );
//   };

//   return (
//     <View>
//       <Carousel
//         data={topAdverts}
//         renderItem={({ item }) => (
//           <CarouselCard
//             title={item.businessName.slice(0, 10)}
//             description={item.adsText.slice(0, 50)}
//             address={item.businessAddress.slice(0, 20)}
//             imageSource={item.adsImage}
//             cta="Call"
//             btnFunc={() => callBusiness(item.businessPhone)}
//           />
//         )}
//         sliderWidth={300}
//         itemWidth={300}
//         autoplay={true} // Enable autoplay
//         autoplayInterval={5000} // Set autoplay interval (in milliseconds)
//         loop={true} // Enable looping
//       />
//     </View>
//   );
// };

// export default TopAdvertCarousel;

import React, { useEffect, useState } from "react";
import { View, Alert, Linking, Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import CarouselCard from "./CarouselCard";
import { useLogin } from "../../context/LoginProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.8; // 80% of screen width
const SPACING = 10;

const TopAdvertCarousel = () => {
  const { adverts } = useLogin();
  const [topAdverts, setTopAdverts] = useState([]);

  // Filter adverts that are active and in the top position
  useEffect(() => {
    if (!adverts) return;
    const filteredAdverts = adverts.filter(
      (advert) =>
        advert.adsStatus === "active" && advert.adsPosition === "homeTop"
    );
    setTopAdverts(filteredAdverts);
  }, [adverts]);

  const callBusiness = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("No phone number available for this business.");
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error("Failed to open dialer", err)
    );
  };

  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item, index }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value / SCREEN_WIDTH,
        [index - 1, index, index + 1],
        [0.8, 1, 0.8],
        Extrapolate.CLAMP
      );

      return {
        transform: [{ scale }],
      };
    });

    return (
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <CarouselCard
          title={item.businessName.slice(0, 10)}
          description={item.adsText.slice(0, 50)}
          address={item.businessAddress.slice(0, 20)}
          imageSource={item.adsImage}
          cta="Call"
          btnFunc={() => callBusiness(item.businessPhone)}
        />
      </Animated.View>
    );
  };

  return (
    <View>
      {/* <Animated.FlatList
        data={topAdverts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `carousel-item-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: SPACING / 2,
        }}
      /> */}
      <Text>Ads slider</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopAdvertCarousel;

