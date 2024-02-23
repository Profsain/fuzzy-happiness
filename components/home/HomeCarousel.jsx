import { View, Alert } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import CarouselCard from "./CarouselCard";

const HomeCarousel = () => {
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

  // handle carousel button click
  const handleCarouselBtn = (itemTitle) => {
    Alert.alert(`You clicked on ${itemTitle}`);
  };

  return (
    <View>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <CarouselCard
            title={item.title}
            description={item.description}
            imageSource={item.image}
            btnFunc={() => handleCarouselBtn(item.title)}
          />
        )}
        sliderWidth={300}
        itemWidth={300}
        autoplay={true} // Enable autoplay
        autoplayInterval={5000} // Set autoplay interval (in milliseconds)
        loop={true} // Enable looping
      />
    </View>
  );
};

export default HomeCarousel;
