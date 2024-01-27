import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getLocales, getCalendars } from "expo-localization"; // Importing getLocales and getCalendars
import { DatePickerInput } from "react-native-paper-dates";

const CustomDatePicker = ({ dateOfBirth, dateError, handleDateChange, label }) => {
  const [locales, setLocales] = useState([]);
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchLocalesAndCalendars = async () => {
      const deviceLocales = await getLocales();
      const deviceCalendars = await getCalendars();
      setLocales(deviceLocales);
      setCalendars(deviceCalendars);
    };

    fetchLocalesAndCalendars();
  }, []); // Fetch locales and calendars on component mount

  return (
    <View style={styles.container}>
      <DatePickerInput
        locale="en"
        value={dateOfBirth}
        onChange={handleDateChange}
        label={label}
        leftIcon="calendar"
        inputMode="start"
        mode="outlined"
        style={{
          width: "100%",
          backgroundColor: "transparent",
          fontSize: 16,
        }}
        error={dateError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDatePicker;
