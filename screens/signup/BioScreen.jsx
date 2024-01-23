import React, { useState } from "react";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import {
  CustomButton,
  CustomHeadings,
  CustomInput,
} from "../../components";
import { DatePickerInput } from "react-native-paper-dates";
import { secondaryColor } from "../../utils/appstyle";
import navigationToScreen from "../../utils/navigationUtil";

const BioScreen = ({ navigation }) => {
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
    // validate city
    if (text.length === 0) {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };

  // handle last name change
  const handleLastNameChange = (text) => {
    setLastName(text);
    // validate address
    if (text.length === 0) {
      setLastNameError("Last name is required");
    } else if (text.length > 5) {
      setLastNameError("");
    }
  };

  // handle date of birth change
  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
    // validate address
    if (date.length === 0) {
      setDateOfBirthError("Date of birth is required");
    } else {
      setDateOfBirthError("");
      setIsValid(true);
    }
  };

  const handleProceed = () => {
    // persist data in local storage
   
    // navigate to EnableNotification screen
    navigationToScreen(navigation, "EnableNotificationScreen");
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
        {/* <CustomInput
          placeholder="Date of Birth"
          type="date"
          inputValue={dateOfBirth}
          handleTextChange={handleDateOfBirthChange}
          error={dateOfBirthError}
        /> */}
        <Box>
          <DatePickerInput
            value={dateOfBirth}
            onChange={(date) => handleDateOfBirthChange(date)}
            label="Date of Birth"
            leftIcon="calendar"
            inputMode="start"
            mode="outlined"
            style={{ width: "100%" }}
            error={dateOfBirthError}
          />
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

export default BioScreen