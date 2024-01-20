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
import { errorColor } from "../utils/appstyle";

const PasswordInput = ({
  showPassword,
  handleState,
  placeholder,
  inputValue,
  handleTextChange,
  error,
}) => {
  return (
    <Box>
      <Input textAlign="center">
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
