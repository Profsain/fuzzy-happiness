import { Input, InputField, Text, Box } from "@gluestack-ui/themed";
import React from "react";

const CustomInput = ({
  placeholder,
  mb = 12,
  required = true,
  type = "text",
  inputValue,
  handleTextChange,
  error,
}) => {
  return (
    <Box mb={mb}>
      <Input size="xl">
        <InputField
          placeholder={placeholder}
          aria-label={placeholder}
          aria-require={required}
          // aria-invalid={false}
          // aria-errormessage={error}
          type={type}
          value={inputValue}
          onChangeText={handleTextChange}
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
