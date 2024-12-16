import React from "react";
import {
  Box,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Text,
} from "@gluestack-ui/themed";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { errorColor } from "../navigation/utils/appstyle";

const PasswordInput = ({
  mb = 12,
  showPassword,
  handleState,
  placeholder,
  inputValue,
  handleTextChange,
  error,
}) => {
  return (
    <Box mb={mb}>
      <Input textAlign="center" size="lg">
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-require={true}
          value={inputValue}
          onChangeText={handleTextChange}
        />
        <InputSlot pr="$3" onPress={handleState}>
          {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color="$darkBlue500"
          />
        </InputSlot>
      </Input>
      {error && (
        <Text size="sm" style={{ color: "#ea9977" }}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default PasswordInput;
