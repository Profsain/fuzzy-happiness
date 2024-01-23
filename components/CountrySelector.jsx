import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

const CountrySelector = ({ country, setCountry }) => {

  // fetch countries and create local_data
  const [local_data, setLocal_data] = useState([]);
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags"
      );
      const data = await response.json();
      if (data) {
        // console.log(data);
        const countries = data.map((item) => {
          return {
            value: item?.name?.common,
            lable: item?.name?.common,
            image: {
              uri: item.flags.png,
            },
          };
        });
        setLocal_data(countries);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      dropdownStyle={styles.dropdownStyle}
      search
      maxHeight={200}
      value={country}
      data={local_data}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder="Select country"
      searchPlaceholder="Search..."
      onChange={(e) => {
        setCountry(e.value);
      }}
    />
  );
};

export default CountrySelector;

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: 50,
    borderColor: "#BDBDBD",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 18,
    width: "100%",
    marginBottom: 10,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 3,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownStyle: {
    height: 250,
  },
});
