import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
} from "@gluestack-ui/themed";
import { primeryColor } from "../../../utils/appstyle";

const MembersRowCard = ({
  imgUrl,
  memberName,
  memberId,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className="flex flex-row justify-between items-center border p-2 mb-3 rounded-md border-gray-300"
    >
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri:
              imgUrl ||
              "https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072178.jpg",
          }}
          className="w-8 h-8 rounded-full mr-6"
        />
        <Text className="text-lg">@{memberName.toLowerCase() || "John Doe"}</Text>
      </View>
      {/* checkbox */}
      <Checkbox
        size="md"
        isInvalid={false}
        isDisabled={false}
        aria-label="checkbox"
        isChecked={isSelected}
        onChange={onSelect}
      >
        <CheckboxIndicator
          mr="$2"
          style={{
            backgroundColor: isSelected ? primeryColor : "transparent",
            borderColor: isSelected ? primeryColor : "gray",
          }}
        >
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
      </Checkbox>
    </TouchableOpacity>
  );
};

export default MembersRowCard;
