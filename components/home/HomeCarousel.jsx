// import { View } from "react-native";
// import React from "react";
// import Carousel from "react-native-snap-carousel";
// import CarouselCard from "./CarouselCard";

// const HomeCarousel = ({func}) => {
//   const data = [
//     {
//       title: "Discover Nearby",
//       description:
//         "Uncover nearby gems! Find events, groups and connections just around the corner. Start exploring now!",
//       image: require("../../assets/images/slide1.jpg"),
//     },
//     {
//       title: "Elevate Your Splinx Experience",
//       description:
//         "Embark on a journey of enhanced possibilities! Elevate your Splinx experience with our premium features. Get started now!",
//       image: require("../../assets/images/slider3.jpg"),
//     },
//     {
//       title: "Splinx Socials Blend",
//       description:
//         "Crafting connections, one sip at a time! Join our socials blend and meet new people over a cup of coffee. Get started now!",
//       image: require("../../assets/images/slider5.jpg"),
//     },
//   ];

//   return (
//     <View>
//       <Carousel
//         data={data}
//         renderItem={({ item }) => (
//           <CarouselCard
//             title={item.title}
//             description={item.description}
//             imageSource={item.image}
//             btnFunc={func}
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

// export default HomeCarousel;

import React from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import CarouselCard from "./CarouselCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.8; // 80% of screen width
const SPACING = 10;

const HomeCarousel = ({ func }) => {
  const data = [
    {
      title: "Discover Nearby",
      description:
        "Uncover nearby gems! Find events, groups and connections just around the corner. Start exploring now!",
      image: require("../../assets/images/slide1.jpg"),
    },
    {
      title: "Elevate Your Splinx Experience",
      description:
        "Embark on a journey of enhanced possibilities! Elevate your Splinx experience with our premium features. Get started now!",
      image: require("../../assets/images/slider3.jpg"),
    },
    {
      title: "Splinx Socials Blend",
      description:
        "Crafting connections, one sip at a time! Join our socials blend and meet new people over a cup of coffee. Get started now!",
      image: require("../../assets/images/slider5.jpg"),
    },
  ];

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
          title={item.title}
          description={item.description}
          imageSource={item.image}
          btnFunc={func}
        />
      </Animated.View>
    );
  };

  return (
    <View>
      <Animated.FlatList
        data={data}
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
      />
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

export default HomeCarousel;
