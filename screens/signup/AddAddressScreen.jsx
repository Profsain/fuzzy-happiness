// import React, { useState } from "react";
// import { Box, Text, VStack } from "@gluestack-ui/themed";
// import {
//   CountrySelector,
//   CustomButton,
//   CustomHeadings,
//   CustomInput,
// } from "../../components";
// import { secondaryColor } from "../../utils/appstyle";
// import navigationToScreen from "../../utils/navigationUtil";
// import useReceivedData from "../../hooks/useReceivedData";

// const AddAddressScreen = ({ navigation }) => {
//   // received data from previous screen
//   const receivedData = useReceivedData();
  
//   const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
//   const [country, setCountry] = useState("");
//   const [countryError, setCountryError] = useState("");
//   const [city, setCity] = useState("");
//   const [cityError, setCityError] = useState("");
//   const [address, setAddress] = useState("");
//   const [addressError, setAddressError] = useState("");

//   // handle city change
//   const handleCityChange = (text) => {
//     setCity(text);
//     // validate city
//     if (text.length === 0) {
//       setCityError("City is required");
//     } else {
//       setCityError("");
//     }
//   };

//   // handle address change
//   const handleAddressChange = (text) => {
//     setAddress(text);
//     // validate address
//     if (text.length === 0) {
//       setAddressError("Address is required");
//     } else if (text.length > 5) {
//       setAddressError("");
//       setIsValid(true);
//     }
//   };

//   const handleNext = () => {
//     // set data to be sent to the next screen
//     const data = {
//       ...receivedData,
//       country,
//       city,
//       homeAddress: address,
//     };

//     // navigate to Bio screen
//     navigationToScreen(navigation, "BioScreen", data);
//   };

//   return (
//     <Box width="100%" justifyContent="center" p={24} pt={28}>
//       <CustomHeadings title="Country of Residence" />

//       {/* form section */}
//       <VStack space="xl" mt={5}>
//         <Text fontSize={16}>
//           Add your location to find nearby events and hangout.
//         </Text>

//         <Box>
//           <CountrySelector country={country} setCountry={setCountry} />
//         </Box>
//         <CustomInput
//           placeholder="City/Town"
//           type="text"
//           inputValue={city}
//           handleTextChange={handleCityChange}
//           error={cityError}
//         />
//         <CustomInput
//           placeholder="Home Address"
//           type="text"
//           inputValue={address}
//           handleTextChange={handleAddressChange}
//           error={addressError}
//         />

//         {/* next button */}
//         <Box mt={90}>
//           {!isValid ? (
//             <CustomButton
//               label="Next"
//               backgroundColor={secondaryColor}
//               color="#000"
//             />
//           ) : (
//             <CustomButton label="Next" buttonFunc={handleNext} />
//           )}
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default AddAddressScreen;

import React, { useState, useEffect } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import * as Location from 'expo-location';
import axios from 'axios';
import { CountrySelector, CustomButton, CustomHeadings, CustomInput } from "../../components";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import useReceivedData from "../../hooks/useReceivedData";

const AddAddressScreen = ({ navigation }) => {
  const receivedData = useReceivedData();
  const [isValid, setIsValid] = useState(false);
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [currency, setCurrency] = useState({ code: "", symbol: "" });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      getAddressFromCoordinates(latitude, longitude);
    })();
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAP_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const country = addressComponents.find(component => component.types.includes("country"))?.long_name || "";
        const city = addressComponents.find(component => component.types.includes("locality"))?.long_name || "";
        const address = data.results[0].formatted_address;

        setCountry(country);
        setCity(city);
        setAddress(address);
        getCurrencyFromCountry(country);
        setIsValid(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrencyFromCountry = async (country) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
      const countryData = response.data[0];
      const currencyCode = Object.keys(countryData.currencies)[0];
      const currencySymbol = countryData.currencies[currencyCode].symbol;

      setCurrency({ code: currencyCode, symbol: currencySymbol });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (text) => {
    setCity(text);
    if (text.length === 0) {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };

  const handleAddressChange = (text) => {
    setAddress(text);
    if (text.length === 0) {
      setAddressError("Address is required");
    } else if (text.length > 5) {
      setAddressError("");
      setIsValid(true);
    }
  };

  const handleNext = () => {
    const data = {
      ...receivedData,
      country,
      city,
      homeAddress: address,
      currency,
    };
    navigationToScreen(navigation, "BioScreen", data);
  };

  return (
    <Box width="100%" justifyContent="center" p={24} pt={28}>
      <CustomHeadings title="Country of Residence" />
      <VStack space="xl" mt={5}>
        <Text fontSize={16}>
          Add your location to find nearby events and hangout.
        </Text>
        <Box>
          <CountrySelector country={country} setCountry={setCountry} />
        </Box>
        <CustomInput
          placeholder="City/Town"
          type="text"
          inputValue={city}
          handleTextChange={handleCityChange}
          error={cityError}
        />
        <CustomInput
          placeholder="Home Address"
          type="text"
          inputValue={address}
          handleTextChange={handleAddressChange}
          error={addressError}
        />
        <Box mt={90}>
          {!isValid ? (
            <CustomButton
              label="Next"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Next" buttonFunc={handleNext} />
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default AddAddressScreen;

