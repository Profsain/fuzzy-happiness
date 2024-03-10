import { Input, InputField, Text, Box } from "@gluestack-ui/themed";
import { keyboardType } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
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
      <Input size="xl">
        <InputField
          placeholder={placeholder}
          aria-label={placeholder}
          aria-require={required}
          keyboardType={keyboardType}
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
