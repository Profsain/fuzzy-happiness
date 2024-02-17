import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomDatePicker,
  CustomHeadings,
  CustomInput,
} from "../../components";

import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";
import { StyleSheet } from "react-native";
import useReceivedData from "../../hooks/useReceivedData";

const BioScreen = ({ navigation }) => {
  // received data from previous screen
  const receivedData = useReceivedData();

  const [isValid, setIsValid] = useState(false); // to check if all inputs are valid
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  

  // handle first name change
  const handleFirstNameChange = (text) => {
    setFirstName(text);
    // validate first name
    if (text.length === 0) {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };

  // handle last name change
  const handleLastNameChange = (text) => {
    setLastName(text);
    // validate last name
    if (text.length === 0) {
      setLastNameError("Last name is required");
    } else if (text.length > 3) {
      setLastNameError("");
    }
  };

  // handle date of birth change
  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
    // validate date
    if (date.length === 0) {
      setDateOfBirthError("Date of birth is required");
    } else {
      setDateOfBirthError("");
      setIsValid(true);
    }
  };

  const handleProceed = () => {
    // convert data to serializable string
    const dob = dateOfBirth.toISOString();
    // send data to next screen
    const data = {
      ...receivedData,
      firstName,
      lastName,
      dob,
    };

    // navigate to EnableNotification screen
    navigationToScreen(navigation, "CreatePasswordScreen", data);
  };

  return (
    <Box width="100%" justifyContent="center" p={24} pt={28}>
      <CustomHeadings title="Add Name & DOB" />

      {/* form section */}
      <VStack space="xl" mt={5}>
        <Text fontSize={16}>
          Name and Date of Birth in your official document.
        </Text>

        <CustomInput
          placeholder="First Name"
          type="text"
          inputValue={firstName}
          handleTextChange={handleFirstNameChange}
          error={firstNameError}
        />
        <CustomInput
          placeholder="Last Name"
          type="text"
          inputValue={lastName}
          handleTextChange={handleLastNameChange}
          error={lastNameError}
        />
        <Box mt={24}>
          <CustomDatePicker dateOfBirth={dateOfBirth } setDate={setDateOfBirth} dateError={dateOfBirthError} handleDateChange={handleDateOfBirthChange} label="Date of Birth"/>
        </Box>

        {/* next button */}
        <Box mt={90}>
          {!isValid ? (
            <CustomButton
              label="Proceed"
              backgroundColor={secondaryColor}
              color="#000"
            />
          ) : (
            <CustomButton label="Proceed" buttonFunc={handleProceed} />
          )}
        </Box>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    width: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
  },
});

export default BioScreen