import React, { useState, useEffect, useCallback } from "react";
import { View, Alert, Linking } from "react-native";
import { useLogin } from "../../context/LoginProvider";
import Carousel from "react-native-snap-carousel";
import CarouselCard from "./CarouselCard";

const TopAdvertCarousel = () => {
  const { adverts } = useLogin();
  const baseUrl = process.env.BASE_URL;

//   const [adverts, setAdverts] = useState([]);
  const [topAdverts, setTopAdverts] = useState([]);


  // filter adverts that is active and top position
  useEffect(() => {
    // if (!adverts) return;
    const topAdverts = adverts.filter(
      (advert) =>
        advert.adsStatus === "active" && advert.adsPosition === "homeTop"
    );
    setTopAdverts(topAdverts);
  }, [adverts]);

  // function to call business
  const callBusiness = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("No phone number available for this business.");
      return;
    }

    // Open the phone dialer
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error("Failed to open dialer", err)
    );
  };

  return (
    <View>
      <Carousel
        data={topAdverts}
        renderItem={({ item }) => (
          <CarouselCard
            title={item.businessName.slice(0, 10)}
            description={item.adsText.slice(0, 50)}
            address={item.businessAddress.slice(0, 20)}
            imageSource={item.adsImage}
            cta="Call"
            btnFunc={() => callBusiness(item.businessPhone)}
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

export default TopAdvertCarousel;

