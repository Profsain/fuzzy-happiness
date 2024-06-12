import { Input, InputField, Text, Box } from "@gluestack-ui/themed";
import React from "react";

const CustomInput = ({
  placeholder,
  mb = 12,
  required = true,
  type = "text",
  keyboardType,
  inputValue,
  handleTextChange,
  error,
}) => {
  return (
    <Box mb={mb}>
      <Input size="lg">
        <InputField
          placeholder={placeholder}
          aria-label={placeholder}
          aria-require={required}
          keyboardType={keyboardType}
          type={type}
          value={inputValue}
          onChangeText={handleTextChange}
          multiline={type === "textarea" ? true : false}
        />
      </Input>
      {error && (
        <Text size="sm" style={{ color: "#ea9977" }}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default CustomInput;
